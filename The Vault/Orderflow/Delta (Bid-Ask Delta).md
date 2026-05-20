# Delta — Bid-Ask Delta

> *"The question is never 'what is delta?' The question is 'what is delta doing to price at this location?'"*
> Source: Jewraj Microstructure & Orderflow + UPS Trading Guide

**Tags:** `#orderflow` `#delta` `#CVD` `#aggression`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/Footprint Chart]] · [[Orderflow/CVD Divergence]] · [[Orderflow/Tape (Time and Sales)]] · [[Lectures/Phase-4-Order-Flow/L17 - Footprint Charts and VAP]]

---

## What Delta Measures

Delta is a **measurement of initiative (aggressive) execution**. Built from executed trades, classified as either ask-side or bid-side.

```
Delta = Ask Volume − Bid Volume
```

| Sign | Meaning |
|---|---|
| Positive | More buy aggression than sell aggression. Liquidity takers were net buyers. |
| Negative | More sell aggression than buy aggression. Liquidity takers were net sellers. |

> **Delta does not measure who "won" the auction. It measures how much initiative flow executed on each side.**

---

## Where Delta Comes From

Delta is derived from the same raw data stream, just at different levels of aggregation:

- **Tape (Time & Sales):** Prints every execution in time order
- **Footprint:** Organises those same prints by price and bar segmentation
- **Delta:** Compresses the bid/ask split into a single number (per price, per bar, per session)

---

## The Three Delta Scopes

### 1. Price-Level Delta (Row Delta)
Delta computed per price row inside a footprint bar.
- Useful for microstructure reads: where aggression concentrated
- Helps detect absorption and failed continuation at a specific price

### 2. Bar Delta (Candle/Bar Total Delta)
Delta summed across all price rows in the bar.
- Used for bar-to-bar comparisons
- Used in "delta divergence" concepts

### 3. Session / Range Delta (Cumulative Delta / CVD)
Delta accumulated across many bars.
- Useful for seeing session-wide initiative imbalance
- Often over-interpreted if not tied to levels and price response
- A large cumulative delta can build during a trend, during balance, or during stop-driven liquidation — the meaning changes with context

---

## What Delta Is NOT

Delta is commonly mis-sold as a "who is in control" meter. Jewraj is explicit:

- Delta is **not** a direct measurement of "smart money"
- Delta is **not** a direct measurement of net positioning
- Delta is **not** proof that buyers are "strong" or sellers are "weak"
- Delta is **not** a DOM measurement — cannot see liquidity that pulled, spoofed, or refreshed without trading
- Delta is **not** a standalone signal

> **Delta is a measurement of aggressive execution, not a measurement of auction outcome.**

---

## The Only Relationship That Matters: Delta vs Price

| Delta With Follow-Through | Delta With No Follow-Through |
|---|---|
| Positive delta + price lifting | Positive delta but price does not advance |
| Negative delta + price pressing lower | Negative delta but price does not decline |
| Initiative flow is "getting paid" | Absorption, exhaustion, or structural resistance |

The informational edge is most often in **failed aggression and absorption** — not in big delta numbers by themselves.

---

## CVD Divergence — The Most Powerful Signal

See: [[Orderflow/CVD Divergence]] for full detail.

**Bearish divergence (top):**
- Price makes higher high
- CVD makes lower high
- Buyers using progressively less aggressive buying to make new highs → exhausted

**Bullish divergence (bottom):**
- Price makes lower low
- CVD makes higher low
- Sellers using progressively less selling to make new lows → exhausted

---

## Delta in Footprint Context

**Stacked imbalances:** Multiple consecutive price levels with 70%+ imbalance in same direction → institutional flow → trend continuation signal.

**Absorption on footprint:**
```
Absorption Score = Total Volume at Level / Price Movement (ticks)
```
High absorption score + stalled price + shifting delta = reversal setup

**Exhaustion:**
```
Exhaustion Ratio = Volume_current_swing / Volume_previous_swing
```
Ratio < 0.7 → exhaustion. Decreasing delta per push.

---

## Bottom Line

Delta is one of the cleanest execution-based measurements available — IF interpreted correctly:
1. Delta measures aggressive execution imbalance
2. Delta does not directly measure control
3. Delta becomes useful when paired with location and price response
4. The informational edge is often in failed aggression (absorption), not in large delta numbers

---

## Connections

| Concept | Link |
|---|---|
| CVD divergence | [[Orderflow/CVD Divergence]] |
| Footprint context | [[Orderflow/Footprint Chart]] |
| Tape derivation | [[Orderflow/Tape (Time and Sales)]] |
| Reversal signal | [[Practice/Top Tick Setup]] · [[Practice/Bottom Tick Setup]] |
| Lecture | [[Lectures/Phase-4-Order-Flow/L17 - Footprint Charts and VAP]] |
