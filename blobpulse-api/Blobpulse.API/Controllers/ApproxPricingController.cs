using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text.Json;
using System.Text.Json.Nodes;
using Blobpulse.Core.Model.Pricing;

namespace Blobpulse.API.Controllers
{
    [ApiController]
    [Route("api/blob/[controller]")]
    public class ApproxPricingController : Controller
    {
        private readonly IWebHostEnvironment _environment;

        public ApproxPricingController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        // UPDATE appsettings.json
        [HttpPost("save")]
        public async Task<IActionResult> SavePricing([FromBody] AzureBlobPricingConfig request, CancellationToken cancellationToken)
        {
            string appSettingsPath = Path.Combine(_environment.ContentRootPath, "appsettings.json");

            if (!System.IO.File.Exists(appSettingsPath))
            {
                return NotFound("appsettings.json not found.");
            }

            // READ EXISTING JSON
            string json =
                await System.IO.File.ReadAllTextAsync(
                    appSettingsPath,
                    cancellationToken);

            JsonNode appSettingsNode =
                JsonNode.Parse(json)!;

            // REPLACE AzureBlobPricing SECTION
            appSettingsNode["AzureBlobPricing"] =
                JsonSerializer.SerializeToNode(request);

            // WRITE BACK TO FILE
            await System.IO.File.WriteAllTextAsync(
                appSettingsPath,
                appSettingsNode.ToJsonString(new JsonSerializerOptions
                {
                    WriteIndented = true
                }),
                cancellationToken);

            return Ok(new
            {
                Message = "Pricing updated successfully.",
                Pricing = request
            });
        }

        [HttpGet]
        public IActionResult Get([FromServices] IOptionsMonitor<AzureBlobPricingConfig> monitor)
        {
            return Ok(monitor.CurrentValue);
        }
    }
}
