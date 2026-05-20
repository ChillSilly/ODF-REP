# Dealer Hedging Mechanics

> *"Dealer hedging is the transmission mechanism. When dealers must adjust hedges quickly, that hedging becomes real buy/sell orderflow in the underlying."*
> Source: Jewraj Microstructure & Orderflow + UPS Trading Guide

**Tags:** `#options` `#dealer-hedging` `#GEX` `#gamma` `#delta`
**MOC:** [[00-MOC/MOC - Options Flow]]
**Links:** [[Concepts/GEX]] · [[Concepts/Gamma Flip]] · [[Concepts/Dealer Hedging]] · [[Greeks/Delta]] · [[Greeks/Gamma]] · [[Lectures/Phase-3-Options-Flow/L12 - GEX and DEX]]

---

## The Core Mechanism

Dealers warehouse the other side of options trades, then hedge their risk in the underlying. This hedging becomes **actual futures buy/sell flow** — completely mechanical, regardless of the dealer's directional view.

> The goal is not to "predict dealers." The goal is to recognise when hedging mechanics make price behaviour more likely to trend, pin, or chop.

---

## Delta Hedging — Directional Neutralisation

Delta hedging is the act of trading the underlying to offset option delta.

| Dealer Position | Delta Exposure | Hedge Action |
|---|---|---|
| Short calls | Short delta (negative) | Buy underlying futures |
| Short puts | Long delta (positive) | Sell underlying futures |

**What changes over time:** Delta is not constant. When spot moves, delta changes. So hedges must be continuously rebalanced.

### The Rebalancing Dynamic
As price rises → call delta increases → dealer must buy MORE futures
As price falls → put delta increases → dealer must sell MORE futures

The direction and size of this rebalancing depends entirely on the gamma regime.

---

## Gamma Hedging — Hedging the Hedge

Gamma tells you how fast delta changes. This dictates whether hedging is mean-reverting or trend-amplifying.

### Dealer Long Gamma (Stabilising — Positive GEX Regime)
If dealers are **net long gamma** (e.g., they bought options from customers):
- As price rises → delta increases → dealers SELL to rebalance
- As price falls → delta decreases → dealers BUY to rebalance
- **Effect:** Dampens moves, encourages chop and mean-reversion
- The market is being "pinned" by mechanical dealer activity

### Dealer Short Gamma (Destabilising — Negative GEX Regime)
If dealers are **net short gamma** (e.g., they sold options to customers — the most common case):
- As price rises → dealers must BUY MORE to stay delta-neutral
- As price falls → dealers must SELL MORE
- **Effect:** Amplifies moves, increases squeeze and liquidation risk
- **The logic:** Hedging requires buying into strength and selling into weakness → pushes the auction

---

## Vanna and Charm — Second-Order Dealer Flows

Beyond delta and gamma, dealers must manage second-order exposures:

**Vanna (∂Δ/∂σ = ∂ν/∂S):**
When implied volatility changes, delta changes → additional hedging required.
- As IV falls (vol compression), delta of OTM options changes → systematic dealer flows
- This is the "vol crush rally" mechanic: post-event IV crush → dealer delta unwind → buying pressure in futures

**Charm (∂Δ/∂t):**
As time passes, delta decays → dealers must adjust hedges even without price movement.
- At end of day: dealers with large near-expiry positions must rebalance for overnight risk
- Creates systematic end-of-day flows depending on net charm direction

---

## The GEX Feedback Loop

```
Positive GEX (Dealers Long Gamma):
Price rises → Dealer delta increases → Dealer SELLS futures
Price falls → Dealer delta decreases → Dealer BUYS futures
Result: Mean-reverting, suppressed volatility, pinning behaviour

Negative GEX (Dealers Short Gamma):
Price rises → Dealer delta increases → Dealer BUYS MORE futures
Price falls → Dealer delta increases → Dealer SELLS MORE futures
Result: Amplifying, trending, squeeze risk
```

---

## Common Misreads

- **"Call buying = bullish"** — Only if you know dealers are short the calls AND the hedging will dominate. Could be closing, rolling, or hedging a long.
- **Ignoring strike location** — Gamma is concentrated near ATM. Far OTM options have minimal hedging impact.
- **Ignoring time-to-expiry** — 0DTE options have explosive gamma near ATM. 6-month options have diffuse gamma impact.
- **Treating hedging as a guarantee** — Dealer mechanics create *pressure*, not certainty.

---

## Real-Time Confirmation Framework (Jewraj)

| Tool | What to Check |
|---|---|
| **Tape** | Is aggression persistent or bursty? Is pace rising into the strike? |
| **DOM** | Does liquidity hold and absorb? Does it pull and allow fast traversal? |
| **Footprint / Delta** | Aggression with no progress = absorption. Aggression with progress = continuation. |
| **Volume Profile / TPO** | Is this level an edge or the middle of value? Context changes meaning. |

---

## Connections

| Concept | Link |
|---|---|
| GEX regime | [[Concepts/GEX]] · [[Concepts/Gamma Flip]] |
| Greeks detail | [[Greeks/Delta]] · [[Greeks/Gamma]] · [[Greeks/Theta]] |
| Sweeps triggering hedging | [[Options-Flow/Sweeps and Blocks]] |
| OPEX unwind | [[Lectures/Phase-3-Options-Flow/L15 - OPEX Mechanics]] |
| Vanna / charm flows | [[Concepts/Net Delta Exposure]] · [[Volatility/IV Crush]] |
| Lecture | [[Lectures/Phase-3-Options-Flow/L12 - GEX and DEX]] |
