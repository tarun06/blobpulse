using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using Blobpulse.Core.Model;
using Blobpulse.Core.Model.Pricing;
using Blobpulse.Core.Services;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using System.Text;

namespace Blobpulse.API.Services
{
    public class AzureStorageService : IAzureStorageService
    {
        private readonly IMemoryCache _cache;
        private readonly IOptionsMonitor<AzureBlobPricingConfig> _pricing;
        private readonly IExcelReportExporter _excelReportExporter;

        public AzureStorageService(IMemoryCache cache,
            IExcelReportExporter excelReportExporter,
            IOptionsMonitor<AzureBlobPricingConfig> pricing)
        {
            _cache = cache;
            _pricing = pricing;
            _excelReportExporter = excelReportExporter;
        }

        private static string GetCacheKey(string connectionString, string containerName)
        {
            return $"scan:{containerName}:{connectionString.GetHashCode()}";
        }

        public async Task<ScanReportResponse> AnalyzeContainerAsync(string connectionString, string containerName, bool force, CancellationToken cancellationToken)
        {
            var scanResult = await ScanAsync(connectionString, containerName, force, cancellationToken);

            // 4. PRECISION FINANCIAL CALCULATIONS
            const decimal ONE_GB = 1024m * 1024m * 1024m;

            var hot = GetTier("hot");
            var cool = GetTier("cool");
            var cold = GetTier("cold");
            var archive = GetTier("archive");

            // Recurring Monthly Waste (What you save moving forward after cleaning)
            decimal monthlyStorageWasteUsd =
                  (scanResult.WastedHotBytes / ONE_GB * hot.PricePerGb)
                + (scanResult.WastedCoolBytes / ONE_GB * cool.PricePerGb)
                + (scanResult.WastedColdBytes / ONE_GB * cold.PricePerGb)
                + (scanResult.WastedArchiveBytes / ONE_GB * archive.PricePerGb);

            // One-time Cleanup Execution Overhead Costs
            decimal totalListOperations = Math.Ceiling(scanResult.TotalBlobsScanned / 5000m);
            decimal listOperationCost = (totalListOperations / 10000m) * hot.ListPer10k;

            // Calculated exactly on wasted assets metadata requirements (Assuming 10% structural read verification penalty)
            decimal retrievalCost =
                  ((scanResult.WastedHotBytes * 0.10m) / ONE_GB * hot.RetrievalPerGb)
                + ((scanResult.WastedCoolBytes * 0.10m) / ONE_GB * cool.RetrievalPerGb)
                + ((scanResult.WastedColdBytes * 0.10m) / ONE_GB * cold.RetrievalPerGb)
                + ((scanResult.WastedArchiveBytes * 0.10m) / ONE_GB * archive.RetrievalPerGb);

            decimal oneTimeCleanupCost = listOperationCost + retrievalCost;

            decimal wastedGb = scanResult.TotalWastedBytes / ONE_GB;
            double bloatIndex = scanResult.TotalBlobsScanned > 0 ? ((double)scanResult.TotalRedundantFilesCount / scanResult.TotalBlobsScanned) * 100d : 0;

            // 5. RESPONSE ASSEMBLY
            var result = new ScanReportResponse
            {
                TotalBlobsScanned = scanResult.TotalBlobsScanned,
                TotalDuplicateGroups = scanResult.TotalDuplicateGroups,
                TotalRedundantFilesCount = scanResult.TotalRedundantFilesCount,
                TotalWastedSpaceGb = Math.Round(wastedGb, 2),
                EstimatedMonthlyStorageWasteUsd = Math.Round(monthlyStorageWasteUsd, 2),
                EstimatedMonthlyOperationCostUsd = Math.Round(oneTimeCleanupCost, 4), // Contextualized cleanly as programmatic target cost
                PotentialMonthlySavingsUsd = Math.Round(monthlyStorageWasteUsd, 2), // True recurring yield value
                ContainerBloatIndexPercentage = Math.Round(bloatIndex, 2),
                OperationalImpactSummary = $"Purging duplicates can reduce total container size by {Math.Round(wastedGb, 2)} GB and decrease blob index pressure by {Math.Round(bloatIndex, 1)}%.",

                DuplicateGroups = scanResult.DuplicateGroups!.OrderByDescending(g => g.WastedBytes).ToList() ?? []
            };

            return result;

            BlobTierPricing GetTier(string tier) =>
                _pricing.CurrentValue.Storage.TryGetValue(tier, out var value) ? value : _pricing.CurrentValue.Storage["Hot"];
        }

        private async Task<ScanMetrics> ScanAsync(string connectionString, string containerName, bool force, CancellationToken cancellationToken)
        {
            var cacheKey = GetCacheKey(connectionString, containerName);

            // 1. CACHE HIT
            if (!force && _cache.TryGetValue(cacheKey, out ScanMetrics? cachedMetrics) && cachedMetrics is not null)
            {
                return cachedMetrics;
            }

            var blobContainerClient = new BlobContainerClient(connectionString, containerName);

            // Thread-safe accumulators for parallel phase
            int totalBlobs = 0;
            long totalContainerBytes = 0;

            // High-performance structural tracker
            var tracker = new ConcurrentDictionary<string, ConcurrentQueue<BlobFileDto>>();

            // 2. ULTRA-FAST PARALLELING INGESTION
            // Fetches basic metadata pages and processes items concurrently across all CPU cores
            var blobPages = blobContainerClient.GetBlobsAsync(BlobTraits.None, BlobStates.None, null, cancellationToken).AsPages();

            await Parallel.ForEachAsync(blobPages, cancellationToken, async (page, token) =>
            {
                int localCount = 0;
                long localBytes = 0;

                foreach (var blob in page.Values)
                {
                    localCount++;
                    long size = blob.Properties.ContentLength ?? 0;
                    localBytes += size;

                    var fileDto = new BlobFileDto
                    {
                        Name = blob.Name,
                        SizeBytes = size,
                        AccessTier = blob.Properties.AccessTier?.ToString() ?? "Hot",
                        CreatedOn = blob.Properties.CreatedOn ?? DateTimeOffset.UtcNow,
                        ContentType = blob.Properties.ContentType ?? "application/octet-stream",
                        BlobUrl = GenerateBlobPreviewUrl(blobContainerClient, blob.Name)
                    };

                    // Fast, low-allocation fingerprinting
                    string fingerprintKey = blob.Properties.ContentHash != null
                        ? Convert.ToBase64String(blob.Properties.ContentHash)
                        : $"UNHASHED_{blob.Name}";

                    // ConcurrentQueue achieves ultra-low allocation and zero thread-blocking compared to locking Lists
                    var bucket = tracker.GetOrAdd(fingerprintKey, static _ => new ConcurrentQueue<BlobFileDto>());
                    bucket.Enqueue(fileDto);
                }

                // Interlocked updates executed once per page instead of once per blob to minimize cache-line bouncing
                Interlocked.Add(ref totalBlobs, localCount);
                Interlocked.Add(ref totalContainerBytes, localBytes);
            });

            // 3. SEPARATED ACCUMULATORS FOR CALCULATION ACCURACY
            long wastedHotBytes = 0;
            long wastedCoolBytes = 0;
            long wastedColdBytes = 0;
            long wastedArchiveBytes = 0;
            long totalWastedBytes = 0;
            int totalRedundantCount = 0;

            var duplicateGroups = new List<DuplicateGroupDto>();

            // Single-threaded reduction phase (Fast memory-bound operation)
            foreach (var kvp in tracker)
            {
                var queue = kvp.Value;
                if (queue.Count <= 1) continue;

                // Convert thread-safe queue to standard sortable list
                var files = queue.ToList();

                // Fast in-place Timsort/Quicksort variant
                files.Sort((a, b) => a.CreatedOn.CompareTo(b.CreatedOn));

                int redundantInGroup = files.Count - 1;
                totalRedundantCount += redundantInGroup;
                long groupWastedBytes = 0;

                // Start from index 1: index 0 is kept as the Primary Instance
                for (int i = 1; i < files.Count; i++)
                {
                    var file = files[i];
                    long size = file.SizeBytes;

                    totalWastedBytes += size;
                    groupWastedBytes += size;

                    string tier = NormalizeTier(file.AccessTier);
                    switch (tier)
                    {
                        case "HOT": wastedHotBytes += size; break;
                        case "COOL": wastedCoolBytes += size; break;
                        case "COLD": wastedColdBytes += size; break;
                        default: wastedArchiveBytes += size; break;
                    }
                }

                duplicateGroups!.Add(new DuplicateGroupDto
                {
                    StructuralId = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(kvp.Key)),
                    PrimaryInstance = files[0],
                    RedundantInstances = files.Skip(1).ToList(),
                    WastedBytes = groupWastedBytes // Populated for correct OrderBy execution
                });
            }

            var scanMetrics = new ScanMetrics
            {
                TotalBlobsScanned = totalBlobs,
                TotalDuplicateGroups = tracker.Count(x => x.Value.Count > 1),
                TotalRedundantFilesCount = totalRedundantCount,
                WastedHotBytes = wastedHotBytes,
                WastedCoolBytes = wastedCoolBytes,
                WastedColdBytes = wastedColdBytes,
                WastedArchiveBytes = wastedArchiveBytes,
                TotalWastedBytes = totalWastedBytes,
                DuplicateGroups = duplicateGroups.OrderByDescending(x => x.WastedBytes).ToList()
            };

            // 6. DISTRIBUTE TO MEMORY CACHE
            _cache.Set(cacheKey, scanMetrics, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(3)
            });

            return scanMetrics;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static string NormalizeTier(string? tier)
        {
            if (string.IsNullOrEmpty(tier))
                return "HOT";

            return tier.ToUpperInvariant();
        }

        public string GenerateBlobPreviewUrl(BlobContainerClient blobContainerClient, string blobName, int expiryMinutes = 5)
        {
            var blobClient = blobContainerClient.GetBlobClient(blobName);

            // If container is public, return direct URL (fastest path)
            if (!blobClient.CanGenerateSasUri)
            {
                return blobClient.Uri.ToString();
            }

            var sasBuilder = new BlobSasBuilder
            {
                BlobContainerName = blobContainerClient.Name,
                BlobName = blobName,
                Resource = "b",
                ExpiresOn = DateTimeOffset.UtcNow.AddHours(expiryMinutes)
            };
            sasBuilder.SetPermissions(BlobSasPermissions.Read);
            Uri sasUri = blobClient.GenerateSasUri(sasBuilder);
            return sasUri.ToString();
        }

        private static async Task<AnalysisResult> ExportInCsvAsync(ScanReportResponse report)
        {
            var memoryStream = new MemoryStream();
            // Ensure writer keeps the stream open during generation handoff
            using (var writer = new StreamWriter(memoryStream, Encoding.UTF8, bufferSize: 4096, leaveOpen: true))
            {
                await writer.WriteLineAsync("GroupId,Status,BlobName,SizeBytes,AccessTier,CreatedOn,ContentType");

                foreach (var group in report.DuplicateGroups)
                {
                    string primaryLine = string.Format("\"{0}\",\"PRIMARY\",\"{1}\",{2},\"{3}\",\"{4:yyyy-MM-dd HH:mm:ss:fff zzz}\",\"{5}\"",
                        group.StructuralId,
                        group.PrimaryInstance.Name.Replace("\"", "\"\""),
                        group.PrimaryInstance.SizeBytes,
                        group.PrimaryInstance.AccessTier,
                        group.PrimaryInstance.CreatedOn,
                        group.PrimaryInstance.ContentType);

                    await writer.WriteLineAsync(primaryLine);

                    foreach (var file in group.RedundantInstances)
                    {
                        string redundantLine = string.Format("\"{0}\",\"REDUNDANT\",\"{1}\",{2},\"{3}\",\"{4:yyyy-MM-dd HH:mm:ss:fff zzz}\",\"{5}\"",
                            group.StructuralId,
                            file.Name.Replace("\"", "\"\""),
                            file.SizeBytes,
                            file.AccessTier,
                            file.CreatedOn,
                            file.ContentType);

                        await writer.WriteLineAsync(redundantLine);
                    }
                }
                await writer.FlushAsync();
            }

            memoryStream.Position = 0; // Rewind for presentation layer read loops

            return new AnalysisResult
            {
                Format = "csv",
                ContentType = "text/csv",
                FileStream = memoryStream,
                FileName = $"duplicate-report-{DateTime.UtcNow:yyyyMMddHHmmss}.csv"
            };
        }

        public async Task<AnalysisResult> AnalyzeAndExportReportToJsonAsync(string connectionString, string containerName, CancellationToken cancellationToken = default)
        {
            var report = await AnalyzeContainerAsync(connectionString, containerName, false, cancellationToken);
            return new AnalysisResult
            {
                Format = "json",
                ContentType = "application/json",
                JsonData = report
            };
        }

        public async Task<AnalysisResult> AnalyzeAndExportReportCsvAsync(string connectionString, string containerName, CancellationToken cancellationToken = default)
        {
            var report = await AnalyzeContainerAsync(connectionString, containerName, false, cancellationToken);
            return await ExportInCsvAsync(report);
        }

        public async Task<byte[]> AnalyzeAndExportReportExcelAsync(string connectionString, string containerName, CancellationToken cancellationToken = default)
        {
            var report = await AnalyzeContainerAsync(connectionString, containerName, false, cancellationToken);
            byte[] file = _excelReportExporter.Generate(report);
            return file;
        }
    }
}
