# Sweeps and Blocks — Options Flow

> *"A large premium print with no structure context is often noise. Treat options prints as context that shapes expectation — not as entries."*
> Source: Jewraj Microstructure & Orderflow + UPS Trading Guide

**Tags:** `#options` `#sweeps` `#blocks` `#UOA` `#institutional-flow`
**MOC:** [[00-MOC/MOC - Options Flow]]
**Links:** [[Options-Flow/Dealer Hedging Mechanics]] · [[Concepts/GEX]] · [[Lectures/Phase-3-Options-Flow/L14 - Unusual Options Activity]]

---

## Sweeps

A sweep is an options order routed across multiple exchanges simultaneously to ensure immediate, complete execution. Priority is **speed over price** — someone believes being fast matters more than saving a few cents.

### What a Sweep Usually Implies
- Urgency: willingness to cross spreads
- Desire to get filled NOW
- Often front expiry and near the money
- **Caution:** urgency can be hedging, not directional conviction

### Why Sweeps Matter
Large players use sweeps when they expect price to move soon, don't want partial fills, want to force positioning, or want to disguise size by splitting orders. When someone chooses speed over price — they believe being early matters more than a better fill.

### Repeated Sweeps = Conviction
One sweep = ambiguous (hedge, volatility trade, speculative probe, quick test)
Repeated sweeps at the same strike in the same direction = **conviction and urgency**. Multiple sweeps remove most of the uncertainty.

---

## Blocks

A block is a large options trade, often negotiated or crossed. Executed bilaterally — dealer-to-institution — outside the exchange's electronic book.

### How to Interpret Blocks
Blocks can be:
- Opening institutional risk (new directional or volatility bet)
- Closing a hedge (reduces information content)
- One leg of a spread (must check for the other leg)

They are **not automatically directional**. Size alone does not determine intent.

---

## Spreads — Where the Intent Lives

Most "smart" institutional options activity is expressed via spreads. Ignoring the second leg means misclassifying the trade.

| Spread Type | Intent |
|---|---|
| Vertical | Directional with defined risk |
| Calendar / Diagonal | Volatility / time structure |
| Ratio / Backspread | Convexity demand |
| Straddle / Strangle | Event-driven, direction-neutral vol bet |

---

## Rolls — Often Misread as Fresh Flow

A roll is closing one position and opening another (time and/or strike). Roll volume can look like fresh flow but is often maintenance.

**Informational content of rolls:**
- Where risk is moving (to a different expiry = staying in the trade)
- Whether protection demand is increasing
- Whether strikes are being defended or abandoned

---

## The Gamma Feedback Loop (Why Sweeps Move Futures)

From Jewraj:
```
Calls swept → Dealers sell calls → Dealers short gamma
→ Dealers must buy futures to delta-hedge
→ Price rises
→ Call delta increases → Dealers must buy MORE futures
→ Loop continues until sweep exhausted
```

This is why strong moves often **start after sweeps, not before**. The sweep is the trigger; dealer gamma hedging is the engine.

---

## Classification Tree (Fast, Repeatable)

**Step 1: Single-leg or multi-leg?**
- Single-leg = cleaner directional or volatility intent
- Multi-leg = usually reveals intent better but can also represent hedge logic

**Step 2: Opening or closing?**
- If unknown → treat as unknown and reduce confidence
- Informational edge comes from flow that CHANGES exposure

**Step 3: What exposure is dominant?**
- Delta-driven: directional hedging pressure
- Gamma-driven: amplifying during IV event
- Vega-driven: IV repricing, event risk or rebalancing

---

## The Volume/OI Signal

```
Volume/OI Ratio = Today's Volume / Open Interest
> 2.0 = Unusual
> 5.0 = Highly unusual
> 10.0 = Extreme
```

When volume dramatically exceeds OI → new positions are being created rapidly, not just existing positions changing hands. This signals fresh conviction entering the market.

---

## The 5-Step Sweep Confirmation Filter

1. Is it a sweep? (Execution type — crosses multiple exchanges)
2. Is it repeated? (Same strike, same direction, 2+ times in same session)
3. Is the strike significant? (High OI already? Near current price?)
4. Does netflow align? (Overall day's flow in the same direction?)
5. Does price confirm? (Holding above support / breaking resistance?)

All 5: A-grade signal. 4/5: B-grade. 3 or fewer: Do not trade — wait for more confirmation.

---

## Connections

| Concept | Link |
|---|---|
| Dealer hedging mechanics | [[Options-Flow/Dealer Hedging Mechanics]] |
| Gamma feedback loop | [[Concepts/GEX]] |
| GEX regime | [[Concepts/GEX]] · [[Concepts/Gamma Flip]] |
| Netflow context | [[Orderflow/Delta (Bid-Ask Delta)]] |
| Lecture | [[Lectures/Phase-3-Options-Flow/L14 - Unusual Options Activity]] |
