using Blobpulse.Core.Model.Pricing;

namespace Blobpulse.Core.Services
{
    public interface IPricingService
    {
        AzureBlobPricingConfig GetCurrentPricing();
    }
}
