using Blobpulse.API.Services;
using Blobpulse.Core.Model.Pricing;
using Blobpulse.Core.Services;

namespace Blobpulse.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var corsPolicy = "CorsPolicy";

            builder.Services.AddControllers();
            builder.Services.AddHealthChecks();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddMemoryCache();
            builder.Services.AddScoped<IAzureStorageService, AzureStorageService>();
            builder.Services.AddScoped<IExcelReportExporter, ExcelReportExporter>();

            builder.Configuration
                .SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            builder.Services.Configure<AzureBlobPricingConfig>(
                builder.Configuration.GetSection("AzureBlobPricing"));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(corsPolicy, policy =>
                {
                    policy.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // ---------------------------
            // Swagger (CUSTOM ROUTE SAFE)
            // ---------------------------

            // RESTRICT SWAGGER TO DEVELOPMENT ONLY
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger(c =>
                {
                    // IMPORTANT: keep default internal route
                    c.RouteTemplate = "api/blob/swagger/{documentName}/swagger.json";
                });

                app.UseSwaggerUI(c =>
                {
                    c.RoutePrefix = "api/blob/swagger";

                    // IMPORTANT: MUST match internal swagger endpoint
                    c.SwaggerEndpoint("/api/blob/swagger/v1/swagger.json", "Blobpulse API v1");
                });
            }

            app.UseHttpsRedirection();

            app.UseCors(corsPolicy);

            app.UseAuthorization();

            app.MapControllers();
            app.MapHealthChecks("api/blob/health");

            app.Run();
        }
    }
}