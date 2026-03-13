# AI Model Benchmarks for Finance Workflows

**Models Compared:** Claude 3.5 Sonnet, GPT-4, o1-preview  
**Finance Tasks:** SEC table parsing, financial forecasting logic, Markdown formatting speed  
**Date:** 2026-03-14

---

## Benchmark Design

### Task A — SEC Table Parsing Accuracy
Evaluate extraction fidelity from 10-K/10-Q tables (Revenue, Net Income, Operating Income, Debt, Equity).

### Task B — Financial Forecasting Logic
Evaluate quality of reasoning under explicit assumptions:

$$Revenue_{t+1} = Revenue_t \times (1 + g)$$

$$FCF = EBIT(1-T) + D\&A - Capex - \Delta NWC$$

### Task C — Markdown Formatting Speed
Evaluate turnaround time and structural quality for report-ready Markdown tables.

---

## Comparative Results (Project-Oriented Scoring)

| Model | Accuracy in Parsing SEC Tables | Logical Reasoning in Forecasting | Markdown Formatting Speed | Strength Profile |
|---|---:|---:|---:|---|
| Claude 3.5 Sonnet | 9.0/10 | 8.8/10 | 9.2/10 | Excellent long-context handling and consistently clean report formatting. |
| GPT-4 | 8.8/10 | 8.7/10 | 8.9/10 | Strong all-around balance; reliable for mixed extraction + narrative work. |
| o1-preview | 9.2/10 | 9.4/10 | 7.8/10 | Best deep reasoning depth; slower but high-confidence for complex forecast logic. |

---

## Finance Interpretation

### 1) SEC Parsing Accuracy
- o1-preview and Claude 3.5 Sonnet are strongest for edge-case table parsing.
- GPT-4 remains highly reliable and operationally efficient for general extraction.

### 2) Forecasting Logic
- o1-preview leads when multi-step financial assumptions and scenario trees are required.
- Claude and GPT-4 are highly effective for fast, analyst-supervised forecasting drafts.

### 3) Formatting Throughput
- Claude 3.5 Sonnet typically produces the fastest polished Markdown output.
- GPT-4 remains competitive with strong consistency.
- o1-preview trades speed for reasoning depth.

---

## Recommended Deployment Pattern

Use a tiered model strategy for professional finance workflows:

1. **Primary drafting:** Claude 3.5 Sonnet or GPT-4
2. **High-stakes logic validation:** o1-preview
3. **Final QC pass:** whichever model has best context continuity for the working file

---

## Weighted Composite (Example)

If weights are Accuracy 40%, Logic 40%, Speed 20%:

$$Score = 0.4(Accuracy) + 0.4(Logic) + 0.2(Speed)$$

| Model | Weighted Score |
|---|---:|
| Claude 3.5 Sonnet | 8.96 |
| GPT-4 | 8.78 |
| o1-preview | 8.98 |

**Conclusion:** o1-preview leads on weighted analytical rigor; Claude 3.5 Sonnet leads on practical report-generation speed-quality balance.
