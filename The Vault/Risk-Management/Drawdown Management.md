# Drawdown Management

**Tags:** `#risk-management` `#drawdown` `#psychology`
**MOC:** [[00-MOC/MOC - Risk Management]]
**Links:** [[Risk-Management/Position Sizing]] · [[Risk-Management/Bayesian Kelly Framework]] · [[Lectures/Phase-5-Top-Bottom-Ticking/L26 - Risk Management for Reversals]]

---

## The Losing Streak Protocol

**2 consecutive losses:** Reduce size 30%. Review: were these truly A/B grade setups?
**3 consecutive losses:** Reduce size 50%. Pause 1 week. Review all 3 in depth.
**4+ losses:** Stop trading the setup. Return to paper trade observation mode. Re-validate edge.

---

## Monte Carlo and Drawdown Valuation Adjustment (DDVA)

From the Unified Trading Framework (Turlakov):

**DDVA = the "cost" of protecting against a specific level of capital loss.**

Monte Carlo stress testing:
- Run thousands of simulated trade sequences using your historical WR and R:R
- The red (worst case) line defines the **survival boundary**
- Confidence levels: analyse the 95th percentile worst-case scenario to set drawdown aversion limits

**Goal: define the survival boundary before you begin trading.** Know what your worst realistic drawdown looks like before it happens.

---

## The Winning Streak Protocol

**3 consecutive wins:** May increase size by 15–20% (Bayesian posterior improving)
**Never exceed 2× standard sizing** regardless of win streak
**Dependency analysis:** If your system shows wins-follow-wins pattern statistically → sizing up during hot streaks is mathematically justified

---

## Daily / Weekly Limits

**Hard daily loss limit:** When hit → stop for the day. No exceptions.
**Weekly drawdown threshold:** When hit → stop for the week. Review before resuming.
**News-based protection:** Auto-flatten positions before high-impact releases (NFP, FOMC, CPI).

---

## Connections

| Concept | Link |
|---|---|
| Position sizing | [[Risk-Management/Position Sizing]] |
| Bayesian size reduction on losing streak | [[Risk-Management/Bayesian Kelly Framework]] |
| Prop firm daily limits | [[Risk-Management/Convexity and EV]] |
