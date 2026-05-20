# Position Sizing

**Tags:** `#risk-management` `#position-sizing` `#execution`
**MOC:** [[00-MOC/MOC - Risk Management]]
**Links:** [[Risk-Management/Bayesian Kelly Framework]] · [[Risk-Management/Convexity and EV]] · [[Lectures/Phase-5-Top-Bottom-Ticking/L26 - Risk Management for Reversals]]

---

## The Core Formula

```
Dollar Risk = Tick Value × Ticks at Risk × Contracts
Max Contracts = Floor(Account Risk $ / Dollar Risk per contract)
```

**Example (ES):**
- Account: $50,000 | Risk: 1% = $500
- Stop distance: 8 points = 32 ticks
- Dollar risk per contract: 32 × $12.50 = $400
- Max contracts = Floor($500 / $400) = 1 contract

---

## Tick Value Reference

| Instrument | Tick Size | Tick Value | 10-pt move |
|---|---|---|---|
| ES | 0.25 pts | $12.50 | $500 |
| NQ | 0.25 pts | $5.00 | $200 |
| MES | 0.25 pts | $1.25 | $50 |
| MNQ | 0.25 pts | $0.50 | $20 |
| CL | $0.01 | $10.00 | $1,000 |
| ZN | 1/64 pt | $15.625 | ~$500 |

---

## The Binary Stop Rule

For reversal trades, stops must be placed at the **structural invalidation level** — not at an arbitrary distance.

**Top tick stop:** Above the highest wick of the exhaustion zone + 3–5 ticks
**Bottom tick stop:** Below the lowest wick of the absorption zone + 3–5 ticks

Wide binary stops require smaller size. Never widen stops to fit position — reduce contracts.

---

## Grade-Based Sizing

From [[Risk-Management/Bayesian Kelly Framework]]:

| Setup Grade | Size Multiplier | Max Risk |
|---|---|---|
| A-grade (13–15/15) | 1.0 | Full kelly (≤2% account) |
| B-grade (10–12/15) | 0.6 | 60% of kelly |
| C-grade (below 10) | 0.0 | No trade |

---

## Sizing Methods

### 1. Fixed Risk / Fixed Fractional
Risk a set % of equity per trade. The practical application of Kelly. Default starting method.

### 2. Percent Volatility
Adjust size based on ATR (Average True Range) to normalise volatility exposure across instruments and sessions.

```
Contracts = Floor((Account × Risk %) / (ATR × Tick Value per point))
```

### 3. Kelly Formula (Advanced)
Theoretical ideal, adjusted for tail risks and uncertainty. See [[Risk-Management/Bayesian Kelly Framework]].

---

## The Exit Ladder

For reversal trades, always use staged exits:

1. **T1** (50% of position): First structural target — bank profit, move stop to entry
2. **T2** (25% of position): Second target — macro repricing level
3. **T3** (remaining 25%): Trail at 1.5× ATR until stopped naturally

This structure ensures you never give back a winning trade on T1, while keeping exposure for the full narrative repricing.

---

## Breakeven Stops — Why They Destroy High R:R Systems

From the Convexity/EV material:

Moving stops to breakeven creates a third trade outcome (stopped at zero P&L) that wasn't in your backtest. This kills high-R:R systems:

**Without BE stop:** 40% WR, avg win 6R, avg loss 1R → **+1.8R per trade expected**
**With BE stop** (half winners stopped at BE): Same system → **+0.6R per trade expected**
**67% of edge destroyed** by the breakeven stop.

**Alternative:** Take partials (close 20–25% at 3R) instead of moving stop to breakeven. Locks in psychological comfort while preserving most of the edge.

---

## Prop Firm Sizing Context

In a prop firm, max loss is the account fee — not full equity. Apply the convexity framework:

- On A-grade top/bottom tick setup: deploy near daily loss limit on the single trade
- Multiple accounts: enter the same A-grade setup across all accounts simultaneously
- Each account is an independent +EV attempt — not correlated unless you make them so

---

## Connections

| Concept | Link |
|---|---|
| Bayesian Kelly | [[Risk-Management/Bayesian Kelly Framework]] |
| Convexity | [[Risk-Management/Convexity and EV]] |
| Drawdown | [[Risk-Management/Drawdown Management]] |
| Binary stops | [[Lectures/Phase-5-Top-Bottom-Ticking/L26 - Risk Management for Reversals]] |
