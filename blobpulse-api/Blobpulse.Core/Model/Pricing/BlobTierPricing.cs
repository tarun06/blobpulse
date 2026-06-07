namespace Blobpulse.Core.Model.Pricing
{
    public class BlobTierPricing
    {
        public decimal PricePerGb { get; set; }
        public decimal ReadPer10k { get; set; }
        public decimal WritePer10k { get; set; }
        public decimal ListPer10k { get; set; }
        public decimal RetrievalPerGb { get; set; }
    }


}
