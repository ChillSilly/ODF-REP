# R3 — Orderflow Heterogeneity

**Tags:** `#microstructure` `#VPIN` `#informed-flow`
**Links:** [[Concepts/Adverse Selection]] · [[Lectures/Phase-4-Order-Flow/L16 - Market Microstructure]]

---

When buy and sell aggression are clearly unequal (high imbalance/VPIN), informed flow is dominant. Price will follow the direction of aggression.

**VPIN Formula:**
```
VPIN = |V_buy − V_sell| / (V_buy + V_sell)
```
- High VPIN (> 0.5): Informed traders dominating → dealers widen spreads → adverse selection risk
- Low VPIN (< 0.2): Noise trading dominant → tight spreads → normal conditions

**The edge:** When VPIN spikes *before* a visible price move, informed participants are acting on an edge you don't yet see. VPIN tends to spike before major volatility events.
