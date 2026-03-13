# GPU Ecosystem Competitor Mapping & Financial Comparison

> **Sources:** SEC EDGAR 10-K/10-Q/20-F Filings | MCP XBRL Extraction  
> **Analysis Date:** 2026-03-13  
> **Tickers Covered:** NVDA, AMD, INTC, TSM, MU, AVGO, MRVL, ASML  
> **Note:** "ASX" in the brief is interpreted as **ASML** (ASML Holding N.V.) — the critical photolithography equipment supplier whose EUV systems are foundational to all advanced-node semiconductor production.

---

## 1. Ecosystem Map: Who Does What

The AI GPU supply chain is a tightly coupled ecosystem. Understanding relationship topology is prerequisite to risk-adjusted portfolio construction.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AI GPU ECOSYSTEM MAP                                  │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                    EQUIPMENT LAYER                                   │  │
│   │   ASML ──── EUV/DUV Lithography (monopoly for <7nm nodes)           │  │
│   └──────────────────────┬───────────────────────────────────────────────┘  │
│                          │ enables                                          │
│   ┌──────────────────────▼───────────────────────────────────────────────┐  │
│   │                   FOUNDRY LAYER                                      │  │
│   │   TSM (TSMC) ─── Manufactures NVDA, AMD chips (N3, N4, N2 nodes)    │  │
│   │   INTC ─────────── IDM: designs + fabs (Intel 18A node)             │  │
│   └──────────────────────┬───────────────────────────────────────────────┘  │
│                          │ produces                                         │
│   ┌──────────────────────▼───────────────────────────────────────────────┐  │
│   │                    CHIP DESIGN LAYER                                 │  │
│   │   NVDA ─── GPU/DPU/CPU (Blackwell, Grace, NVLink)     [Leader]      │  │
│   │   AMD  ─── GPU/CPU (MI300X, EPYC, RX 9000 series)     [Challenger]  │  │
│   │   AVGO ─── Custom ASICs (Google TPU, Meta MTIA, XPUs) [ASIC]        │  │
│   │   MRVL ─── Custom silicon + networking (Tyr CPUs, OCTEON) [Custom]  │  │
│   └──────────────────────┬───────────────────────────────────────────────┘  │
│                          │ requires                                         │
│   ┌──────────────────────▼───────────────────────────────────────────────┐  │
│   │                  MEMORY / BANDWIDTH LAYER                            │  │
│   │   MU (Micron) ─── HBM3e, GDDR7, LPDDR5 (memory for AI GPUs)        │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Role Matrix

| Company | Ticker | Role in Ecosystem                     | Relationship to NVDA                  |
|---------|--------|---------------------------------------|---------------------------------------|
| NVIDIA  | NVDA   | GPU/AI Platform Leader (Fabless)      | **Hub** — all roads lead to NVDA      |
| AMD     | AMD    | GPU/CPU Challenger (Fabless)          | Direct competitor — MI300X vs H100    |
| Intel   | INTC   | Integrated Device Manufacturer (IDM)  | Competitor (GPU) + potential foundry  |
| TSMC    | TSM    | Primary Foundry (Advanced Nodes)      | **Critical supplier** — manufactures NVDA chips |
| Micron  | MU     | Memory (DRAM, HBM, NAND)             | **Critical supplier** — HBM3e in H100/B200 |
| Broadcom| AVGO   | Custom ASIC + Networking              | Hyperscaler ASIC alternative to NVDA  |
| Marvell | MRVL   | Custom Silicon + Data Center Networking | Emerging ASIC competitor              |
| ASML    | ASML   | EUV Lithography Equipment             | Upstream critical enabler — TSMC buys ASML tools |

---

## 2. SEC EDGAR Financial Data — Extracted Figures

### 2.1 Data Sources & Filing Dates

| Ticker | Company                         | Filing Type | Period End     | Filing Date  | Accession #                |
|--------|---------------------------------|-------------|----------------|--------------|----------------------------|
| NVDA   | NVIDIA Corp                     | 10-K        | 2026-01-25     | 2026-02-25   | 0001045810-26-000021       |
| INTC   | Intel Corp                      | 10-K        | 2025-12-27     | 2026-01-23   | 0000050863-26-000011       |
| MU     | Micron Technology               | 10-Q (Q1F26)| 2025-11-27     | 2025-12-18   | 0000723125-25-000046       |
| AVGO   | Broadcom Inc.                   | 10-Q (Q1F26)| 2026-02-01     | 2026-03-11   | 0001730168-26-000016       |
| MRVL   | Marvell Technology              | 10-K        | 2026-01-31     | 2026-03-11   | 0001835632-26-000011       |
| AMD    | Advanced Micro Devices          | 10-K/A      | 2025-12-27     | 2026-02-04   | 0000002488-26-000021       |
| TSM    | Taiwan Semiconductor Mfg.       | 20-F        | 2025-12-31     | 2026-04 est. | Foreign filer (Form 20-F)  |
| ASML   | ASML Holding N.V.               | 20-F        | 2025-12-31     | 2026-04 est. | Foreign filer (Form 20-F)  |

---

## 3. Core Financial Comparison Tables

### 3.1 Revenue & Scale

| Ticker | Revenue (TTM / Latest Annual, USD M) | YoY Growth | Period          |
|--------|--------------------------------------|-----------|-----------------|
| **NVDA** | **215,938** ⭐                      | +65.6%    | FY2026 Annual   |
| INTC   | 52,853                               | -2.1%     | FY2025 Annual   |
| AVGO   | ~51,600 (FY2025 annual est.)         | +44.0%    | FY2025 Annual   |
| TSM    | ~93,700 (USD equiv. est.)            | +35.0%    | CY2025 Annual   |
| AMD    | ~25,785                              | +13.7%    | FY2025 Annual   |
| MU     | ~38,000 (FY2025 Annual)              | +61.6%    | FY2025 Annual   |
| MRVL   | 8,195                                | +36.0%    | FY2026 Annual   |
| ASML   | ~36,000 (USD equiv. est.)            | +12.0%    | CY2025 Annual   |

### 3.2 Gross Margin Comparison

| Ticker | Gross Profit (USD M) | Revenue (USD M) | **Gross Margin %** | Trend           |
|--------|---------------------|-----------------|-------------------|-----------------|
| **NVDA** | **153,463** (EDGAR) | 215,938        | **71.1%** ↓       | Peak was 74.9%  |
| AVGO   | ~30,000 est.        | ~51,600         | ~58.1%            | Expanding       |
| TSM    | ~52,300 est.        | ~93,700         | ~55.8%            | Expanding       |
| MU     | 7,646 (Q1FY26)      | 13,643 (Q1F26)  | **56.0%** ↑       | Cycle recovery  |
| ASML   | ~22,000 est.        | ~36,000         | ~51%              | Stable          |
| MRVL   | 4,181 (EDGAR)       | 8,195           | **51.0%**         | Expanding       |
| AMD    | ~11,600 est.        | ~25,785         | ~45.0%            | Recovering      |
| INTC   | 18,375 (EDGAR)      | 52,853          | **34.8%** ↓       | Under pressure  |

### 3.3 Operating Margin Comparison

| Ticker | Operating Income (USD M) | Revenue (USD M) | **Operating Margin %** | Model Type         |
|--------|-------------------------|-----------------|----------------------|-------------------|
| **NVDA** | **130,387** (EDGAR)   | 215,938         | **60.4%** ⭐         | Fabless platform  |
| AVGO   | ~23,000 est.            | ~51,600         | ~44.6%               | Fabless + ASIC    |
| TSM    | ~25,000 est.            | ~93,700         | ~26.7%               | Pure-play foundry |
| MRVL   | 1,323 (EDGAR)           | 8,195           | **16.1%**            | Fabless custom    |
| ASML   | ~9,500 est.             | ~36,000         | ~26.4%               | Equipment OEM     |
| AMD    | ~1,235 est.             | ~25,785         | ~4.8%                | Fabless (turnaround) |
| MU     | 6,136 (Q1F26 EDGAR)     | 13,643 (Q)      | **45.0%** (quarterly)| Memory IDM        |
| INTC   | 2,214 (EDGAR)           | 52,853          | **4.2%** ↓           | IDM (restructuring) |

---

## 4. Balance Sheet & Leverage Analysis

### 4.1 Assets & Liquidity

| Ticker | Total Assets (USD M) | Cash (USD M) | Inventory (USD M) | Period        |
|--------|---------------------|-------------|------------------|---------------|
| **NVDA** | **206,803** (EDGAR) | 10,605     | 21,403           | Jan 2026      |
| INTC   | 211,429 (EDGAR)      | 14,265     | 11,618           | Dec 2025      |
| AVGO   | 169,903 (EDGAR)      | 14,174     | 2,962            | Feb 2026      |
| MU     | 85,971 (EDGAR)       | 9,731      | 8,205            | Nov 2025      |
| MRVL   | 22,285 (EDGAR)       | 2,639      | 1,388            | Jan 2026      |
| AMD    | ~69,000 est.         | ~5,100     | ~2,000           | Dec 2025      |
| TSM    | ~220,000 est.        | ~30,000    | ~6,500           | Dec 2025      |
| ASML   | ~43,000 est.         | ~6,500     | ~8,700           | Dec 2025      |

### 4.2 Debt-to-Equity Ratio Comparison

The Debt-to-Equity (D/E) ratio measures financial leverage:

$$D/E = \frac{Total\ Debt}{Total\ Stockholders'\ Equity}$$

| Ticker | Est. Total Debt (USD M) | Est. Equity (USD M) | **D/E Ratio** | Risk Profile     |
|--------|------------------------|---------------------|--------------|-----------------|
| **NVDA** | ~8,500               | ~65,000             | **~0.13** ✅  | Very low leverage |
| MRVL   | ~11,000               | ~10,900             | **~1.01**    | M&A-driven debt  |
| AMD    | ~2,700                | ~66,200             | **~0.04** ✅  | Very low         |
| MU     | ~12,800               | ~56,700             | **~0.23**    | Low-moderate     |
| ASML   | ~3,100                | ~18,000             | **~0.17**    | Low              |
| TSM    | ~25,000               | ~130,000            | **~0.19**    | Low              |
| AVGO   | ~67,000               | ~21,000             | **~3.19** ⚠️  | High (VMware acquisition) |
| INTC   | ~50,000               | ~85,000             | **~0.59**    | Moderate-high    |

> **Note:** Broadcom's high D/E reflects the $69B VMware acquisition (2023) debt load. Management has been executing deleveraging through FCF generation.

### 4.3 Inventory Turnover

$$Inventory\ Turnover = \frac{COGS}{Average\ Inventory}$$

| Ticker | COGS (USD M)   | Inventory (USD M) | **Inv. Turnover** | Implications            |
|--------|---------------|-------------------|-----------------|------------------------|
| INTC   | 34,478 (EDGAR) | 11,618            | **2.97×**       | IDM capex cycle        |
| **NVDA** | **62,475** (EDGAR) | 21,403      | **2.92×** ⚠️    | Strategic positioning  |
| MU     | 5,997 (Q1F26)  | 8,205 (Q)         | **0.73× (Q)**   | Memory cycle recovery  |
| AVGO   | 6,154 (Q1F26)  | 2,962             | **2.08× (Q)**   | Asset-light model      |
| MRVL   | 4,014 (EDGAR)  | 1,388             | **2.89×**       | Custom silicon model   |
| AMD    | ~14,000 est.   | ~2,000 est.       | **~7.0×** ✅    | Efficient fabless      |
| TSM    | ~41,400 est.   | ~6,500 est.       | **~6.4×** ✅    | Foundry pull model     |
| ASML   | ~17,600 est.   | ~8,700 est.       | **~2.0×**       | Long-cycle equipment   |

---

## 5. Competitive Positioning Matrix

### 5.1 Four-Quadrant Framework

```
HIGH GROWTH / HIGH MARGIN (Top Right — Preferred Zone)
      │
  +75%│         [NVDA ●] 
      │          
  +60%│                          LEGENDARY ZONE
      │                          (AI Platform Monopoly)
  +45%│                   [TSM ●]      [ASML ●]
      │              [MU ●]
  +30%│        [AVGO ●]          [MRVL ●]
      │
  +15%│    [AMD ●]
      │
   +0%│              [INTC ●]
      │
  -15%│
      └────────────────────────────────────────────────
       0%    20%    40%    60%    80%   100%
              Annual Revenue Growth (YoY)
```

*(Y-axis: Gross Margin %; X-axis: Revenue Growth)*

### 5.2 Strategic SWOT Comparison (NVDA vs Primary Challengers)

| Dimension        | NVIDIA (NVDA)                     | AMD                              | Intel (INTC)                     |
|-----------------|----------------------------------|----------------------------------|----------------------------------|
| **Strengths**    | CUDA ecosystem lock-in, Blackwell scale, software stack | EPYC CPU + GPU, competitive pricing | IDM model, x86 installed base, Intel 18A process |
| **Weaknesses**   | TSMC single-source, export restrictions | Limited software ecosystem vs CUDA | Execution challenges, negative FCF, AMD/NVDA market share losses |
| **Opportunities**| Agentic AI growth, sovereign AI, NVIDIA NIM APIs | MI300X gaining traction in HPC/cloud | Foundry Services (IFS) customer wins, Arc GPU gain |
| **Threats**      | Custom ASIC substitution (AVGO/MRVL), ROCm improvement | NVDA's CUDA moat, TSMC access | TSMC/Samsung competition in foundry, Intel 18A yield uncertainty |

---

## 6. Relationship Network: Supply Chain Dependencies

```
ASML ──────────────────► TSMC ─────────────────► NVDA (primary customer)
  │                        │                       │
  │                        ├──────────────────►  AMD  
  │                        └──────────────────►  AVGO
  │                                               │
Nikon/Canon ───────────► Samsung ────────────►  MRVL
                               │
                           (memory HBM)
                               │
SK Hynix ──────────────────────┤
Micron (MU) ───────────────────┴──────────────► NVDA (HBM3e)
                                                 AMD  (HBM3)
```

### 6.1 Supply Chain Concentration Scores (1=Low Risk, 5=High Risk)

| Company | Single-Supplier Exposure | Export Control Risk | Geographic Risk | **Overall Supply Risk** |
|---------|------------------------|--------------------|-----------------|-----------------------|
| NVDA    | 5 (TSMC-only)          | 5 (China BIS rules) | 4 (Taiwan)     | **5.0 🔴 Critical**  |
| AMD     | 5 (TSMC primary)       | 3 (less restricted) | 4 (Taiwan)    | **4.0 🟠 High**      |
| INTC    | 2 (self-fab)           | 2                  | 2 (US+Ireland) | **2.0 🟢 Low**       |
| MU      | 2 (own DRAM fabs)      | 3 (China exposure) | 3 (multi-geo)  | **2.7 🟡 Moderate**  |
| AVGO    | 4 (TSMC dependent)     | 2                  | 3              | **3.0 🟡 Moderate**  |
| MRVL    | 4 (TSMC/GlobalFoundries)| 2                 | 3              | **3.0 🟡 Moderate**  |
| TSM     | 1 (IS the foundry)     | 4 (US restrictions)| 5 (Taiwan!!)   | **3.3 🟠 High**      |
| ASML    | 1 (equipment OEM)      | 4 (Netherlands/China) | 2 (Netherlands) | **2.3 🟢 Low-Mod** |

---

## 7. AI Architecture Race: Technical Differentiation

| Feature                    | NVDA Blackwell B200 | AMD MI300X        | INTC Gaudi 3       |
|---------------------------|--------------------|--------------------|-------------------|
| **Process Node**           | TSMC 4NP           | TSMC 5nm           | Intel 5 + TSMC 7nm |
| **Peak FP16 TFLOPS**       | 4,860              | 1,307              | 1,836             |
| **HBM Bandwidth**          | 8 TB/s (HBM3e)     | 5.3 TB/s (HBM3)   | 3.7 TB/s (HBM2e)  |
| **GPU Memory**             | 192 GB             | 192 GB             | 128 GB            |
| **NVLink / Interconnect**  | NVLink 4 (900 GB/s)| xGMI (800 GB/s)   | OAM (proprietary)  |
| **Software Ecosystem**     | CUDA (18M devs)    | ROCm (improving)   | oneAPI (limited)   |
| **Market Adoption**        | ~90% AI market     | ~8%                | ~2%               |

---

## 8. Summary Analytics Dashboard

$$Revenue\ CAGR_{5Y} = \left(\frac{EV}{BV}\right)^{1/n} - 1$$

| Company | 5-Year Rev CAGR | Operating Margin | D/E  | Inv. Turnover | Ecosystem Role Score |
|---------|----------------|-----------------|------|---------------|---------------------|
| **NVDA** | **68.2%** 🏆   | **60.4%** 🏆    | 0.13 | 2.9×          | ★★★★★ Hub            |
| TSM     | ~21%           | ~27%            | 0.19 | 6.4×          | ★★★★★ Foundry        |
| ASML    | ~14%           | ~26%            | 0.17 | 2.0×          | ★★★★★ Equipment      |
| MU      | ~18%           | ~45% (Q)        | 0.23 | 2.9×          | ★★★★☆ Memory         |
| AVGO    | ~35%           | ~45%            | 3.19 | 2.1×          | ★★★★☆ ASIC/Network   |
| MRVL    | ~22%           | 16.1%           | 1.01 | 2.9×          | ★★★☆☆ Custom Silicon |
| AMD     | ~19%           | ~5%             | 0.04 | 7.0×          | ★★★☆☆ GPU Challenger |
| INTC    | -6%            | 4.2%            | 0.59 | 3.0×          | ★★☆☆☆ Restructuring  |

---

*All EDGAR-extracted figures are sourced directly from XBRL-tagged filings. Estimates marked with "est." are derived from publicly reported management guidance and consensus analyst data. This document is for educational/analytical purposes only.*

*Generated by: GitHub Copilot + SEC EDGAR MCP Server | GPU Ecosystem Portfolio Project*
