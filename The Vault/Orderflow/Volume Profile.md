# Volume Profile

> *"Volume Profile is behavioral, not mechanical. HVNs represent zones of past agreement; LVNs represent zones of past disagreement or urgency."*
> Source: Jewraj Microstructure & Orderflow

**Tags:** `#orderflow` `#volume-profile` `#structure`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/AMT]] · [[Orderflow/TPO and Market Profile]] · [[Orderflow/Footprint Chart]] · [[Profile-Levels/POC]] · [[Profile-Levels/VAH]] · [[Profile-Levels/VAL]] · [[Profile-Levels/HVN]] · [[Profile-Levels/LVN]] · [[Lectures/Phase-4-Order-Flow/L17 - Footprint Charts and VAP]]

---

## The Purpose

Volume Profile is a **participation and acceptance map**. It is not support/resistance lines — it is a distribution showing where the auction conducted business and where it did not.

> Volume at Price = Participation Fingerprint

The histogram reveals where the market accepted price (heavy trade = HVN) versus rejected it (quick movement = LVN).

---

## How Volume Profiles Are Built

Three-step construction:
1. **Choose a time window** — single session, visible range, anchored range, or multiple sessions
2. **Divide price range into rows (bins)** — tick resolution or larger bin size
3. **Sum executed volume** → horizontal histogram showing volume distribution across price

**Critical:** Bin size matters. Too large → erases LVNs and blurs node chunks. Too fine → noisy. Start tick-level, incrementally increase to 2–4 tick bins.

---

## Core Reference Levels

| Level | Definition | Behavior |
|---|---|---|
| **POC** | Price with highest traded volume | Maximum acceptance, acts as magnet on future rotations |
| **Value Area (VA)** | Range containing 68% of total volume | Core acceptance zone, major trading activity |
| **VAH** | Value Area High — upper boundary | Key resistance when approached from below |
| **VAL** | Value Area Low — lower boundary | Key support when approached from above |
| **Balance Extremes** | Edges of large volume chunks | Where buyers/sellers think price is too high/too low |

---

## HVNs and LVNs — The Critical Distinction

### High Volume Nodes (HVNs)
- Local peaks where volume is concentrated
- Represent **acceptance** and "fair value" zones
- Two-sided trade occurred here — order flow balanced
- **Price slows or rotates when revisiting HVNs** — they are memory points for participation
- Use: expect friction, possible mean-reversion

### Low Volume Nodes (LVNs)
- Local valleys where relatively little volume traded
- Formed during rapid movement — "fast price"
- Represent **rejection** or unfair value zones
- **Price traverses LVNs quickly** — little resistance, gap-like behavior
- Use: expect fast moves through, treat as transition zones

---

## Volume Profile Types

### 1. Session Profiles
Aggregates volume-at-price for a defined session. Critical: separate day session from overnight. Volume and transactions are dramatically higher during primary market hours. Lumping all hours together hides structure.

### 2. Visible-Range Profiles
Calculates over what's currently visible on chart. Dynamic — recalculates as you zoom/pan. Good for exploration, not for fixed reference.

### 3. Fixed-Range & Anchored Profiles
User-chosen time span — stable and controlled. Anchored version: start at a structural pivot or event (major swing low, FOMC announcement, contract roll), extend to present.

### 4. Split Profiles
Handles multi-distribution days — avoids forcing a single bell curve on a day with two distinct value areas. Essential for double-distribution days.

---

## Balance Areas — The Most Important Concept

> *"Balance is the most important concept — more important than HVNs, VAH/VAL, or any other metric. Focus on the prominent chunks of all nodes and their edges."* — Jewraj

### Identifying Balance Areas
Look for **prominent chunks of volume** — areas where you can see clear boundaries defined by fat volume nodes on both sides.

**Multi-horizon profile setup:**
- 30-day: recent balance formation and current acceptance zones
- 84-day: slightly longer-term balance areas
- 180-day: major balance areas from the past half year
- 1-year: longest-term structural acceptance zones

### Balance Edge Properties
- **Not precise to the tick** — they represent a vicinity of a few points
- Price respects balance edges — reactions and rotations are common
- Can align with other structure features (gaps, key technical levels) → higher confluence
- **Balance gives you levels AND context** — both targets and directional framework

### The AMT Integration
When trading alongside AMT, you're always in one of three states at a balance:
1. **Seeking balance** — price moving toward a balance area
2. **Accepting balance** — price agrees and trades within it
3. **Rejecting balance** — price disagrees and moves away

---

## Volume Profile Strategies

### Mean Reversion to VPOC
Price has a probabilistic tendency to revert to the volume point of control:
```
P(reversion) = 1 − e^(−λ × |price − VPOC|)
```
Higher distance from VPOC = higher probability of reversion. Works best in balanced, rotational conditions.

### LVN Breakout
When price breaks through an LVN on strong volume and stacked imbalances → expect fast, gap-like move to the next HVN.

### HVN Mean-Reversion
Price entering an HVN → expect consolidation and rotation. Fade extremes within HVN, target POC.

---

## What Volume Profile Cannot Tell You

| Can Tell | Cannot Tell |
|---|---|
| Where market accepted trade | Whether price will return to prior POC |
| Where market rejected trade | When a breakout from value will occur |
| Where balance extremes sit | Why certain levels were accepted/rejected |
| How participation differs across sessions | Future order flow intentions |

> VP is a statistical map of past participation. It frames where friction, rotation, and acceptance are *more likely*, but auction dynamics evolve. Markets are forward-looking; VP is backward-looking.

---

## Common Mistakes (Jewraj)

1. **Session-definition error** — saying "today's profile" without specifying day-only vs full session. Non-negotiable: separate day session.
2. **Row-size errors** — using 4–8 tick bins hides LVNs. Start tick-level.
3. **Misinterpreting buy/sell volume** — TradingView uses candle direction (approximation), not true aggressor-side. Motivewave/professional platforms use bid/ask classification (true delta).
4. **Overfitting "magnet" narratives** — "price will return to yesterday's POC" is deterministic thinking. Use for hypothesis generation and risk framing, not certainty.

---

## Complete Process

1. Run multiple volume profile timeframes (D1, W1, 30-day, 1-year)
2. Identify prominent balance areas (fronts of volume between nodes)
3. Mark the edges of those balances
4. Trade reactions at the edges
5. Use balance areas for directional context and targets
6. Integrate with key concepts (overlapping balances, identifying key balance)

---

## Connections

| Concept | Link |
|---|---|
| AMT foundation | [[Orderflow/AMT]] |
| Profile levels | [[Profile-Levels/POC]] · [[Profile-Levels/VAH]] · [[Profile-Levels/VAL]] · [[Profile-Levels/HVN]] · [[Profile-Levels/LVN]] |
| Footprint confirmation | [[Orderflow/Footprint Chart]] |
| TPO time component | [[Orderflow/TPO and Market Profile]] |
| Lecture | [[Lectures/Phase-4-Order-Flow/L17 - Footprint Charts and VAP]] · [[Lectures/Phase-4-Order-Flow/L18 - Market Profile and AMT]] |
