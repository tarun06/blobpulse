# BlobPulse

<p align="center">

<img src="docs/dashboard.png" width="100%"/>

</p>

<h3 align="center">
Azure Blob Storage Optimization Engine
</h3>

<p align="center">

Analyze Azure Blob Storage at scale, identify duplicate blobs, estimate storage waste, and calculate potential cloud cost savings through a modern, enterprise-ready dashboard.

</p>

<p align="center">

<img src="https://img.shields.io/badge/.NET-10-blue" />
<img src="https://img.shields.io/badge/Next.js-15-black" />
<img src="https://img.shields.io/badge/Azure-Blob%20Storage-0078D4" />
<img src="https://img.shields.io/badge/Docker-Ready-2496ED" />
<img src="https://img.shields.io/badge/License-MIT-green" />

</p>

---

# 🚀 Overview

BlobPulse is an enterprise-grade Azure Blob Storage analytics platform designed to help organizations discover redundant storage, identify duplicate files, estimate financial waste, and optimize cloud storage costs without modifying production data.

Unlike traditional storage explorers, BlobPulse focuses on **actionable insights rather than file browsing**.

The application performs metadata analysis only and operates in **read-only mode**, making it safe for production environments.

---

# ✨ Features

## 🔍 Duplicate Detection

Detect identical blobs across one or more containers using metadata comparison.

✔ Duplicate Groups  
✔ Redundant Blob Discovery  
✔ Hash-based Identification  
✔ Primary vs Redundant classification  
✔ Storage Reclamation Estimates  

---

## 📊 Storage Analytics

Understand storage utilization through an interactive dashboard.

- Blob Count
- Duplicate Percentage
- Container Bloat Index
- Storage Consumption
- Waste Distribution
- Monthly Cost Estimation
- Storage Tier Breakdown

---

## 💰 Cost Optimization

Convert duplicate storage into financial metrics.

- Monthly Waste
- Recoverable Savings
- Storage Tier Pricing
- Regional Pricing Support

---

## 📥 Reporting & Export (NEW)

- 📥 Excel Report Export (.xlsx)
- 📊 Full scan summary export
- 📦 Duplicate group breakdown
- 💰 Cost savings breakdown
- 🧾 Offline analysis support

---

## 🔄 Scan Control (NEW)

- 🔄 Force Scan (bypass cache for fresh analysis)
- ⚡ Cached scan for performance optimization
- 🧠 Improved scan execution workflow

---

## 🧠 Optimization Engine (UPCOMING – CORE FEATURE)

- Smart duplicate deletion recommendations
- Storage tier optimization (Hot → Cool → Archive)
- Cold data detection (inactive blobs)
- Savings estimation per action
- Confidence scoring engine
- Risk classification (Low / Medium / High)

---

## 🏢 Enterprise Security

BlobPulse never modifies Azure Storage.

- Read-only SAS authentication
- Metadata-only analysis
- Zero file downloads
- Zero blob modifications
- Private network deployment
- On-premises support
- Air-gapped deployment ready

---

## 🎨 Modern Dashboard

- Dark theme UI
- High-density analytics layout
- Interactive charts
- Duplicate browser
- Pricing calculator
- Real-time metrics

---

# 📥 Demo Video

```
https://raw.githubusercontent.com/tarun06/blobpulse/main/docs/BlobPulse.mp4
```

---

# 📸 Screenshots

## Dashboard

<img src="docs/dashboard.png"/>

---

## Connection Settings

<img src="docs/settings-connection.png"/>

---

## Pricing Configuration

<img src="docs/settings-pricing.png"/>

---

## About Page

<img src="docs/settings-about.png"/>

---

# 🏗 Architecture

```
Azure Blob Storage
        │
        ▼
Read-Only SAS Access
        │
        ▼
.NET 10 Metadata Engine
        │
        ▼
Parallel Duplicate Detection Engine
        │
        ▼
Cost Analysis Service
        │
        ▼
Next.js Dashboard UI
```

---

# ⚙️ Technology Stack

| Component | Technology |
|------------|------------|
| Frontend | Next.js 15 |
| Backend | ASP.NET Core .NET 10 |
| UI | React |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Storage SDK | Azure Storage SDK |
| Authentication | SAS Tokens |
| Deployment | Docker |
| Runtime | Linux Containers |

---

# 📊 Dashboard Metrics

BlobPulse provides actionable storage intelligence:

- Total Blobs Scanned
- Duplicate Groups
- Redundant Files
- Wasted Storage (GB)
- Monthly Storage Waste ($)
- Recoverable Savings ($)
- Container Bloat Index
- Storage Tier Distribution
- Duplicate Preview
- Redundant Instances
- Scan Mode (Cached / Force Scan)

---

# 💰 Pricing Engine

- Azure region-based pricing
- Storage tier cost modeling
- Operation cost estimation
- Monthly & yearly projections

Supports:
- Hot
- Cool
- Cold
- Archive

---

# 🔐 Security

## Read-only Access

- List permissions
- Read permissions only

## Metadata Only Processing

- Blob Name
- Size
- ETag
- Last Modified
- Content Type

## Deployment Safety

- No writes
- No deletions
- No uploads
- No external API calls

---

# ⚙️ Local Development

## Clone Repository

```bash
git clone https://github.com/tarun06/blobpulse.git
cd blobpulse
```

---

## Run Locally

```bash
./start.sh
```

---

## Access

- Dashboard: http://localhost:3000
- API Swagger: http://localhost:8000/api/blob/swagger

---

# 🐳 Docker

## Build

```bash
docker compose build
```

## Run

```bash
docker compose up -d
```

## Stop

```bash
docker compose down
```

---

# 🚀 Production Deployment

```bash
docker run -d \
  -p 3000:3000 \
  -p 8080:8080 \
  -e UI_PORT=3000 \
  -e API_PORT=8080 \
  -e ASPNETCORE_URLS="http://0.0.0.0:8080" \
  --name blobpulse-prod-app \
  ghcr.io/tarun06/blobpulse:latest
```

---

# 🌐 Air-Gapped Deployment

## Export Image

```bash
docker save -o blobpulse.tar ghcr.io/tarun06/blobpulse:latest
```

## Import Image

```bash
docker load -i blobpulse.tar
```

## Run

```bash
 docker run -d \
  -p 3000:3000 \
  -p 8080:8080 \
  -e UI_PORT=3000 \
  -e API_PORT=8080 \
  -e ASPNETCORE_URLS="http://0.0.0.0:8080" \
  --name blobpulse-prod-app \
  ghcr.io/tarun06/blobpulse:latest
```

---

# 🔄 Typical Workflow

```
Connect to Azure Storage
        ↓
Scan Containers
        ↓
Index Metadata
        ↓
Detect Duplicates
        ↓
Calculate Savings
        ↓
Review Dashboard
        ↓
Optimize Storage
```

---

# 📦 Use Cases

- Enterprise IT
- Cloud Architects
- DevOps Teams
- FinOps Engineers
- Storage Administrators
- Managed Service Providers

---

# 🧭 Roadmap

BlobPulse is evolving into a **Storage Optimization Decision Engine**.

---

## 🥈 v1.2 – Storage Insights

- Scan history tracking
- Blob search
- Largest blobs view
- Storage breakdown analytics
- Growth trends

---

## 🥇 v1.3 – Optimization Advisor (TOP PRIORITY)

- Smart duplicate deletion recommendations
- Storage tier optimization (Hot → Cool → Archive)
- Cold data detection (inactive blobs)
- Savings estimation per action ($ impact)
- Confidence scoring engine
- Risk classification (Low / Medium / High

---

## 🥈 v1.2 – Storage Insights

- Scan history tracking
- Blob search
- Largest blobs view
- Storage breakdown analytics
- Growth trends

---

## 🥉 v1.4 – Automation & Reporting

- PDF reports
- Scheduled scans
- Scheduled reports
- Azure CLI export scripts
- PowerShell automation

---

## 🔵 v2.0 – Enterprise Mode

- Multi-storage configurations
- API enhancements
- Rule-based scan engine
- Audit logging system

---

# 💡 Why BlobPulse?

✔ Detect duplicate blobs  
✔ Estimate storage waste  
✔ Reduce cloud cost  
✔ Improve efficiency  
✔ Run fully on-prem  
✔ No data modification risk  

---

# 📜 License

MIT License

---

# 👤 Author

**Tarun Kalal**

Software Architect  
Cloud • .NET • Distributed Systems • FinOps Optimization

GitHub: https://github.com/tarun06