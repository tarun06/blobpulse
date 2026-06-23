using Blobpulse.Core.Model;
using Blobpulse.Core.Services;
using ClosedXML.Excel;

namespace Blobpulse.API.Services
{
    public sealed class ExcelReportExporter : IExcelReportExporter
    {
        public byte[] Generate(ScanReportResponse report)
        {
            using var workbook = new XLWorkbook();

            var ws = workbook.Worksheets.Add("BlobPulse Report");

            int row = 1;

            CreateTitle(ws, ref row);

            CreateKpiCards(ws, report);

            CreateCostAnalysis(ws, report);

            CreateContainerHealth(ws, report);

            CreateDuplicateFindings(ws, report);

            ws.Columns().AdjustToContents();

            ws.Column(1).Width = 25;
            ws.Column(2).Width = 30;
            ws.Column(3).Width = 15;
            ws.Column(6).Width = 22;
            ws.Column(7).Width = 15;

            ws.SheetView.FreezeRows(1);

            using var stream = new MemoryStream();

            workbook.SaveAs(stream);

            return stream.ToArray();
        }

        private void CreateTitle(
            IXLWorksheet ws,
            ref int row)
        {
            ws.Range(row, 1, row + 1, 8).Merge();

            var cell = ws.Cell(row, 1);

            cell.Value =
                "BLOBPULSE STORAGE OPTIMIZATION REPORT";

            cell.Style.Font.Bold = true;
            cell.Style.Font.FontSize = 20;
            cell.Style.Font.FontColor = XLColor.White;

            cell.Style.Fill.BackgroundColor =
                XLColor.FromHtml("#0F172A");

            cell.Style.Alignment.Horizontal =
                XLAlignmentHorizontalValues.Center;

            cell.Style.Alignment.Vertical =
                XLAlignmentVerticalValues.Center;

            ws.Row(row).Height = 30;
            ws.Row(row + 1).Height = 30;

            row += 3;

            ws.Cell(row, 1).Value = "Generated";

            ws.Cell(row, 2).Value =
                DateTime.UtcNow.ToString(
                    "dd-MMM-yyyy HH:mm UTC");

            row += 3;
        }


        private void CreateKpiCards(
            IXLWorksheet ws,
            ScanReportResponse report)
        {
            CreateCard(
                ws,
                "A6:B8",
                "Blobs Scanned",
                report.TotalBlobsScanned.ToString(),
                "#DBEAFE");

            CreateCard(
                ws,
                "C6:E8",
                "Duplicate Groups",
                report.TotalDuplicateGroups.ToString(),
                "#FEF3C7");

            CreateCard(
                ws,
                "F6:H8",
                "Storage Waste",
                $"{report.TotalWastedSpaceGb:N2} GB",
                "#FEE2E2");
        }

        private void CreateCard(
            IXLWorksheet ws,
            string range,
            string title,
            string value,
            string color)
        {
            var card = ws.Range(range);

            card.Merge();

            card.Value =
                $"{title}\n\n{value}";

            card.Style.Alignment.Horizontal =
                XLAlignmentHorizontalValues.Center;

            card.Style.Alignment.Vertical =
                XLAlignmentVerticalValues.Center;

            card.Style.Alignment.WrapText = true;

            card.Style.Font.Bold = true;

            card.Style.Font.FontSize = 14;

            card.Style.Fill.BackgroundColor =
                XLColor.FromHtml(color);

            card.Style.Border.OutsideBorder =
                XLBorderStyleValues.Medium;

            card.Style.Border.OutsideBorderColor =
                XLColor.Gray;


            var startRow =
                card.FirstRow().RowNumber();

            var endRow =
                card.LastRow().RowNumber();


            for (int i = startRow; i <= endRow; i++)
            {
                ws.Row(i).Height = 30;
            }
        }

        private void CreateCostAnalysis(
            IXLWorksheet ws,
            ScanReportResponse report)
        {
            int row = 11;

            SectionHeader(
                ws,
                row,
                "COST ANALYSIS");

            row += 2;

            AddRow(
                ws,
                row++,
                "Monthly Storage Waste",
                $"${report.EstimatedMonthlyStorageWasteUsd:N2}");

            AddRow(
                ws,
                row++,
                "Monthly Operation Cost",
                $"${report.EstimatedMonthlyOperationCostUsd:N2}");

            AddRow(
                ws,
                row++,
                "Potential Savings",
                $"${report.PotentialMonthlySavingsUsd:N2}");
        }

        private void CreateContainerHealth(
            IXLWorksheet ws,
            ScanReportResponse report)
        {
            int row = 18;

            SectionHeader(
                ws,
                row,
                "CONTAINER HEALTH");

            row += 2;

            AddRow(
                ws,
                row++,
                "Bloat Index",
                $"{report.ContainerBloatIndexPercentage:N2}%");

            AddRow(
                ws,
                row++,
                "Impact",
                report.OperationalImpactSummary);
        }


        private void CreateDuplicateFindings(
            IXLWorksheet ws,
            ScanReportResponse report)
        {
            int row = 23;

            SectionHeader(
                ws,
                row,
                "DUPLICATE FINDINGS");

            row += 2;

            string[] headers =
            {
                "Group ID",
                "Primary File",
                "Duplicate Files",
                "Waste",
                "Tier"
            };

            for (int i = 0; i < headers.Length; i++)
            {
                ws.Cell(row, i + 1)
                  .Value = headers[i];
            }

            ws.Range(row, 1, row, 5)
              .Style.Font.Bold = true;

            row++;

            foreach (var group in report.DuplicateGroups)
            {
                ws.Cell(row, 1)
                  .Value = group.StructuralId;

                ws.Cell(row, 2)
                  .Value = group.PrimaryInstance.Name;

                ws.Cell(row, 3)
                  .Value = group.RedundantInstances.Count;

                ws.Cell(row, 4)
                  .Value =
                  FormatBytes(group.WastedBytes);

                ws.Cell(row, 5)
                  .Value =
                  group.PrimaryInstance.AccessTier;


                row++;
            }

            row += 2;

            CreateDetails(
                ws,
                row,
                report);
        }


        private void CreateDetails(
            IXLWorksheet ws,
            int row,
            ScanReportResponse report)
        {
            SectionHeader(
                ws,
                row,
                "DETAILS");

            row += 2;

            int headerRow = row;

            string[] headers =
            {
                "Group ID",
                "File",
                "Role",
                "Size",
                "Tier",
                "Created",
                "Blob Link",
                "Waste"
            };

            for (int i = 0; i < headers.Length; i++)
            {
                ws.Cell(row, i + 1)
                  .Value = headers[i];
            }


            ws.Range(row, 1, row, 8)
              .Style.Font.Bold = true;


            row++;


            foreach (var group in report.DuplicateGroups)
            {
                AddFile(
                    ws,
                    ref row,
                    group.StructuralId,
                    "Primary",
                    group.PrimaryInstance,
                    group.WastedBytes);


                foreach (var duplicate in group.RedundantInstances)
                {
                    AddFile(
                        ws,
                        ref row,
                        group.StructuralId,
                        "Duplicate",
                        duplicate,
                        duplicate.SizeBytes);
                }
            }

            var tableRange = ws.Range(headerRow, 1, row - 1, 8);

            var table = tableRange.CreateTable();

            table.Name = "BlobDuplicateDetails";

            table.Theme = XLTableTheme.TableStyleMedium2;
        }


        private void AddFile(
            IXLWorksheet ws,
            ref int row,
            string groupId,
            string role,
            BlobFileDto file,
            long waste)
        {
            ws.Cell(row, 1).Value = groupId;

            ws.Cell(row, 2).Value = file.Name;

            ws.Cell(row, 3).Value = role;

            ws.Cell(row, 4).Value =
                FormatBytes(file.SizeBytes);

            ws.Cell(row, 5).Value =
                file.AccessTier;

            ws.Cell(row, 6).Value =
                file.CreatedOn.UtcDateTime;


            var link = ws.Cell(row, 7);

            link.Value = "Open Blob";


            if (!string.IsNullOrWhiteSpace(file.BlobUrl))
            {
                link.SetHyperlink(new XLHyperlink(file.BlobUrl));
            }

            ws.Cell(row, 8).Value =
                FormatBytes(waste);

            row++;
        }


        private void SectionHeader(
            IXLWorksheet ws,
            int row,
            string title)
        {
            ws.Range(row, 1, row, 8)
              .Merge();

            ws.Cell(row, 1)
              .Value = title;

            ws.Cell(row, 1)
              .Style.Font.Bold = true;

            ws.Cell(row, 1)
              .Style.Fill.BackgroundColor =
              XLColor.FromHtml("#BDE3EF");
        }


        private void AddRow(
            IXLWorksheet ws,
            int row,
            string name,
            string value)
        {
            ws.Cell(row, 1).Value = name;

            ws.Cell(row, 2).Value = value;

            ws.Cell(row, 1)
              .Style.Font.Bold = true;
        }


        private string FormatBytes(long bytes)
        {
            double size = bytes;

            string[] units =
            {
                "B",
                "KB",
                "MB",
                "GB",
                "TB"
            };

            int index = 0;

            while (size >= 1024 && index < units.Length - 1)
            {
                size /= 1024;
                index++;
            }

            return $"{size:N2} {units[index]}";
        }
    }
}
