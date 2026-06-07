using Blobpulse.Core.Model;

namespace Blobpulse.Core.Helper
{
    public static class DummyScanReportGenerator
    {
        private static readonly Random _random = new();

        public static ScanReportResponse Generate(int groupCount = 10, int maxDuplicatesPerGroup = 15)
        {
            var response = new ScanReportResponse
            {
                TotalBlobsScanned = _random.Next(5000, 20000),
                TotalDuplicateGroups = groupCount,
                DuplicateGroups = new List<DuplicateGroupDto>()
            };

            int totalRedundantFiles = 0;
            decimal totalWastedBytes = 0;

            for (int i = 0; i < groupCount; i++)
            {
                int duplicateCount = _random.Next(3, maxDuplicatesPerGroup);

                var primarySize = _random.Next(100_000, 5_000_000);

                var group = new DuplicateGroupDto
                {
                    StructuralId = Guid.NewGuid().ToString(),
                    PrimaryInstance = CreateBlob(primarySize),
                    RedundantInstances = new List<BlobFileDto>()
                };

                for (int j = 0; j < duplicateCount; j++)
                {
                    var blob = CreateBlob(primarySize);

                    group.RedundantInstances.Add(blob);

                    totalRedundantFiles++;
                    totalWastedBytes += primarySize;
                }

                response.DuplicateGroups.Add(group);
            }
            double bloatIndex = response.TotalBlobsScanned > 0 ? ((double)totalRedundantFiles / response.TotalBlobsScanned) * 100 : 0;
            response.EstimatedMonthlyStorageWasteUsd = 50;
            response.PotentialMonthlySavingsUsd = 23;
            response.EstimatedMonthlyOperationCostUsd = 23;
            response.TotalRedundantFilesCount = totalRedundantFiles;
            response.TotalWastedSpaceGb = Math.Round(totalWastedBytes / (1024 * 1024 * 1024), 2);
            response.EstimatedMonthlyStorageWasteUsd = Math.Round((decimal)(totalWastedBytes / (1024 * 1024 * 1024)) * 0.02m, 2);
            response.ContainerBloatIndexPercentage = Math.Round(_random.NextDouble() * 100, 2);
            response.OperationalImpactSummary =
                $"Purging these duplicates will reduce your cloud file listings footprint by {bloatIndex}%, " +
                "drastically accelerating synchronization workers, index operations, and downstream ingestion performance.";

            return response;
        }

        private static BlobFileDto CreateBlob(int sizeBytes)
        {
            return new BlobFileDto
            {
                Name = $"{Guid.NewGuid()}.jpg",
                SizeBytes = sizeBytes,
                AccessTier = "Hot",
                CreatedOn = DateTime.UtcNow.AddDays(-_random.Next(1, 500)),
                ContentType = "application/octet-stream",
                BlobUrl = "No Image"
            };
        }
    }

}
