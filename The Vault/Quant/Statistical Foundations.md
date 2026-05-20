# Statistical Foundations

**Tags:** `#quant` `#statistics` `#math`
**Links:** [[Quant/Black-Scholes and Greeks Math]] · [[Risk-Management/Bayesian Kelly Framework]]

---

## Core Statistics

```
Mean:     μ = (1/n) Σ xᵢ
Variance: σ² = (1/n) Σ (xᵢ − μ)²
Std Dev:  σ = √σ²
```

**Law of Large Numbers:** As n → ∞, sample mean converges to true mean. Justifies using historical WR as estimate.

**Central Limit Theorem:** Sum of many i.i.d. random variables → normal distribution. Justifies many risk models.

## Finance-Specific

```
Sharpe Ratio = E[R − rf] / σR
Sortino Ratio = E[R − rf] / σ_downside   (preferred — penalises downside only)
Kelly Criterion: f* = (p(b+1) − 1) / b
```

**VaR:** Value at Risk — the maximum loss at a given confidence level over a given period. CME uses 99% 1-day VaR for margin calculations.

## Options Math Reference

```
Delta: Δ = ∂V/∂S
Gamma: Γ = ∂²V/∂S²
Vega: ν = ∂V/∂σ
Theta: Θ = ∂V/∂t

GEX = Σ [Γᵢ × OIᵢ × 100 × S² × 0.01]
Imbalance Ratio = |Bid Vol − Ask Vol| / (Bid Vol + Ask Vol)
VPIN = |V_buy − V_sell| / (V_buy + V_sell)
COT Index = (Net − Min) / (Max − Min) × 100
```
