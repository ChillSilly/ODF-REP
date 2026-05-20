# Greeks Introduction

**Tags:** `#greeks` `#options`
**Links:** [[Greeks/Delta]] · [[Greeks/Gamma]] · [[Greeks/Theta]] · [[Greeks/Vega]] · [[Options-Flow/Dealer Hedging Mechanics]] · [[Lectures/Phase-3-Options-Flow/L10 - Options Primer]]

---

The Greeks measure different dimensions of option risk and serve as the **dealer's hedging obligation map**.

| Greek | Formula | Measures | Dealer Impact |
|---|---|---|---|
| **Delta (Δ)** | ∂V/∂S | Directional exposure per $1 move | Quantity of futures to hold |
| **Gamma (Γ)** | ∂²V/∂S² | Rate of delta change | Speed of hedge rebalancing |
| **Vega (ν)** | ∂V/∂σ | Sensitivity to IV | Vol risk exposure |
| **Theta (Θ)** | ∂V/∂t | Time decay per day | Time pressure on hedges |

**Second-order Greeks with market impact:**
- **Vanna** (∂Δ/∂σ): Delta changes when IV changes → additional hedging when vol moves
- **Charm** (∂Δ/∂t): Delta decays over time → end-of-day systematic rebalancing flows

See: [[Lectures/Phase-3-Options-Flow/L10 - Options Primer]] · [[Options-Flow/Dealer Hedging Mechanics]]
