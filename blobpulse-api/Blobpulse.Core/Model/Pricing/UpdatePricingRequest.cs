namespace Blobpulse.Core.Model.Pricing
{
    public class UpdatePricingRequest
    {
        public AzureBlobPricingConfig AzureBlobPricing { get; set; } = new();
    }

}
