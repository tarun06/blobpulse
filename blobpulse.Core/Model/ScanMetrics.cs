namespace Blobpulse.Core.Model
{
    public class ScanMetrics
    {
        public int TotalBlobsScanned { get; set; }
        public int TotalDuplicateGroups { get; set; }
        public int TotalRedundantFilesCount { get; set; }
        public long WastedHotBytes { get; set; }
        public long WastedCoolBytes { get; set; }
        public long WastedColdBytes { get; set; }
        public long WastedArchiveBytes { get; set; }
        public long TotalWastedBytes { get; set; }
        public List<DuplicateGroupDto> DuplicateGroups { get; set; } = [];
    }
}
