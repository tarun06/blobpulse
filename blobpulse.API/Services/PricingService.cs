using Blobpulse.Core.Model.Pricing;
using Microsoft.Extensions.Options;

namespace Blobpulse.API.Services
{
    public class PricingService
    {
        private readonly IOptionsMonitor<AzureBlobPricingConfig> _options;

        public PricingService(IOptionsMonitor<AzureBlobPricingConfig> options)
        {
            _options = options;
        }

        public AzureBlobPricingConfig GetCurrentPricing()
        {
            return _options.CurrentValue; // always latest
        }
    }
}
