using Blobpulse.Core.Model;
using Blobpulse.Core.Model.Pricing;

namespace Blobpulse.Core.Services
{
    public interface IAzureStorageService
    {
        /// <summary>
        /// Analyzes an Azure Blob container concurrently. Negotiates return payloads internally: 
        /// defaults to JSON, but generates a download-ready CSV payload stream if "csv" is passed.
        /// </summary>
        Task<ScanReportResponse> AnalyzeContainerAsync(string connectionString, string containerName, bool includeGroupsInResponse = false, CancellationToken cancellationToken = default);
        Task<AnalysisResult> AnalyzeAndExportReportToJsonAsync(string connectionString, string containerName, CancellationToken cancellationToken = default);
        Task<AnalysisResult> AnalyzeAndExportReportCsvAsync(string connectionString, string containerName, CancellationToken cancellationToken = default);
    }
}
