# Risk Management Overview

**Tags:** `#risk-management` `#overview`
**MOC:** [[00-MOC/MOC - Risk Management]]
**Links:** [[Risk-Management/Position Sizing]] · [[Risk-Management/Bayesian Kelly Framework]] · [[Risk-Management/Convexity and EV]] · [[Risk-Management/Drawdown Management]]

---

## The Four Pillars

1. **Position sizing** — How much to risk per trade based on edge and uncertainty → [[Risk-Management/Position Sizing]]
2. **Stop placement** — Where to exit if wrong (binary invalidation levels) → [[Lectures/Phase-5-Top-Bottom-Ticking/L26 - Risk Management for Reversals]]
3. **Drawdown management** — How to scale down in losing streaks → [[Risk-Management/Drawdown Management]]
4. **EV and convexity** — Structural understanding of the payoff → [[Risk-Management/Convexity and EV]]

---

## Core Metrics to Track in Your Journal

- Win rate (per setup type)
- Average R:R per setup type
- Maximum drawdown (daily, weekly, monthly)
- Sharpe Ratio (and Sortino Ratio — penalises downside only)
- Edge attribution by setup grade

---

## Sharpe and Sortino

```
Sharpe Ratio = E[R − rf] / σR
Benchmarks: SR < 0 = losing | SR = 1.0 = good | SR = 2.0 = excellent | SR > 3.0 = world-class
```

```
Sortino Ratio = E[R − rf] / σ_downside
```

In prop firm context, prefer Sortino — it correctly captures that upside volatility is not risk.

---

## Kelly Criterion Reference

```
f* = (p × (b+1) − 1) / b
```

Where: p = win probability, b = win/loss ratio (R:R).

In practice: use half-Kelly or Bayesian-Adaptive Kelly to account for estimation error and fat tails. See [[Risk-Management/Bayesian Kelly Framework]].
