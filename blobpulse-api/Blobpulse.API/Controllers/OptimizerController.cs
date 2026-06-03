using Blobpulse.Core.Helper;
using Blobpulse.Core.Model;
using Blobpulse.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace Blobpulse.API.Controllers
{
    [ApiController]
    [Route("api/blob/[controller]")]
    public class OptimizerController : ControllerBase
    {
        private readonly IAzureStorageService _storageService;

        public OptimizerController(IAzureStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpPost("scan")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ScanReportResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ScanContainer([FromBody] ScanRequest request, CancellationToken cancellationToken)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.ConnectionString) || string.IsNullOrWhiteSpace(request.ContainerName))
            {
                return BadRequest(new { message = "Invalid parameters. Connection string and container name are mandatory." });
            }

            try
            {
                var report = await _storageService.AnalyzeContainerAsync(request.ConnectionString, request.ContainerName, true, cancellationToken);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Azure scan tracking fault encountered.", details = ex.Message });
            }
        }

        [HttpPost("scan/dummy")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ScanReportResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetDummyDataContainer([FromBody] ScanRequest request, CancellationToken cancellationToken)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.ConnectionString) || string.IsNullOrWhiteSpace(request.ContainerName))
            {
                return BadRequest(new { message = "Invalid parameters. Connection string and container name are mandatory." });
            }

            try
            {
                var report = DummyScanReportGenerator.Generate();
                return Ok(report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Azure scan tracking fault encountered.", details = ex.Message });
            }
        }

        /// <summary>
        /// Endpoint 2: Explicit JSON target. Returns the full breakdown payload 
        /// including all structured duplicate file groups for deep client-side table rendering.
        /// </summary>
        [HttpPost("export/json")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ScanReportResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ExportAsJson([FromBody] ScanRequest request, CancellationToken cancellationToken)
        {
            if (IsInvalidRequest(request))
            {
                return BadRequest(new { message = "Invalid parameters. Connection string and container name are mandatory." });
            }

            try
            {
                var result = await _storageService.AnalyzeAndExportReportToJsonAsync(
                    request.ConnectionString,
                    request.ContainerName,
                    cancellationToken: cancellationToken
                );

                return Ok(result.JsonData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "JSON export extraction fault encountered.", details = ex.Message });
            }
        }

        /// <summary>
        /// Endpoint 3: Explicit CSV target. Generates and pushes an unbuffered binary memory 
        /// stream directly into the HTTP response body as an instant file attachment download.
        /// </summary>
        [HttpPost("export/csv")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileStreamResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ExportAsCsv([FromBody] ScanRequest request, CancellationToken cancellationToken)
        {
            if (IsInvalidRequest(request))
            {
                return BadRequest(new { message = "Invalid parameters. Connection string and container name are mandatory." });
            }

            try
            {
                // Force format="csv" strategy inside the storage service handler layer
                var result = await _storageService.AnalyzeAndExportReportCsvAsync(
                    request.ConnectionString,
                    request.ContainerName,
                    cancellationToken: cancellationToken
                );

                if (result.FileStream == null)
                {
                    return StatusCode(500, new { message = "Failed to generate CSV export stream memory pipelines." });
                }

                // Return the underlying stream directly to the browser with standard file headers
                return File(result.FileStream, result.ContentType, result.FileName);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "CSV export data streaming generation failure.", details = ex.Message });
            }
        }

        private static bool IsInvalidRequest(ScanRequest request)
        {
            return request == null ||
                   string.IsNullOrWhiteSpace(request.ConnectionString) ||
                   string.IsNullOrWhiteSpace(request.ContainerName);
        }
    }

}
