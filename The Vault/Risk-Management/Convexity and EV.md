# Convexity and Expected Value

> *"The practical edge isn't being smarter than the market. It's structuring your bets so that being wrong costs little and being right pays a lot."*
> Source: Convexity_and_EV PDF

**Tags:** `#risk-management` `#convexity` `#EV` `#prop-firm`
**MOC:** [[00-MOC/MOC - Risk Management]]
**Links:** [[Risk-Management/Bayesian Kelly Framework]] · [[Risk-Management/Position Sizing]] · [[Lectures/Phase-5-Top-Bottom-Ticking/L26 - Risk Management for Reversals]]

---

## The Core Definitions

### Risk vs Uncertainty (Turlakov Framework)
```
Risk = Objective and measurable (centre of probability distribution, standard deviation)
Uncertainty = Subjective and unquantifiable (fat tails, liquidity gaps, behavioural biases)
```
> *"Risk is what you measure. Uncertainty is what you manage."*

Risk lives in the bell of the distribution. Uncertainty lives in the fat tails.

### Convexity
**Convexity** means your upside is larger than your downside, and the relationship is non-linear. Your losses are capped or fixed. Your gains are theoretically unlimited or disproportionately large.

The word comes from the shape of the payoff curve — it bends outward (convex) rather than being a straight line.

---

## Expected Value (EV)

```
EV = (Win Probability × Win Amount) − (Loss Probability × Loss Amount)
```

EV is the average outcome you'd expect if you repeated a decision infinitely — probability-weighted profit per attempt.

---

## The Prop Firm Convexity Model

### Standard Futures Account (Linear)
```
Risk: $1,000    Reward: $1,000    Win Rate: 60%
EV = (0.60 × $1,000) − (0.40 × $1,000) = +$200
```

### Prop Firm Account (Convex)
```
Risk: $100 (account fee)    Reward: $1,980 (after 80% split)    Win Rate: 60%
EV = (0.60 × $1,980) − (0.40 × $100) = +$1,148
```

**Same skill. 5.7× higher EV just from the structure.**

---

## Three Core Principles of Prop Firm Convexity

### 1. Loss Cap Creates a Floor
Traditional: Blow $50,000 → you're down $50,000
Prop: Blow $50,000 (firm's capital) → you're down $100 (your fee)
The firm eats the drawdown. You lose only the cost of entry.

### 2. Profit Split Creates Leverage on Wins
You don't own the $50k account, but you own 80% of the profit.
- Generate $5,000 → you take $4,000
- Risk $100 → gain $4,000 → **40:1 leverage on actual capital**

### 3. Reset Option = Re-Entry to Convexity
Each account reset is a fresh +EV bet at the cost of the entry fee.
A reset is not failure — it's buying another lottery ticket where:
- The ticket costs $100
- The jackpot is $2,000
- The odds are in your favour (>17% win rate needed to break even)

---

## The Breakeven Win Rate Formula

```
WR_breakeven = Fee / (Payout + Fee)
```

Example: Fee = $100, Payout = $1,980
```
WR_breakeven = $100 / ($1,980 + $100) = 4.8%
```

You need to succeed **1 in 20 attempts** to break even. At 60% actual WR → massive positive EV.

---

## Why Traditional Metrics Fail in Prop Context

**Win Rate:** A 20% WR in standard trading kills you. In prop with 5:1 R:R → still profitable.

**Profit Factor** (Gross Wins / Gross Losses): Distorted because "gross losses" are capped at fees while wins are leveraged by firm's capital.

**Sharpe Ratio:** Penalises upside and downside equally. In prop, downside is capped → a high-volatility strategy with capped losses will have a bad Sharpe but excellent real-world performance.
**Use Sortino Ratio instead** — only penalises downside deviation.

---

## Kelly in the World of Fat Tails

### The Problem with Standard Kelly
Standard Kelly assumes a Gaussian world. In reality:
- **Grey Swans** (rare but significant events) occur more than models predict
- In the presence of fat tails, the optimal fraction must be **reduced below theoretical Kelly**
- The fear of permanent loss (drawdown aversion) must be quantified and baked in

### Geometric Growth vs Leverage (Turlakov)
The Kelly curve (geometric growth vs leverage) shows:
- Growth rises as leverage increases — up to a peak
- After the peak, growth turns negative sharply
- With tail risk, the optimal leverage is lower and the peak is earlier

**75% ETL (Expected Tail Loss) line:** The optimal leverage fraction must account for the worst expected outcomes in the tail — this line decreases monotonically as leverage increases. Leverage above the intersection is destructive in fat-tail environments.

---

## The Kelly Parity Approach

Three portfolio construction methods:
| Method | Optimises | Problem |
|---|---|---|
| Mean-Variance | Sharpe Ratio | Often increases large risks (fattening tails) |
| Risk Parity | Pairs assets by 1/Sigma | Agnostic to returns |
| **Kelly Parity** | Pairs assets by growth rates | Balances portfolio for "best long run" |

Kelly Parity combines risk management and growth optimisation — it is the intersection of the two objectives.

---

## Dependency Analysis — Exploiting Non-Randomness

Markets aren't always random. Trade sequences can have statistical patterns:
- **Wins follow wins** → increase position size (pressing the edge)
- **Losses follow losses** → decrease position size (preservation mode)

From your trade log, test whether your win/loss sequences show non-ergodic behaviour. If wins tend to cluster (you're "in flow") → Bayesian framework justifies sizing up after a winning run.

---

## Connections

| Concept | Link |
|---|---|
| Bayesian sizing | [[Risk-Management/Bayesian Kelly Framework]] |
| Binary stops | [[Risk-Management/Position Sizing]] |
| Drawdown management | [[Risk-Management/Drawdown Management]] |
| Reversal trade sizing | [[Lectures/Phase-5-Top-Bottom-Ticking/L26 - Risk Management for Reversals]] |
