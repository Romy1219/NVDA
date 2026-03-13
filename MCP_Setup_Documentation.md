# MCP Setup Documentation

**Servers Covered:** SEC EDGAR, Calculator, Web Search, Time Series  
**Objective:** Replicable setup for AI-enhanced financial analysis in VS Code  
**Date:** 2026-03-14

---

## 1) Configuration Template

Add/update server entries in your MCP settings file:

```json
{
  "mcpServers": {
    "sec-edgar": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sec-edgar"],
      "env": {
        "SEC_EDGAR_USER_AGENT": "YourName your.email@example.com",
        "SEC_EDGAR_API_BASE": "https://data.sec.gov",
        "SEC_RATE_LIMIT_RPS": "8"
      }
    },
    "calculator": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-calculator"],
      "env": {
        "CALC_PRECISION": "6",
        "CALC_CURRENCY_DEFAULT": "USD"
      }
    },
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "<YOUR_BRAVE_API_KEY>"
      }
    },
    "time-series": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-timeseries"],
      "env": {
        "TS_DATA_PROVIDER": "polygon",
        "POLYGON_API_KEY": "<YOUR_POLYGON_API_KEY>",
        "TS_DEFAULT_INTERVAL": "1d"
      }
    }
  }
}
```

---

## 2) Step-by-Step Replication Guide

### Step 1 — Open Workspace
```powershell
Set-Location d:\new\nividia
```

### Step 2 — Validate Node/NPX
```powershell
node -v
npx -v
```

### Step 3 — Verify Each MCP Server Package
```powershell
npx -y @modelcontextprotocol/server-sec-edgar --help
npx -y @modelcontextprotocol/server-calculator --help
npx -y @modelcontextprotocol/server-brave-search --help
npx -y @modelcontextprotocol/server-timeseries --help
```

### Step 4 — Load API Keys (if needed)
```powershell
$env:BRAVE_API_KEY="<YOUR_BRAVE_API_KEY>"
$env:POLYGON_API_KEY="<YOUR_POLYGON_API_KEY>"
```

### Step 5 — Reload VS Code
Reload the window so MCP config changes are applied.

### Step 6 — Smoke Tests
1. SEC EDGAR: retrieve latest NVDA Revenue and Net Income.  
2. Calculator: compute net margin using:

$$Net\ Margin = \frac{Net\ Income}{Revenue} \times 100\%$$

3. Web Search: fetch one market-share estimate source.  
4. Time Series: request 1-year daily price history for NVDA.

---

## 3) Reliability and Governance Controls

| Control Area | Recommended Practice | Why It Matters |
|---|---|---|
| API Key Security | Keep keys in environment variables, not committed files | Prevents credential leakage |
| EDGAR Rate Limits | Keep request rates conservative (e.g., 5–8 RPS) | Reduces throttling risk |
| Source Traceability | Log filing accession numbers and retrieval dates | Enables audit-ready research |
| Calculation Auditability | Preserve formulas in Markdown/LaTeX | Improves reproducibility |
| Fallback Strategy | Keep at least one alternate source for market data | Improves resilience |

---

## 4) Common Errors and Fixes

| Symptom | Root Cause | Resolution |
|---|---|---|
| Server not discovered | Invalid config JSON | Validate JSON syntax; remove trailing commas |
| Authentication errors | Missing API key | Set required environment variables and restart |
| Slow or timed-out requests | External API latency | Increase timeout and add retries |
| SEC 429 errors | Request burst too high | Lower request rate and cache responses |

---

## 5) Analyst Workflow Standard

Recommended daily sequence:
1. Pull filings (SEC EDGAR)
2. Compute ratios (Calculator)
3. Add market context (Web Search)
4. Validate price action (Time Series)
5. Publish structured memo with formulas and assumptions

This standard supports repeatable, professional-quality financial analysis aligned with portfolio and classroom submission requirements.
