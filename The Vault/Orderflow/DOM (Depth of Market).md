# DOM — Depth of Market

> *"DOM is best used to evaluate the quality of liquidity at the top of book and how that liquidity behaves as price approaches a reference. The informational edge is in response: does liquidity hold, absorb, and stabilize price, or does it vanish and allow fast traversal?"*
> Source: Jewraj Microstructure & Orderflow

**Tags:** `#orderflow` `#DOM` `#liquidity` `#execution`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/Tape (Time and Sales)]] · [[Orderflow/Heatmap]] · [[Orderflow/Footprint Chart]] · [[Microstructure/R5 Fragmentation]] · [[Lectures/Phase-4-Order-Flow/L21 - DOM and Tape Reading]]

---

## What the DOM Is

The Depth of Market (DOM), also known as the order book or Level II, is a real-time display of all active buy and sell orders at different price levels. It shows how many contracts traders are willing to buy (bids) or sell (asks) at each price — revealing market liquidity and depth.

**Critical component:** DOM is not just passive limit orders — it's equally about watching aggressive market orders hitting the bid and ask in real time. The combination of what's *waiting* (limit orders) and what's *executing* (market orders) tells you who is in control.

---

## Order Book Structure

```
ASK SIDE (sellers)
5,245.00  |  [25 contracts]    ← Best ask (lowest offer)
5,244.75  |  [18 contracts]
5,244.50  |  [42 contracts]
─────────────────────────────── SPREAD
5,244.50  |  [67 contracts]    ← Best bid (highest buy offer)
5,244.25  |  [31 contracts]
5,244.00  |  [88 contracts]
BID SIDE (buyers)
```

**Key elements:**
- **Bid prices/sizes:** Highest bid = most aggressive buyer. Large bid sizes = strong buy-side liquidity
- **Ask prices/sizes:** Lowest ask = lowest price sellers accept. Large ask sizes = heavy sell-side liquidity
- **Market depth:** Range of price levels and cumulative volume on each side
- **Bid-ask spread:** In liquid ES, typically 1 tick (0.25 points) during active hours

---

## What DOM Tells You

- Anticipate price movements before they occur
- Refine entry and exit timing to the tick level
- Spot manipulation and false liquidity (spoofing)
- Gauge immediate supply and demand concentration
- Read aggression by watching market orders hit the bid/ask
- Distinguish initiative vs responsive order flow

> *"DOM shows you the intent behind the price — revealing the actions of participants that eventually result in price movement. It's like seeing the market's heartbeat in real time."*

---

## DOM vs Price Charts

| DOM | Price Chart |
|---|---|
| Shows current pending orders | Shows historical price action |
| Displays intention to trade | Displays completed transactions |
| Provides liquidity information | Provides technical patterns |
| Leads ahead of price movement | Lags behind market action |

---

## Key DOM Signals

### Absorption
Large resting orders absorb many market orders without price moving much. Big player absorbing supply or demand.

**Telltale sign:** A large number of market trades printing at a price but price doesn't advance, even after sell orders were absorbed by a strong passive buyer at the level.

### Stacking (Layering)
Many large orders added (layered) on one side, creating a "wall."
- Additional 300, 400, 500 contracts appearing on bid side = buyers increasingly eager
- Can indicate genuine support building OR spoofing

### Spoofing and Order Cancellation
**Spoofer behaviour:**
- Large order appears out of nowhere
- Disappears as price approaches
- Repeated "place and cancel" patterns
- Series of big orders that keep moving away from the actual market

**Key:** Look at whether stacks hold or vanish as price approaches. If they vanish → spoofing. If they absorb → genuine.

---

## Interpreting DOM for Market Intent

**Support/Resistance:** Large clusters of buy orders at a price = potential support. Stack of sell orders = resistance.

**Absorption:** When a large order absorbs heavy flow without moving → strong hands at that level. Often iceberg orders (large order divided into smaller disclosed chunks).

**Flipping:** Large bid suddenly becomes large ask → the former buyer has turned seller → support became resistance → directional signal.

---

## DOM Mastery Levels

### Beginner
- Learn the layout (which side is bid/ask, how orders are arranged)
- Observe and correlate DOM movements with price action
- Focus on one signal at a time (start with large block orders)
- Use simulation/replay

### Advanced
- Advanced pattern recognition in combined DOM + execution context
- Delayed absorption identification
- Reversed entry liquidity detection
- DOM used in conjunction with footprint and volume profiles

---

## DOM + Heatmap + Tape Integration

| Tool | What It Shows |
|---|---|
| [[Orderflow/Heatmap]] | Where liquidity *was* (historical) |
| DOM | Where liquidity *is* (current) |
| [[Orderflow/Tape (Time and Sales)]] | Where liquidity *got hit* (executed) |

Together: complete liquidity picture across time.

---

## When to Ignore the DOM

- First 60 seconds after data releases (algos dominate)
- During OPEX Friday open (AM settlement distortion)
- When VIX is spiking rapidly (liquidity providers leave)
- During news bombs (DOM liquidity withdraws instantly)

In these environments DOM is noise. Use higher-timeframe structure and wait for normalization.

---

## Connections

| Concept | Link |
|---|---|
| Tape complement | [[Orderflow/Tape (Time and Sales)]] |
| Historical DOM (heatmap) | [[Orderflow/Heatmap]] |
| Spoofing mechanisms | [[Microstructure/R5 Fragmentation]] |
| Spread indicator | [[Microstructure/R2 Spread Expansion]] |
| Lecture | [[Lectures/Phase-4-Order-Flow/L21 - DOM and Tape Reading]] |
| Xhengo DOM reviews | DOM absorption and spoofing identification |
