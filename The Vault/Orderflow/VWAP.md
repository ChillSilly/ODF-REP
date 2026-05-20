# VWAP — Volume Weighted Average Price

> *"VWAP is a practical intraday proxy for fair value. It is best treated as a reference point and mean-reversion target, not as a standalone entry trigger."*
> Source: Jewraj Microstructure & Orderflow

**Tags:** `#orderflow` `#VWAP` `#fair-value` `#mean-reversion`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/AMT]] · [[Orderflow/Volume Profile]] · [[Profile-Levels/POC]] · [[Lectures/Phase-4-Order-Flow/L17 - Footprint Charts and VAP]]

---

## What VWAP Is

VWAP is the average price weighted by volume over the session.

```
VWAP = Σ(Pᵢ × Vᵢ) / ΣVᵢ
```

Where Pᵢ = trade price at print i, Vᵢ = volume at print i.

It provides a running snapshot of where the market has done the most business — the **volume-weighted consensus** of fair value for the session.

---

## What VWAP Actually Tells You

- Where the session's volume-weighted consensus is
- A clear framework for location: **premium vs. discount**
- Whether the auction is in balance or discovery

VWAP gives location, not direction. The edge comes from combining VWAP location with structure and order flow.

---

## The Core Use Case

Jewraj's primary use: **mean reversion target**, not standalone entry signal.

When price is far from VWAP → it is trading away from fair value. In balanced/rotational conditions, price has a strong tendency to rotate back toward VWAP as the auction seeks efficiency.

**VWAP is an objective:**
- The most obvious fair-value re-test location
- Natural place for profit-taking, rebalancing, and two-sided trade
- Widely referenced → reinforces it as a magnet

---

## Why Mean-Reversion to VWAP Works

Mean reversion is NOT because VWAP is "magic." It happens because:
1. VWAP marks where the majority of volume has traded
2. Markets revisit areas of heavy participation because liquidity is better and price discovery is "easier"
3. Extensions away from VWAP require continued aggressive participation — when that participation weakens, rotation becomes likely

**The most important idea:** Reversion happens because the auction away from VWAP *stalls and fails to attract new committed participation*. If the market IS accepting higher prices → VWAP can lag for hours. Forcing a fade just because price is far from VWAP = the mistake.

---

## VWAP Regimes

| Rotational / Balanced | Directional / Discovery |
|---|---|
| Price oscillates around value | Price holds away from VWAP |
| Moves away from VWAP have diminishing follow-through | Pullbacks are shallow and may not reach VWAP |
| VWAP behaves like session's center of gravity | VWAP lags while value is being re-priced |

---

## Execution Framework

**Correct sequence:** VWAP is the target. Structure and order flow justify the trade.

1. Look for price to extend away from VWAP (premium or discount)
2. Wait for structural and/or order flow evidence that continuation is failing (CVD divergence, absorption)
3. VWAP becomes the objective or partial target — not the reason to trade

See: [[Orderflow/CVD Divergence]] · [[Orderflow/Footprint Chart]]

---

## Common Mistakes

- Treating VWAP like an automatic bounce line
- Forcing mean reversion on a clear trend day (non-trend day vs trend day distinction — see [[Orderflow/TPO and Market Profile]])
- Using VWAP as an entry instead of a location framework
- Having no invalidation (no point where the thesis is clearly wrong)
- Confusing a VWAP touch with VWAP acceptance (the market can tag it and continue)

---

## Connections

| Concept | Link |
|---|---|
| Fair value context | [[Orderflow/AMT]] · [[Orderflow/Volume Profile]] |
| POC comparison | [[Profile-Levels/POC]] · [[Profile-Levels/VPOC]] |
| Trend day context | [[Orderflow/TPO and Market Profile]] |
| Execution confirmation | [[Orderflow/CVD Divergence]] · [[Orderflow/Footprint Chart]] |
| Lecture | [[Lectures/Phase-4-Order-Flow/L17 - Footprint Charts and VAP]] |
