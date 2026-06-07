namespace Blobpulse.Core.Model
{
    public class DuplicateGroupDto
    {
        public string StructuralId { get; set; } = string.Empty; // Base64 encoded hash group identifier
        public BlobFileDto PrimaryInstance { get; set; } = new();
        public List<BlobFileDto> RedundantInstances { get; set; } = new();
        public long WastedBytes { get; set; }
    }

}
