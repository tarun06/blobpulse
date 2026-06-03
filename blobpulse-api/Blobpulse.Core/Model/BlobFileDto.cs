namespace Blobpulse.Core.Model
{
    public class BlobFileDto
    {
        public string Name { get; set; } = string.Empty;
        public long SizeBytes { get; set; }
        public string AccessTier { get; set; } = "Hot";
        public DateTimeOffset CreatedOn { get; set; }
        public string ContentType { get; set; } = "application/octet-stream";
        public string BlobUrl { get; set; } = string.Empty;
    }

}
