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

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddMemoryCache();
            // Dependency Injection Enrollment
            builder.Services.AddScoped<IAzureStorageService, AzureStorageService>();
            builder.Configuration
                .SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            builder.Services.Configure<AzureBlobPricingConfig>(builder.Configuration.GetSection("AzureBlobPricing"));

            // Enable CORS so your standalone Next.js/React development server can hit these endpoints
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontendApp", policy =>
                {
                    policy
                          .AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowFrontendApp");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }

    }
}
