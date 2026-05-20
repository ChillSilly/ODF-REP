# Bayesian-Adaptive Kelly Framework

> *"Traditional Kelly assumes you know your win rate and R:R. You don't. Bayesian updating solves this."*
> Source: Bayesian_Adaptive_Kelly_Framework.md

**Tags:** `#risk-management` `#position-sizing` `#kelly` `#bayesian`
**MOC:** [[00-MOC/MOC - Risk Management]]
**Links:** [[Risk-Management/Position Sizing]] · [[Risk-Management/Convexity and EV]] · [[Lectures/Phase-5-Top-Bottom-Ticking/L26 - Risk Management for Reversals]]

---

## The Core Problem

Traditional Kelly assumes fixed, known win rate and R:R. In live trading you have:
- **Estimates** based on limited sample data
- **Uncertainty** about whether estimates will hold
- **Changing market conditions** that shift edge constantly

The solution: **Bayesian updating + Adaptive Kelly**
1. Use Bayes to update beliefs about WR and R:R as new trades occur
2. Feed updated beliefs into Adaptive Kelly to adjust position size
3. Shrink size when uncertainty is high, scale up when confidence increases

---

## Part 1 — Bayesian Win Rate Updating

### The Prior Distribution: Beta(α, β)

Express belief about win rate as a Beta distribution:

```
Prior: π(WR) = Beta(α, β)
Mean WR = α / (α + β)
```

**Example:** Backtest shows 45% WR over 100 trades → `Beta(45, 55)`

### Posterior After New Trades

After observing **w wins** and **l losses**:
```
Posterior = Beta(α + w, β + l)
New mean WR = (α + w) / (α + β + w + l)
```

**The math automatically blends your prior belief with new evidence.**

### Real-Time Updating Example

Initial: Beta(45, 55) → WR = 0.45
After 10 trades (6W, 4L): Beta(51, 59) → WR = 0.464
After 50 trades (20W, 30L): Beta(65, 85) → WR = 0.433

As you trade, your WR estimate **converges toward reality** but never completely forgets the prior (prevents overreaction to small samples).

---

## Part 2 — Measuring Uncertainty

### Variance of Beta Distribution

```
Var(WR) = (α × β) / [(α + β)² × (α + β + 1)]
Std Dev = √Var(WR)
Uncertainty = Std Dev / Mean WR   (coefficient of variation)
```

**High uncertainty → high variance → trade smaller**
**Low uncertainty → low variance → can scale up**

### Sample Sizes and Confidence

| Trades | Approximate Uncertainty |
|---|---|
| 20 | ~9.8% — very uncertain |
| 100 | ~7.8% — building confidence |
| 300 | ~6.0% — fairly confident |

When uncertainty > 20%: trade very small. When < 5%: full Kelly permitted.

---

## Part 3 — The Adaptive Kelly Formula

```
f = k × [WR − (1 − WR)/RR] × (1 − c × Uncertainty)
```

Where:
- **WR** = posterior mean from Beta distribution
- **RR** = reward:risk ratio (rolling average or Gamma update)
- **Uncertainty** = Std Dev / Mean WR
- **k** = scaling factor (0.3–0.5 typical — never full Kelly)
- **c** = adaptivity coefficient (0.5–1.0 typical)

### Worked Example

Given: 100 live trades, 45 wins, 55 losses. Prior Beta(45,55). Average R:R = 1.6. k = 0.5, c = 0.8.

```
Posterior: Beta(90, 110)
Mean WR = 90/200 = 0.45
Std Dev = 0.035, Uncertainty = 0.035/0.45 = 7.8%

Core Kelly = 0.45 − (0.55/1.6) = 0.106
Penalty = 1 − (0.8 × 0.078) = 0.938
f = 0.5 × 0.106 × 0.938 = 4.97%
```

On $10,000 account: risk **$497 per trade**.

---

## Part 4 — Applied to Top/Bottom Tick Setups

Apply the grade multiplier from your setup scoring system:

```
Adjusted risk = Base kelly × Grade multiplier

A-grade setup (13–15/15 signals): × 1.0 (full kelly)
B-grade (10–12/15):               × 0.6
C-grade (below 10):               × 0.0 (no trade)
```

**Additionally, apply uncertainty discount based on sample size:**
- < 50 trades logged: × 0.7
- 50–150 trades: × 0.85
- > 150 trades: × 1.0 (full kelly)

---

## Part 5 — Regime Change Detection

When 50-trade rolling WR drops > 10% from long-term average:
- Core Kelly shrinks automatically (Bayes detected it)
- Position sizes reduce without emotional decision-making
- System flagged for review: has market structure changed?

**Manual override options:**
- Reset prior to Beta(1, 1) (uninformative — start over)
- Stop trading entirely until edge is re-validated
- Switch to a different strategy with its own separate tracker

---

## Part 6 — Multi-Strategy Application

Each strategy gets its own independent Bayesian tracker. Never pool different setup types into one tracker — they have different WR, R:R, and uncertainty profiles.

| Strategy | Beta(α, β) | WR | Uncertainty | Size |
|---|---|---|---|---|
| Top/bottom tick | Beta(95, 55) | 63% | 4% | 8.1% |
| OPEX breakout | Beta(51, 59) | 46% | 7% | 4.9% |
| COT fade | Beta(65, 95) | 41% | 8% | 2.9% |

---

## Bottom Line

- **Traditional Kelly:** "Bet X% forever"
- **Bayesian-Adaptive Kelly:** "Bet smaller when uncertain, larger when confident, less when edge weakens"

That's the difference between blowing up and compounding.

---

## Connections

| Concept | Link |
|---|---|
| Position sizing execution | [[Risk-Management/Position Sizing]] |
| Prop firm context | [[Risk-Management/Convexity and EV]] |
| Setup grading | [[Lectures/Phase-5-Top-Bottom-Ticking/L22 - Top Bottom Tick Framework]] |
| Trade logging | [[Practice/Pre-Session Checklist]] |
