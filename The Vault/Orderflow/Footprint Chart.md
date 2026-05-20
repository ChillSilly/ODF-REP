# Footprint Chart

> *"The footprint is the most powerful orderflow tool — and the most commonly misused."*
> Source: Jewraj Microstructure & Orderflow + UPS Trading Guide

**Tags:** `#orderflow` `#footprint` `#delta` `#execution`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/Delta (Bid-Ask Delta)]] · [[Orderflow/CVD Divergence]] · [[Orderflow/Volume Profile]] · [[Orderflow/Tape (Time and Sales)]] · [[Lectures/Phase-4-Order-Flow/L17 - Footprint Charts and VAP]]

---

## What the Footprint Is

The footprint chart (also called "numbers bars" or "volumetric bars") is a **structured view of the trade stream mapped onto price and time**. It aggregates trades indexed by time and price level, with each trade attributed to either bid-side or ask-side execution.

**Critical distinction:** The footprint shows **executed volume** at each price level inside a bar. It is NOT showing resting orders in the book — it shows what actually traded.

Three dimensions revealed:
- **Where** (at what price)
- **When** (in which bar)
- **Who was aggressive** (buyer or seller)

---

## Bid-Side vs Ask-Side

| Side | Meaning | Who Was Aggressive |
|---|---|---|
| **Ask-side volume** (right/green) | Volume executed at the ask | Aggressive buyers — market buy orders that lifted offers |
| **Bid-side volume** (left/red) | Volume executed at the bid | Aggressive sellers — market sell orders that hit bids |

> **Example:** When "500" prints on the ask side at 6500.00, that means 500 contracts traded at 6500.00 where the buyer was the aggressor. Those 500 contracts came from sellers sitting at 6500.00 with limit orders, and a buyer lifted them. The footprint does not show any sellers still resting there; it only shows what actually executed.

---

## Trade Classification Quality

This is the most important technical fact about footprint charts. Classification quality directly affects signal reliability.

### Case 1: Exchange-Provided Aggressor Flags (Best)
CME's Market-by-Order (MBO) feeds can provide order-level detail. When a platform uses this, the bid/ask split is closest to ground-truth. Not all platforms have access to this.

### Case 2: Quote-Based Classification (Common)
Compare trade price to contemporaneous quotes:
- Trades at or above the ask → buy-initiated
- Trades at or below the bid → sell-initiated
- Trades inside the spread → require tie-breaking logic

### Case 3: Tick Rule / Heuristic (Weakest)
Trade price above prior trade price → classified as buy. This is provably imperfect. If your platform uses this, be cautious about interpreting bid/ask splits.

> **Always know which classification method your platform uses.** TradingView uses candle direction (approximation). Motivewave and professional platforms use quote-based or exchange-based classification (true delta).

---

## Footprint Types

### 1. Bid × Ask Footprint (Canonical)
Each price row: `[Bid Volume] × [Ask Volume]`
Left = aggressive sellers. Right = aggressive buyers.

### 2. Delta Footprint
`Delta = Ask Volume − Bid Volume`
- Positive: more buying aggression
- Negative: more selling aggression

### 3. OHLC Overlay
Anchors microstructure patterns to conventional chart structure. Presentation choice.

---

## Bar Construction Types

| Type | Construction | Advantage | Challenge |
|---|---|---|---|
| **Time bars** | Fixed interval (1m, 5m, etc.) | Consistent time periods, easy comparison | Volume varies dramatically |
| **Range bars** | Fixed price range | Normalizes volatility | Bar boundaries are activity-dependent |
| **Volume bars** | Fixed traded volume | Normalizes participation | Backdating effects in pattern recognition |

**Practical:** Time bars preferred for intraday footprint analysis — align with session patterns (open, lunch, close).

---

## Key Patterns — Initiative vs Passive

### Initiative Flow (Aggressive Orders)
**Large ask-side prints:** Buyers were impulsive, did not want to wait. Incurred buying. Price typically builds.
**Large bid-side prints:** Sellers were impulsive, hit the bid. Price typically declines.

### The Imbalance Formula
```
Imbalance Ratio = |Bid Volume − Ask Volume| / (Bid Volume + Ask Volume)
```
- > 70%: Strong directional conviction
- 50–70%: Moderate bias
- < 50%: Balanced (chop)

### Stacked Imbalances
Multiple consecutive price levels with 70%+ imbalance in same direction → institutional flow → trend continuation signal. See: [[Concepts/Orderflow#Stacked Imbalances]]

### Absorption
Large volume at a level without price movement:
```
Absorption Score = Volume at Level / Price Movement (ticks)
```
High score = someone absorbing (strong hands defending).
**Signal:** Likely reversal zone. Support/resistance being defended. Enter in direction of absorber.

### Exhaustion
Decreasing volume on directional move:
```
Exhaustion Ratio = Volume_current_swing / Volume_previous_swing
```
Ratio < 0.7 → exhaustion confirmed. Trend losing steam.
**Signal:** Reduce position, watch for delta divergence.

---

## Footprint vs Volume Profile

| Footprint | Volume Profile |
|---|---|
| Bar level — micro execution behavior bar by bar | Range/session distribution — macro acceptance/rejection structure |
| Used for: seeing execution behavior | Used for: seeing session structure |
| Shows: who was aggressive, where | Shows: where the market accepted/rejected |

---

## Common Mistakes (Jewraj)

**Mistake 1: Ignoring trade classification quality.** Every imbalance is only as reliable as the platform's classification method.

**Mistake 2: Trading every imbalance automatically.** Context required:
- Is it at a structure extreme (VAL, VAH, key level)?
- Is it in the direction of prior bar momentum?
- What happened to price after the imbalance?
- Is there exhaustion or continuation?

**Mistake 3: Not accounting for order size/segmentation.** Multiple smaller contracts in rapid succession look identical to one large order.

**Mistake 5: Treating range/volume/time bars as equivalent.** Bar type affects how "time" reads in relation to session rhythms.

**Mistake 7: Assuming all large prints = institutional interest.** Large size alone does not determine smart money or retail.

---

## Connections

| Concept | Link |
|---|---|
| Delta measurement | [[Orderflow/Delta (Bid-Ask Delta)]] |
| CVD divergence signal | [[Orderflow/CVD Divergence]] |
| Absorption concept | [[Concepts/Orderflow]] |
| Volume Profile context | [[Orderflow/Volume Profile]] |
| Tape confirmation | [[Orderflow/Tape (Time and Sales)]] |
| DOM for context | [[Orderflow/DOM (Depth of Market)]] |
| Lecture | [[Lectures/Phase-4-Order-Flow/L17 - Footprint Charts and VAP]] |
