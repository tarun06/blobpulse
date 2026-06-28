# BlobPulse Roadmap

BlobPulse is a **self-hosted Azure Blob Storage Optimization Engine** designed for on-prem deployment.

It performs high-performance read-only metadata scanning to detect duplicates, storage waste, and cost optimization opportunities.

---

# 🟢 Current Release (v1.0 – v1.1)

## ✅ Already Implemented

### Core Engine
- Azure Blob Storage scanning
- Parallel metadata ingestion
- Duplicate detection (hash-based grouping)
- Storage analytics dashboard
- Tier detection (Hot / Cool / Cold / Archive)
- Read-only architecture
- Docker deployment support

---

### Reporting & Control (v1.1)
- 📥 Excel Report Export
- 🔄 Force Scan (bypass cache)
- ⚡ Performance improvements
- 🧠 Improved duplicate grouping accuracy
- 🧾 Scan caching system

---

# 🥇 Next Priority (v1.3 – Optimization Advisor)

> ⭐ This is the most important feature in BlobPulse

### Goal
Turn BlobPulse into a **decision engine that generates cost-saving actions**

---

### Features
- Smart duplicate deletion recommendations
- Cold data detection
- Tier optimization (Hot → Cool → Archive)
- Savings estimation ($ / month)
- Confidence scoring
- Risk classification (Low / Medium / High)
- Action plan generation (CLI / PowerShell)

---

### Example
```
Delete duplicates → Save $42/month → 120GB → 99% confidence
Move logs to Cool tier → Save $18/month
```

---

# 🥈 v1.2 – Storage Insights

- Scan history
- Blob search (name / size / type)
- Largest blobs view
- Storage breakdown (container / type)
- Cold data detection (30/90/180 days)
- Storage growth trends

---

# 🥉 v1.4 – Reporting & Automation

- PDF reports
- Scheduled scans
- Scheduled reports (weekly/monthly)
- Incremental scanning
- Azure CLI export scripts
- PowerShell automation scripts

---

# 🔵 v2.0 – Config-Driven Enterprise Mode

- Multi-storage profiles (appsettings.json)
- Multi-container dashboards
- REST API for integration
- Local audit logs
- Rule-based scan configuration

---

# 🟠 v2.1 – Intelligence Layer

- Storage growth prediction
- Duplication hotspot detection
- Recommendation tuning engine
- Priority-based optimization ranking

---

# 🔴 v3.0 – Optimization Policy Engine

- Rule-based optimization policies
- Manual approval workflows
- Continuous optimization mode
- Audit trail of all actions
- Organization-level policies

---

# 🧭 Product Vision

BlobPulse is a:

> **Read-only, high-performance Azure Blob Storage optimization engine that converts storage data into actionable cost-saving recommendations**

---

# 🎯 Core Principles

- Visibility → What exists
- Optimization → What can be saved
- Actionability → What should be done