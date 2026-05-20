# L17 — Footprint Charts and Volume at Price

> **Lecture 17 of 27 — Phase 4: Order Flow**
> The footprint chart is the highest-resolution tool in futures trading. It shows you exactly who is winning each battle at every price level — not just what price did, but how it got there and who was responsible.

---

# PART 1 — THEORY

## 1.1 What a Footprint Chart Shows

A footprint chart displays, for each candlestick, the **volume traded at each price level** split between aggressive buyers (hitting the ask) and aggressive sellers (hitting the bid).

```
Each row = 1 tick level
Each candle = time period (1min, 5min, etc.)

Format per row: [Bid Volume] × [Ask Volume]
               [Sells]      × [Buys]

Example:
5,244.50  |  234 × 89    ← Bears dominating at this level
5,244.25  |  45 × 312    ← Bulls dominating
5,244.00  |  567 × 578   ← Balanced
```

**Green (or right column):** Aggressive buyers — market orders hitting the ask. These are buyers who want in *now* and are willing to pay the offer.

**Red (or left column):** Aggressive sellers — market orders hitting the bid. These are sellers who want out *now* and are willing to accept the bid.

---

## 1.2 Delta — The Core Footprint Metric

**Delta per bar** = Aggressive buys − Aggressive sells at each price level

```
Δ = Buy Volume − Sell Volume
```

**Cumulative Delta (CVD)** = Σ(delta) over time. This is the running total of buying vs. selling pressure.

**Positive delta:** More aggressive buyers than sellers. Bullish pressure.
**Negative delta:** More aggressive sellers than buyers. Bearish pressure.

**The critical insight:** Price and delta do not always agree. When they diverge, it signals exhaustion:
- Price makes a new high but delta is *falling* (buyers are exhausted, using less and less volume to move price higher) → bearish divergence → imminent reversal
- Price makes a new low but delta is *rising* (sellers are exhausted, using less volume to move price lower) → bullish divergence → imminent reversal

This is the CVD divergence signal — one of the most reliable reversal signals in futures trading.

See: [[Orderflow/CVD Divergence]]

---

## 1.3 The Imbalance Formula

From the UPS materials:
```
Imbalance Ratio = |Bid Volume − Ask Volume| / (Bid Volume + Ask Volume)
```

- Imbalance > 70%: Strong directional conviction at this price level
- Imbalance 50–70%: Moderate directional bias
- Imbalance < 50%: Balanced market (noise/chop)

**Stacked imbalances:** When multiple consecutive price levels all show 70%+ imbalance in the same direction → institutional flow. Not one aggressive trade — a sustained directional push. This is the strongest continuation signal in footprint analysis.

See: [[Orderflow-Concepts/Stacked Imbalances]]

---

## 1.4 Absorption — The Reversal Setup

**Absorption** occurs when large volume trades at a price level but price *fails to move* in the direction of that volume.

```
Absorption Score = Total Volume at Level / Price Movement (ticks)
```

High score (lots of volume, price barely moves) = someone is absorbing the aggressive flow.

**Mechanics:**
- Aggressive sellers are hitting the bid, expecting price to fall
- But a large passive buyer is absorbing every sell order
- Price stalls or barely falls despite heavy selling
- The passive buyer is "strong hands" — they want to own this level and are willing to absorb the entire aggressive order flow

This is the footprint signal for your bottom tick setup. Absorption at a key level (VPOC, value area low, major support) where prior auction marked acceptance is the highest-conviction entry trigger.

**The flip:** After absorption completes (sell volume dries up), the absorbed level becomes support. The aggressive sellers are trapped short. Price reverses and runs their stops.

See: [[Orderflow-Concepts/Absorption]] · [[Orderflow-Concepts/Trapped Traders]]

---

## 1.5 Exhaustion — Trend End Signal

**Exhaustion** occurs when the volume driving a directional move progressively decreases on each successive push.

```
Exhaustion Ratio = Volume_current_swing / Volume_previous_swing
Ratio < 0.7 → exhaustion confirmed
```

**The pattern in a bull trend:**
- Wave 1 up: 10,000 contracts of aggressive buying
- Wave 2 up: 7,000 contracts
- Wave 3 up: 4,000 contracts
→ Each push is weaker than the last. The trend is losing its engine. The buyers are running out.

**Combined signals for exhaustion:**
- Decreasing delta on each push
- Imbalances disappearing (ratio falling toward 50%)
- Increased two-way trade (absorption beginning)
- CVD making lower highs while price makes higher highs

When all four appear at a structural level → top tick setup confirmed.

See: [[Orderflow-Concepts/Unfinished Auction]] · [[Orderflow/CVD Divergence]]

---

## 1.6 Volume at Price (Volume Profile) — The Context Layer

Volume Profile (a.k.a. Volume at Price / VAP) shows the horizontal distribution of volume across price levels for a given time period. It's the complement to the footprint's vertical time-based view.

**Key levels:**
- **VPOC (Volume Point of Control):** Price level with the highest volume traded. The "fairest price" — where the most value was exchanged. Acts as a magnet and as support/resistance.
- **Value Area (VA):** The range containing 70% of total volume. Price inside the VA = fair value; price outside = opportunity.
- **VAH (Value Area High):** Top of the value area. Resistance when approached from below.
- **VAL (Value Area Low):** Bottom of the value area. Support when approached from above.
- **HVN (High Volume Node):** Areas of heavy trading → strong support/resistance → price consolidates here
- **LVN (Low Volume Node):** Areas of minimal trading → price moves through quickly → gap-like behavior

**The VAP rule:** Price is always either in value (trading at VPOC/VA → range-bound, mean-revert) or out of value (breaking away → trending). Identifying which condition you're in determines your strategy.

See: [[Orderflow/Volume Profile]] · [[Profile-Levels/Value Area High VAH]] · [[Profile-Levels/Value Area Low VAL]] · [[Profile-Levels/Point of Control POC]] · [[Profile-Levels/VPOC]] · [[Profile-Levels/HVN]] · [[Profile-Levels/LVN]]

---

# PART 2 — PRACTICE

## 2.1 The Footprint Reading Checklist

For every 5-minute bar you're considering trading off:

```
□ What is the delta? (positive/negative/diverging)
□ Are there stacked imbalances? (same direction, 70%+ for 3+ levels)
□ Is there absorption? (high volume, no movement, then reversal)
□ Is volume increasing or decreasing on this push? (exhaustion check)
□ Does this level have significance in the Volume Profile? (VPOC/VAH/VAL/HVN/LVN)
```

If 4 or 5 boxes align → high-conviction trade. If 2 or fewer → no trade.

---

## 2.2 The CVD Divergence Entry

The highest-quality footprint reversal entry:

**Bearish divergence (top tick entry):**
1. Price is making higher highs in the last 3–5 bars
2. CVD is making lower highs (declining buying pressure per push)
3. A footprint bar shows exhaustion (decreasing delta on the push)
4. The push is into a structural level: VPOC from above, VAH, call wall
5. A bar closes with heavy selling delta and price fails to make a new high

**Entry:** Short on the first bar that confirms (closes red, negative delta, after the divergence)
**Stop:** Above the prior swing high
**Target:** VPOC of the session or prior session Value Area Low

**Bullish divergence (bottom tick entry):** Mirror image.

See: [[Orderflow/CVD Divergence]] · [[Practice/Bottom Tick Setup]]

---

## 2.3 Absorption Entry Protocol

**Identifying absorption in real time:**

1. Price is falling aggressively (large negative delta bars)
2. At a key level (VPOC, VAL, or prior session low), the selling volume spikes but price stops
3. The footprint shows: large sell volume on bid side, but ask side remains consistent
4. The delta for that bar is very negative but price didn't move proportionally (high absorption score)
5. On the next bar, selling volume drops dramatically (sellers exhausted)

**Entry:** Long on the bar *after* the peak absorption bar, when volume drops
**Stop:** Below the absorption level by 2–3 ticks
**Target:** VPOC of the range above

---

## 2.4 Volume Profile Levels as Structural Filters

Integrate VAP with your footprint entries:

**Never enter against a VPOC on the first approach.** Price has a strong tendency to revisit the VPOC. If you're in a position and the VPOC is between you and your target → expect price to stall there.

**LVN breakout trades:** If price is approaching an LVN (thin area, no volume support above), and orderflow shows stacked imbalances in the direction of the LVN → expect fast, gap-like move through it. This is the cleanest momentum trade in volume profile analysis.

**HVN mean-reversion trades:** Price in an HVN (thick area, lots of historical transactions) → mean-reversion to VPOC. Fade extremes within HVN, target VPOC.

---

## Connections

| Concept | Links |
|---|---|
| CVD divergence | [[Orderflow/CVD Divergence]] · [[Practice/Top Tick Setup]] |
| Absorption | [[Orderflow-Concepts/Absorption]] · [[Orderflow-Concepts/Trapped Traders]] |
| Stacked imbalances | [[Orderflow-Concepts/Stacked Imbalances]] · [[Orderflow/Footprint Chart]] |
| Volume profile levels | [[Orderflow/Volume Profile]] · [[Profile-Levels/Point of Control POC]] |
| Exhaustion → reversal | [[Practice/Bottom Tick Setup]] · [[Orderflow-Concepts/Unfinished Auction]] |

---

## Tags
`#lecture` `#phase-4` `#orderflow` `#footprint` `#delta` `#CVD` `#absorption` `#exhaustion` `#volume-profile` `#VPOC` `#imbalance`

*Next → [[L18 - Market Profile and AMT]]*
*Previous → [[L16 - Market Microstructure]]*
