# CVD Divergence

> *"CVD divergence is the most reliable single orderflow reversal signal. It reveals that the driving participant class is running out of capacity — before price confirms it."*

**Tags:** `#orderflow` `#CVD` `#reversal` `#divergence` `#top-bottom-tick`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/Delta (Bid-Ask Delta)]] · [[Orderflow/Footprint Chart]] · [[Practice/Top Tick Setup]] · [[Practice/Bottom Tick Setup]] · [[Lectures/Phase-5-Top-Bottom-Ticking/L23 - Exhaustion Signals]]

---

## What CVD Is

**Cumulative Volume Delta (CVD)** is the running total of delta (aggressive buys minus aggressive sells) over time:

```
CVDₜ = Σᵢ₌₁ᵗ (BuyVolumeᵢ − SellVolumeᵢ)
```

Rising CVD = net aggressive buying is accumulating over time
Falling CVD = net aggressive selling is accumulating over time

---

## The Divergence Signal

CVD divergence occurs when **price and CVD move in opposite directions** — revealing that the directional move is losing its engine.

### Bearish Divergence (Top Tick Signal)
```
Price:  Higher High → Higher High → Higher High
CVD:    Lower High  → Lower High  → Lower High
```

**Interpretation:** Price is still advancing but each push requires progressively less aggressive buying. The buyers are exhausted. The market is making new highs on diminishing fuel. Imminent reversal.

**Confirmation:** Price breaks below prior swing low on elevated negative delta

### Bullish Divergence (Bottom Tick Signal)
```
Price:  Lower Low  → Lower Low  → Lower Low
CVD:    Higher Low → Higher Low → Higher Low
```

**Interpretation:** Price is still falling but each push requires progressively less aggressive selling. The sellers are exhausted. Making new lows on diminishing fuel.

**Confirmation:** Price breaks above prior swing high on elevated positive delta

---

## Why CVD Divergence Works

The mechanics: CVD tracks aggressive execution. When buyers push price to a new high, they are consuming offer-side liquidity. If the next push to a new high requires *less* aggressive buying, one of two things is happening:

1. **Passive sellers are absorbing more aggressively** (large resting sellers soaking up the buy flow)
2. **The buy aggression is depleting** (fewer participants willing to buy at these elevated prices)

Either way, the implication is the same: the force behind the uptrend is weakening even though price hasn't reversed yet.

---

## Multi-Timeframe Confirmation

CVD divergence is most reliable when it appears across multiple timeframes simultaneously:

**Maximum confluence:**
- 1H: CVD divergence building for 3–4 hours (macro exhaustion)
- 15m: Delta declining on each successive push (tactical exhaustion)
- 5m: Absorption appearing at the current push (micro exhaustion)
- 1m: Reversal candle forming (execution signal)

When the divergence is visible on 1H, 15m, and 5m simultaneously → structural reversal, not noise.

---

## Execution Protocol

### Bearish CVD Divergence (Short Entry)
1. Identify CVD making lower highs while price makes higher highs (5m or 15m chart minimum)
2. Confirm structural level: price at call wall, VPOC, VAH, or composite POC
3. Confirm footprint: absorption visible at the extreme (large ask-side volume with no price advancement)
4. Confirm DOM: resting offers absorbing aggressive buyers
5. Wait for the first bar that closes below the prior bar's low on elevated negative delta
6. Enter short on that bar
7. Stop: above the CVD divergence high
8. Target T1: prior session VPOC or VAL

### Bullish CVD Divergence (Long Entry)
Mirror image — CVD higher lows while price lower lows, absorption at the low, close above prior bar's high.

---

## Common Mistakes

**Trading CVD divergence without a structural level:** A CVD divergence in the middle of a value area is likely a pause, not a reversal. CVD divergence at the call wall/put wall/VPOC/composite POC = genuine exhaustion.

**Acting before confirmation bar:** The divergence tells you it's *likely* to reverse. The candle tells you it *has* reversed. Wait for the confirmation bar, not the divergence alone.

**Ignoring the timeframe:** CVD divergence on a 1m chart is noise. On a 5m chart it's a setup. On a 15m chart it's a conviction trade.

---

## Connections

| Concept | Link |
|---|---|
| Delta foundation | [[Orderflow/Delta (Bid-Ask Delta)]] |
| Footprint absorption | [[Orderflow/Footprint Chart]] |
| Top tick framework | [[Practice/Top Tick Setup]] |
| Bottom tick framework | [[Practice/Bottom Tick Setup]] |
| Exhaustion signals | [[Lectures/Phase-5-Top-Bottom-Ticking/L23 - Exhaustion Signals]] |
| Integration | [[Lectures/Phase-5-Top-Bottom-Ticking/L24 - Full Integration]] |
