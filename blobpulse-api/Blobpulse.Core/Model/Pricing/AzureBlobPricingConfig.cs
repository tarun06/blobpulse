namespace Blobpulse.Core.Model.Pricing
{
    public class AzureBlobPricingConfig
    {
        public string Region { get; set; } = default!;
        public string Currency { get; set; } = default!;
        public Dictionary<string, BlobTierPricing> Storage { get; set; } = [];
    }
}
