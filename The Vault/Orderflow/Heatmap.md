# Heatmap

> *"Heatmap is a context filter, not an execution trigger. The level matters only if it is still live in the current auction, which is validated through DOM and price response."*
> Source: Jewraj Microstructure & Orderflow

**Tags:** `#orderflow` `#heatmap` `#liquidity` `#historical`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/DOM (Depth of Market)]] · [[Orderflow/Footprint Chart]] · [[Orderflow/Volume Profile]] · [[Lectures/Phase-4-Order-Flow/L16 - Market Microstructure]]

---

## What the Heatmap Is

The heatmap is a **visual representation of the limit order book's historical state** — displaying where liquidity was present over time. Unlike the DOM (which shows current resting orders), the heatmap provides a time-based record of where limit orders existed at each price level throughout the session.

> *"The heatmap reveals where market participants placed their limit orders historically, creating a visual 'memory' of liquidity distribution."*

---

## Color Interpretation

| Color | Meaning |
|---|---|
| Bright/Hot (Red, Orange, Yellow, White) | High liquidity zones — many limit orders were resting |
| Dark/Cold (Dark Blue, Black) | Low liquidity zones — few or no resting orders |
| Gradient transitions | How liquidity density changes across price levels |

---

## Heatmap vs DOM

| DOM | Heatmap |
|---|---|
| Shows current pending orders right now | Shows historical depth over time |
| Updates in real-time | Maintains a record of where liquidity was |
| Forward-looking: present liquidity awaiting execution | Backward-looking: past liquidity patterns |
| Dynamic snapshot of immediate supply/demand | Temporal map of liquidity evolution |

> Together: heatmap shows where liquidity *was*, DOM shows where liquidity *is*, footprint shows where liquidity *got hit*.

---

## Core Visual Elements

### Color Intensity Gradient
- Brighter = denser (more limit orders waiting to be filled)
- Darker = sparser (fewer or no limit orders)

### Horizontal Bands (Price Levels)
- **Bright horizontal bands:** Sustained liquidity provision at that level — consistent support/resistance
- **Dark horizontal bands:** Price rarely attracted resting orders — price passes through quickly

### Vertical Columns (Time Slices)
- Each column = state of the order book at a single point in time
- Wide vertical distribution = order book changes often
- Concentrated vertical = orders concentrated at a specific level

### Volume Shelves and Drop-offs
The edge of bright levels — where high liquidity transitions to low liquidity:
- **Clear boundaries:** Stark transition — exactly where market was/wasn't willing to provide liquidity
- **Fade boundaries:** Gradual transition — indecision in market structure

> *"Think of volume shelves as 'one-time-thick' price levels. On one side: abundant liquidity. On the other: discarded liquidity."*

---

## Key Patterns

### Signal Levels
Persistent bright zones across multiple time slices = significant price areas commanding significant liquidity.

### Liquidity Walls
Multiple adjacent price levels each maintaining persistent liquidity. Align with DOM when price approaches. Price tends to struggle through these areas.

### Blank Prints and Voids
Isolated bright spots with dark zones on either side. May indicate:
- Brief flashes (spoofing or non-commitment)
- Short-lived orders placed and quickly canceled

### Liquidity Migration Patterns
Gradual movement of bright zones over time reveals directional bias:
- **Upward migration:** Liquidity moving to higher price zones → bullish
- **Downward migration:** Liquidity moving to lower price zones → bearish

> *"Liquidity migration cannot be seen in a single DOM snapshot — it requires the temporal view that only the heatmap provides."*

---

## Common Mistakes

**Pitfall 1: Confusing historical depth with current depth.** The heatmap shows what *was* — not what *is*. Always confirm brightness with DOM.

**Pitfall 2: Ignoring absolute vs relative scaling.** Different sessions adjust contrast differently. Know your baseline.

**Pitfall 3: Overweighting aged bright zones.** A bright zone from 4 hours ago may no longer be relevant. Discount time decay.

**Pitfall 4: Treating isolated spikes as structure.** Single-time isolated spikes ≠ repeated bright zones spanning many time slices.

**Pitfall 5: Not accounting for data feed quality.** Different feed types (MBP vs MBO) produce different heatmap quality.

**Pitfall 7: Assuming all bright zones will hold.** When price returns to a previously bright zone → watch for DOM confirmation and price reaction. The heatmap tells you where liquidity *patterns likely sit*, not where they will *certainly hold*.

---

## Practical Use

The heatmap answers three questions:
1. **Where are the liquidity shelves?** — Persistent bright horizontal bands
2. **Is liquidity migrating?** — Direction of movement reveals trend bias
3. **Is a level persistent or just a one-off flash?** — Multiple time slices vs. isolated spike

Combine with DOM and price response for confirmation. Never use heatmap as a standalone execution trigger.

---

## Connections

| Concept | Link |
|---|---|
| Current liquidity (DOM) | [[Orderflow/DOM (Depth of Market)]] |
| Executed flow (footprint) | [[Orderflow/Footprint Chart]] |
| Microstructure fragmentation | [[Microstructure/R5 Fragmentation]] |
| Spoofing identification | [[Microstructure/R5 Fragmentation]] |
| Lecture context | [[Lectures/Phase-4-Order-Flow/L16 - Market Microstructure]] |
