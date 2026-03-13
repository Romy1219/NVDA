# LLM Benchmarking Framework: Financial Analysis Capabilities

> **Purpose:** Standardized evaluation template for comparing AI models on SEC EDGAR 10-K extraction, financial calculation accuracy, and professional Markdown output quality.  
> **Models Evaluated:** Claude Sonnet 4.5, GPT-4o, o1-preview  
> **Domain:** Financial analysis — 10-K data extraction, ratio calculation, narrative synthesis  
> **Date:** 2026-03-13

---

## 1. Evaluation Philosophy

AI models used in financial workflows must be evaluated on three axes that matter for CFA/FP&A-grade work:

```
         ACCURACY                    LOGIC                   FORMATTING
              ▲                        ▲                          ▲
              │                        │                          │
    Correctly extracts          Correctly applies           Produces clean,
    numbers from 10-K           financial formulas          professional
    XBRL/text vs ground         (CAGR, DCF, VaR,           Markdown tables
    truth (1–10 scale)          ratios) step-by-step       and LaTeX (1–10)
              │                        │                          │
              └────────────────────────┴──────────────────────────┘
                         COMPOSITE SCORE (weighted avg.)
```

---

## 2. Benchmark Task Suite

### 2.1 Task Category A — 10-K Data Extraction Accuracy

**Test Format:** Model is given the full text of NVIDIA FY2026 10-K Item 8 (Financial Statements). It must extract specific XBRL-tagged values and match them to the EDGAR ground truth.

**Ground Truth Values (from SEC EDGAR XBRL, Accession #0001045810-26-000021):**

| Data Point                          | Ground Truth (USD M)  |
|-------------------------------------|-----------------------|
| FY2026 Revenue                      | 215,938               |
| FY2026 Cost of Revenue              | 62,475                |
| FY2026 Gross Profit                 | 153,463               |
| FY2026 Operating Expenses           | 23,076                |
| FY2026 Operating Income             | 130,387               |
| FY2026 Non-operating Income         | 11,063                |
| FY2026 Interest Expense             | 259                   |
| FY2026 Pre-tax Income               | 141,450               |
| FY2026 Total Assets                 | 206,803               |
| FY2026 Cash & Equivalents           | 10,605                |
| FY2026 Accounts Receivable          | 38,466                |
| FY2026 Inventory (Net)              | 21,403                |
| FY2026 Goodwill                     | 20,832                |
| US Revenue (Geographic)             | 149,617               |
| China Revenue (Geographic)          | 19,677                |

**Scoring Rubric — Accuracy (0–10 per item, 15 items):**

| Score | Criterion                                                             |
|-------|-----------------------------------------------------------------------|
| 10    | Exact match to XBRL ground truth value, correct units (USD M)         |
| 8–9   | Correct value with minor unit confusion (e.g., billions vs millions)  |
| 5–7   | Ballpark correct (within ±5%) but not exact                          |
| 2–4   | Materially wrong (>5% error) but directionally correct                |
| 0–1   | Hallucinated value or refused to answer                               |

**Extraction Accuracy Results:**

| Model               | Items Correct (15) | Avg Score (0–10) | Hallucination Count | **Category A Score** |
|--------------------|-------------------|-----------------|--------------------|--------------------|
| *Claude Sonnet 4.5* | _   / 15          | _               | _                  | **_ / 10**         |
| *GPT-4o*            | _   / 15          | _               | _                  | **_ / 10**         |
| *o1-preview*        | _   / 15          | _               | _                  | **_ / 10**         |

> **Instructions for evaluator:** Run identical prompt against each model with the full NVDA 10-K Item 8 text. Record exact extracted values vs. EDGAR XBRL ground truth above. Score and fill in table.

---

### 2.2 Task Category B — Financial Formula Accuracy (CAGR, DCF, Ratios)

**Test Format:** Models are given raw financial data (not formulas) and asked to compute standard financial metrics step-by-step, showing their work.

#### B1 — CAGR Calculation Test

**Prompt:** *"Using the following NVIDIA annual revenue figures: FY2022=$26,914M and FY2026=$215,938M (both in USD millions), calculate the 4-year CAGR. Show all steps and the formula."*

**Expected Formula:**

$$CAGR = \left(\frac{EV}{BV}\right)^{\frac{1}{n}} - 1 = \left(\frac{215{,}938}{26{,}914}\right)^{\frac{1}{4}} - 1$$

$$= (8.024)^{0.25} - 1 = 1.6820 - 1 = \boxed{68.20\%}$$

**Scoring Rubric — CAGR (0–10):**

| Score | Criterion                                                                 |
|-------|---------------------------------------------------------------------------|
| 10    | Correct answer (68.2%), correct formula, all intermediate steps shown     |
| 8     | Correct answer, formula present but one step missing                       |
| 6     | Formula correct, arithmetic error (within ±2pp of 68.2%)                  |
| 4     | Used wrong n (e.g., n=5 instead of n=4); result ~60.4%                    |
| 2     | Attempted but fundamental formula error                                    |
| 0     | Refused or hallucinated completely different formula                       |

#### B2 — Gross Margin Calculation Test

**Prompt:** *"NVIDIA FY2026: Revenue=$215,938M, COGS=$62,475M. Calculate Gross Profit and Gross Margin %."*

**Expected Answer:**
$$Gross\ Profit = 215{,}938 - 62{,}475 = \$153{,}463M$$
$$Gross\ Margin = \frac{153{,}463}{215{,}938} = 71.07\% \approx 71.1\%$$

#### B3 — Debt-to-Equity Ratio Test

**Prompt:** *"Given Total Debt = $8,500M and Stockholders' Equity = $65,000M for NVIDIA FY2026, calculate the D/E ratio and interpret it in the context of semiconductor peers."*

**Expected Answer:**
$$D/E = \frac{8{,}500}{65{,}000} = 0.131$$

Expected interpretation: Low leverage, conservative capital structure, significant balance sheet optionality.

#### B4 — Inventory Turnover Test

**Prompt:** *"NVIDIA FY2026: COGS=$62,475M, Inventory=$21,403M. Calculate Inventory Turnover and Days Sales Inventory (DSI)."*

**Expected Answer:**
$$Inventory\ Turnover = \frac{COGS}{Inventory} = \frac{62{,}475}{21{,}403} = 2.92\times$$
$$DSI = \frac{365}{Inventory\ Turnover} = \frac{365}{2.92} = 125\ days$$

#### B5 — DCF Terminal Value Test

**Prompt:** *"Calculate NVIDIA's terminal value assuming: FCF=$100B, WACC=10%, long-term growth rate=5%."*

**Expected Answer:**
$$TV = \frac{FCF \times (1 + g)}{WACC - g} = \frac{100{,}000 \times 1.05}{0.10 - 0.05} = \frac{105{,}000}{0.05} = \$2{,}100{,}000M = \$2.1T$$

**Formula Accuracy Results (B1–B5):**

| Model               | B1 CAGR | B2 GM  | B3 D/E | B4 InvT | B5 DCF | **Avg (0–10)** |
|--------------------|---------|--------|--------|---------|--------|---------------|
| *Claude Sonnet 4.5* | _       | _      | _      | _       | _      | **_**         |
| *GPT-4o*            | _       | _      | _      | _       | _      | **_**         |
| *o1-preview*        | _       | _      | _      | _       | _      | **_**         |

---

### 2.3 Task Category C — Markdown Formatting Quality

**Test Format:** Models are asked to generate a professional peer comparison table for NVDA vs AMD vs INTC using provided financial data.

**Sample Prompt:**
> *"Generate a professional Markdown comparison table for NVIDIA, AMD, and Intel with the following metrics: Revenue (TTM), Gross Margin, Operating Margin, and D/E Ratio. Use the data provided. Include LaTeX formulas for each metric definition below the table."*

**Scoring Rubric — Formatting (0–10):**

| Dimension                    | Weight | Criteria                                                       |
|-----------------------------|--------|----------------------------------------------------------------|
| Table Structure              | 25%    | Column alignment, headers, dividers — renders correctly in VSCode |
| Data Accuracy in Table       | 25%    | Numbers match provided source data                             |
| LaTeX Formula Quality        | 20%    | Correct syntax, renders in Markdown preview, uses $...$ properly|
| Professional Tone            | 15%    | Clear, concise headers, consistent capitalization              |
| Completeness                 | 15%    | All requested metrics present, no hallucinated columns         |

**Reference "Perfect" Output (Benchmark Target):**

| Metric          | NVDA (FY2026) | AMD (FY2025) | INTC (FY2025) |
|-----------------|--------------|-------------|---------------|
| Revenue (USD B) | $215.9B      | $25.8B      | $52.9B        |
| Gross Margin    | 71.1%        | 45.0%       | 34.8%         |
| Op. Margin      | 60.4%        | 4.8%        | 4.2%          |
| D/E Ratio       | 0.13         | 0.04        | 0.59          |

$$Gross\ Margin = \frac{Revenue - COGS}{Revenue} \times 100\%$$

$$Operating\ Margin = \frac{Operating\ Income}{Revenue} \times 100\%$$

$$D/E = \frac{Total\ Debt}{Stockholders'\ Equity}$$

**Formatting Quality Results:**

| Model               | Table Struct | Data Acc. | LaTeX | Tone | Complete | **Avg (0–10)** |
|--------------------|-------------|----------|-------|------|---------|---------------|
| *Claude Sonnet 4.5* | _           | _        | _     | _    | _       | **_**         |
| *GPT-4o*            | _           | _        | _     | _    | _       | **_**         |
| *o1-preview*        | _           | _        | _     | _    | _       | **_**         |

---

## 3. Composite Scoring Framework

### 3.1 Weighted Composite Score

$$Score_{composite} = w_A \times Score_A + w_B \times Score_B + w_C \times Score_C$$

**Weights (analyst-optimal):**

| Category             | Weight | Rationale                                                    |
|---------------------|--------|--------------------------------------------------------------|
| A — Extraction       | 40%    | Accuracy on SEC data is foundational for financial workflows  |
| B — Calculation      | 35%    | Formula logic determines if model can be trusted for analysis |
| C — Formatting       | 25%    | Output quality determines usefulness in professional reports  |

**Composite Results:**

| Model                  | Score A (×0.40) | Score B (×0.35) | Score C (×0.25) | **Composite** | Tier       |
|-----------------------|----------------|----------------|----------------|--------------|-----------|
| *Claude Sonnet 4.5*    | _              | _              | _              | **_**        | ?         |
| *GPT-4o*               | _              | _              | _              | **_**        | ?         |
| *o1-preview*           | _              | _              | _              | **_**        | ?         |

**Tier Definitions:**

| Tier  | Score Range | Recommendation                              |
|-------|------------|----------------------------------------------|
| 🏆 S  | 9.0–10.0   | Production-grade; trusted for autonomous analysis |
| ✅ A  | 7.5–8.9    | Highly capable; human review for final output |
| 🟡 B  | 6.0–7.4    | Competent draft quality; requires validation  |
| 🟠 C  | 4.5–5.9    | Limited use; supplement with traditional tools |
| 🔴 D  | < 4.5      | Not recommended for financial workflows       |

---

## 4. Qualitative Assessment Guide

### 4.1 Model Characteristic Summary (Pre-fill Reference)

| Characteristic              | Claude Sonnet 4.5         | GPT-4o                     | o1-preview                  |
|-----------------------------|--------------------------|---------------------------|----------------------------|
| **Reasoning Style**          | Step-by-step chain-of-thought | Balanced speed+logic     | Deep reasoning, slower      |
| **Formula Handling**         | Strong LaTeX output       | Good formula rendering     | Excellent structured math   |
| **Context Window**           | 200K tokens               | 128K tokens                | 128K tokens                 |
| **Hallucination Tendency**   | Low on factual extraction | Low-moderate               | Very low (reasoning models) |
| **Speed**                    | Fast                      | Very fast                  | Slow (deliberate)           |
| **Best For**                 | Long doc analysis, formatting | Rapid drafts, multi-modal | Complex calculations, logic |
| **MCP Integration**          | Native (Anthropic)        | Via OpenAI Realtime + MCP  | Via API                    |

### 4.2 Evaluator Notes Template

```markdown
## Evaluation Run Log

**Date:** _______________  
**Evaluator:** _______________  
**Test Version:** 1.0

### Claude Sonnet 4.5 Notes:
- Extraction observations: _______________
- Formula accuracy observations: _______________
- Formatting quality observations: _______________
- Unexpected behaviors: _______________

### GPT-4o Notes:
- Extraction observations: _______________
- Formula accuracy observations: _______________
- Formatting quality observations: _______________
- Unexpected behaviors: _______________

### o1-preview Notes:
- Extraction observations: _______________
- Formula accuracy observations: _______________
- Formatting quality observations: _______________
- Unexpected behaviors: _______________

### Final Recommendation:
Best model for 10-K extraction: _______________
Best model for ratio calculation: _______________
Best model for report generation: _______________
Recommended default for this workflow: _______________
```

---

## 5. AI-Enhanced Productivity Metric (APM) Baseline

Before filling in evaluation scores, establish the human analyst baseline:

$$APM = \frac{Task\ Completion\ Speed_{AI}}{Task\ Completion\ Speed_{Human}} \times Accuracy\ Score$$

| Task                          | Human Baseline (min) | AI Estimated (min) | APM Target |
|-------------------------------|---------------------|-------------------|-----------|
| Extract 15 EDGAR data points  | 90 min              | 0.5 min           | 180× speed |
| Calculate 5 financial ratios  | 30 min              | 0.1 min           | 300× speed |
| Produce peer comparison table | 60 min              | 2 min             | 30× speed  |
| Full 10-K analysis summary    | 8 hours             | 15 min            | 32× speed  |

> **Aggregate AI APM Target: ~100× productivity vs. manual methods**  
> *(Accuracy-adjusted: pure speed × 0.95 accuracy factor)*

---

## 6. Benchmark Versioning

| Version | Date       | Changes                                    |
|---------|-----------|---------------------------------------------|
| 1.0     | 2026-03-13 | Initial release — NVDA FY2026 ground truth  |
| 1.1     | TBD        | Add AMD/INTC extraction tasks               |
| 2.0     | TBD        | Expand to earnings call transcript analysis |

---

*This template should be re-run quarterly following each NVIDIA 10-K/10-Q filing to ensure benchmark freshness. Update ground truth values from SEC EDGAR XBRL as new filings are released.*

*Generated by: GitHub Copilot + SEC EDGAR MCP Server | GPU Ecosystem Portfolio Project*
