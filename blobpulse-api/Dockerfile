# -------------------- BASE RUNTIME --------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app

EXPOSE 80
EXPOSE 8080
EXPOSE 443

# -------------------- BUILD STAGE --------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution first (for caching)
COPY Blobpulse.slnx ./

# Copy project files (IMPORTANT for restore stability)
COPY Blobpulse.API/Blobpulse.API.csproj Blobpulse.API/
COPY Blobpulse.Core/Blobpulse.Core.csproj Blobpulse.Core/

RUN ls -R /src

# Restore
RUN dotnet restore Blobpulse.slnx

# Copy everything else
COPY . .

# Build
RUN dotnet build Blobpulse.API/Blobpulse.API.csproj -c Release -o /app/build

# -------------------- PUBLISH STAGE --------------------
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# -------------------- FINAL RUNTIME --------------------
FROM base AS final
WORKDIR /app

COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Blobpulse.API.dll"]