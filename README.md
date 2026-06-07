# 📦 Blobpulse

> **Azure Blob Storage Optimization Engine.** Visually scan cloud storage containers, identify duplicate files, detect structural clutter, and calculate exact monthly financial waste inside a secure, high-density dashboard.

Blobpulse compiles a lightweight **.NET** metadata indexing engine with a high-performance **Next.js** dashboard layout to give infrastructure teams complete financial visibility over their Azure cloud storage footprint with zero data risk.

---

## ✨ Key Features

* **Duplicate Data Discovery:** Deep metadata indexing maps identical file hashes across massive containers to pinpoint redundant staging assets or backup bloat.
* **Cost Optimization Dashboard:** Translates raw bytes into concrete financial metrics, showing exactly how many dollars can be reclaimed by pruning duplicates.
* **100% On-Premise / Private Execution:** Deploys as a self-contained ecosystem within your private network. **No files or metadata ever leave your perimeter.**
* **Read-Only Safeties:** Connects using limited-privilege Azure Shared Access Signatures (SAS) to guarantee data integrity.

---

## 🏗️ Architecture Overview

The system is compiled into a single, unified Docker container:

```
  ┌────────────────────────────────────────────────────────┐
  │                   ON-PREMISE CONTAINER                 │
  │                                                        │
  │   ┌───────────────────────┐    ┌───────────────────┐   │
  │   │  Next.js Frontend     │───>│ .NET API Engine   │   │
  │   │  (Port 3000 -> 80)    │    │ (Port 8000)       │   │
  │   └───────────────────────┘    └───────────────────┘   │
  └───────────────────────────────────│────────────────────┘
                                      │ (Read-Only API Requests)
                                      ▼
                        📥 [ Your Azure Blob Storage ]

```

---

## 🚀 Local Development Quickstart

To build and launch the application locally on your workstation for rapid testing:

### 1. Execute the Deployment Script

Run the pre-configured start script from your terminal root directory:

```bash
./start.sh

```

### 2. Access Ports

* **Minimalist Dashboard UI:** `http://localhost:3000`
* **API Swagger Sandbox:** `http://localhost:8000/api/blob/swagger/index.html`

---

## 🏢 Enterprise Production Deployment

For enterprise-grade security, deploy Blobpulse on an **Internal Private Virtual Machine** with no public IP address inside your corporate Virtual Network (VNet).

### Method A: Automated Cloud Installation (Recommended)

SSH into your private Linux host and run the automated continuous deployment setup script:

```bash
# 1. Create your installation script
nano install.sh

# 2. Paste script, save, and apply execution permissions
chmod +x install.sh

# 3. Execute installation
sudo ./install.sh

```

### Method B: Air-Gapped / Isolated Installation

If the production server does not have access to external public networks to reach GitHub Container Registry, package the image manually on your local workstation:

```bash
# 1. Compress image into a standalone archive file locally
docker save -o blobpulse_prod_image.tar ghcr.io/tarun06/blobpulse:latest

# 2. Securely copy the archive to the remote machine
scp blobpulse_prod_image.tar user@your-private-vm-ip:/home/user/

# 3. SSH into the server and extract the layout directly into Docker
sudo docker load -i blobpulse_prod_image.tar

# 4. Launch the container locally
sudo docker run -d \
  -p 80:3000 \
  -p 8000:8000 \
  -e API_PORT=8000 \
  -e ASPNETCORE_URLS="http://0.0.0.0:8000" \
  --restart unless-stopped \
  --name blobpulse-prod-app \
  ghcr.io/tarun06/blobpulse:latest

```

---

## 🔒 Security Compliance Checklist

To gain rapid approval from your organization's cybersecurity team, ensure the following constraints are configured:

| Objective | Configuration Requirement |
| --- | --- |
| **Data Ingestion** | Enforce **Read-Only / List** permissions on the Azure SAS Token. Uncheck Write/Delete privileges. |
| **Network Pathing** | Bind the VM to your private VNet and access securely via your corporate VPN or Bastion tunnel. |
| **Zero Persistence** | Metadata calculations are kept strictly **in-memory**. No file objects or contents are ever indexed onto local disk storage. |

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more detailed information.