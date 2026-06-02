namespace Blobpulse.Core.Model
{
    public class ScanReportResponse
    {
        public int TotalBlobsScanned { get; set; }
        public int TotalDuplicateGroups { get; set; }
        public int TotalRedundantFilesCount { get; set; }
        public decimal TotalWastedSpaceGb { get; set; }
        public decimal EstimatedMonthlyStorageWasteUsd { get; set; }
        public double ContainerBloatIndexPercentage { get; set; }
        public decimal EstimatedMonthlyOperationCostUsd { get; set; }
        public decimal PotentialMonthlySavingsUsd { get; set; }
        public string OperationalImpactSummary { get; set; } = string.Empty;
        public List<DuplicateGroupDto> DuplicateGroups { get; set; } = new();
    }

}
