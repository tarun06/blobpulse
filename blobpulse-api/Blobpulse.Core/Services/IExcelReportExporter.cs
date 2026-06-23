using Blobpulse.Core.Model;

namespace Blobpulse.Core.Services
{
    public interface IExcelReportExporter
    {
        byte[] Generate(ScanReportResponse metrics);
    }

}
