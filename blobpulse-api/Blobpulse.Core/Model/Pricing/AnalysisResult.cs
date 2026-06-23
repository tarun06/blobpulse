namespace Blobpulse.Core.Model.Pricing
{
    /// <summary>
    /// Polymorphic response holder allowing the method to seamlessly hand back either a 
    /// structural JSON dashboard model or an active raw CSV binary export stream.
    /// </summary>
    public class AnalysisResult : IDisposable
    {
        public string? Format { get; set; }
        public string ContentType { get; set; } = "application/json";
        public ScanReportResponse? JsonData { get; set; }
        public Stream? FileStream { get; set; }
        public string? FileName { get; set; }

        public void Dispose()
        {
            FileStream?.Dispose();
        }
    }
}
