# MCP Architecture Guide: Local vs Cloud Decision Matrix

> **Workspace:** GPU Ecosystem Portfolio | **Date:** 2026-03-13  
> **Author:** Senior Financial Systems Architect

---

## 1. Overview

Model Context Protocol (MCP) servers extend AI assistants with real-world data capabilities. For financial analysis workflows, the choice between **Local** and **Cloud** deployment affects latency, data privacy, cost, and regulatory compliance. This guide provides a structured decision matrix for the GPU Ecosystem Portfolio.

---

## 2. Server Inventory

| Server ID       | Primary Role                           | Data Sensitivity | Update Frequency |
|-----------------|----------------------------------------|------------------|------------------|
| `sec-edgar`     | Regulatory filing extraction (10-K/Q) | Public           | Quarterly        |
| `calculator`    | Financial ratio computation            | Internal         | On-demand        |
| `web-search`    | Real-time news & market sentiment      | Public           | Continuous       |
| `time-series`   | Historical price & volatility data     | Public/Licensed  | Daily            |

---

## 3. Local vs Cloud Decision Matrix

| Criterion                   | Local Deployment                                    | Cloud Deployment                                      | Recommended For      |
|-----------------------------|-----------------------------------------------------|-------------------------------------------------------|----------------------|
| **Latency**                 | < 50ms (no network hop)                            | 100–500ms (API roundtrip)                             | Local: `calculator`  |
| **Data Privacy**            | Full control; no external transmission              | Depends on provider SLA / data residency policy       | Local: proprietary models |
| **Scalability**             | Limited by local CPU/RAM                            | Elastic; auto-scale under high query volume            | Cloud: `sec-edgar`, `web-search` |
| **Cost Model**              | Fixed (hardware amortization)                       | Variable (per-call or subscription)                   | Cloud: low-frequency use |
| **Maintenance Overhead**    | High (local patching, dependency mgmt)              | Low (provider manages infrastructure)                 | Cloud: `time-series` |
| **Offline Capability**      | Full offline operation possible                     | Requires internet connectivity                         | Local: airgapped env |
| **Compliance (FINRA/SEC)**  | Easier audit trail; data doesn't leave perimeter    | Must vet provider for SOC 2 / ISO 27001                | Local: regulated entities |
| **Throughput**              | Bounded by local I/O                                | High (CDN-backed, distributed)                        | Cloud: bulk filings   |
| **Setup Complexity**        | Moderate (Docker / npx scripts)                     | Low (API key + endpoint URL)                           | Cloud: rapid prototyping |
| **Version Control**         | Full control via local config                       | Provider-managed; may change without notice            | Local: stable prod    |

---

## 4. Recommended Deployment Profiles

### 4.1 Profile A — Individual Analyst (Laptop-Based)

```
[Local]
├── calculator          ← Runs in-process, zero latency
└── sec-edgar (cached)  ← Pull once, cache filings locally

[Cloud]
├── web-search          ← Brave/Perplexity API
└── time-series         ← Polygon.io or Alpaca
```

**Rationale:** Most computations are deterministic (ratios, CAGR). Only live market data requires a cloud call.

---

### 4.2 Profile B — Team / Firm-Wide Deployment

```
[Internal Server (Docker Compose)]
├── sec-edgar           ← Shared cache reduces SEC rate-limit exposure
├── calculator          ← Stateless; horizontally scalable
└── internal-db         ← Proprietary earnings models, consensus data

[Cloud Gateway (API Management)]
├── web-search          ← Rate-limited via Kong/APIM
└── time-series         ← Licensed vendor feed (Bloomberg / Refinitiv)
```

**Rationale:** Centralizing SEC EDGAR behind a shared cache prevents per-analyst throttling. Cloud calls route through a managed gateway for audit logging.

---

### 4.3 Profile C — Automated Reporting Pipeline (CI/CD)

```
[GitHub Actions / Azure DevOps]
├── sec-edgar    ← Triggered on quarterly filing deadlines (XBRL push)
├── calculator   ← Runs in ephemeral container per pipeline
├── web-search   ← Snapshot for earnings-day sentiment reports
└── time-series  ← Pulls T-1 close prices for ratio normalization
```

---

## 5. Latency Budget Model

For a single portfolio refresh (7 tickers × 4 metrics):

$$T_{total} = T_{sec} + T_{calc} + T_{news} + T_{prices}$$

| Component         | Local (ms) | Cloud (ms) | Bottleneck      |
|-------------------|-----------|-----------|-----------------|
| SEC EDGAR pull    | 80        | 450       | Network + parse |
| Calculator        | 5         | 120       | RPC overhead    |
| Web search (news) | N/A       | 800       | LLM summarize   |
| Time-series pull  | 60        | 300       | Data volume     |
| **Total**         | **145**   | **1,670** |                 |

> **Recommendation:** Hybrid architecture — local `calculator` + `sec-edgar` (cached), cloud `web-search` + `time-series`.

---

## 6. MCP Server Configuration Quick-Reference

```json
// VS Code settings.json path: .vscode/settings.json  (workspace-level)
// or:                          %APPDATA%\Code\User\settings.json  (global)
{
  "github.copilot.chat.experimental.mcpServers": {
    "sec-edgar":   { "command": "npx", "args": ["-y", "@mcp/server-sec-edgar"] },
    "calculator":  { "command": "npx", "args": ["-y", "@mcp/server-calculator"] },
    "web-search":  { "command": "npx", "args": ["-y", "@mcp/server-brave-search"] },
    "time-series": { "command": "npx", "args": ["-y", "@mcp/server-timeseries"] }
  }
}
```

---

## 7. Troubleshooting Decision Tree

```
MCP server not responding?
├── Is the process running? → ps aux | grep mcp
│   ├── YES → Check port binding: netstat -tlnp | grep <port>
│   └── NO  → Restart: npx -y <server-package>
├── Rate limit error (429)?
│   ├── sec-edgar → Add SEC_RATE_LIMIT_RPS=5, enable caching
│   └── web-search → Implement exponential backoff
├── JSON parse error?
│   └── Check SEC Edgar response schema version (v2 vs v3 XBRL)
└── Authentication failure?
    └── web-search / time-series → Rotate API key in env vars
```

---

## 8. Security Considerations

| Risk                          | Mitigation                                                        |
|-------------------------------|-------------------------------------------------------------------|
| API key exposure in config    | Use `.env` + `dotenv` loader; never commit secrets to Git         |
| SEC rate limit DoS            | Implement token bucket — max 10 req/s per SEC guidelines          |
| Untrusted MCP server output   | Validate all financial figures against checksum / known reference |
| SSRF via `web-search`         | Allowlist domains; block RFC 1918 / loopback addresses            |
| Stale cached filings          | Set `cache_ttl = 3600s`; invalidate on new EDGAR filing date      |

---

*End of MCP Architecture Guide*
