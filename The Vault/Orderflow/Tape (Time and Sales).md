# Tape (Time and Sales)

> *"Tape is only high-signal when interpreted with location. Aggression that produces progress is continuation. Aggression that fails to move price is usually absorption, exhaustion, or a stronger counterparty."*
> Source: Jewraj Microstructure & Orderflow

**Tags:** `#orderflow` `#tape` `#execution` `#aggression`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/DOM (Depth of Market)]] · [[Orderflow/Footprint Chart]] · [[Orderflow/Delta (Bid-Ask Delta)]] · [[Lectures/Phase-4-Order-Flow/L21 - DOM and Tape Reading]]

---

## What the Tape Is

The Time & Sales is a high-resolution **execution feed**. It shows every trade that executed, in real time, in order. Each print contains: timestamp, execution price, quantity, and side (bid/ask if available).

**Key distinction:** The tape is NOT the order book. The order book shows resting orders. The tape shows **executed trades** — orders that were actually matched and filled.

The tape is the closest you get to seeing real-time market aggression.

---

## Reading the Tape: Bullish vs Bearish

| Bullish Tape | Bearish Tape |
|---|---|
| Strong ask-side volume dominance | Strong bid-side volume dominance |
| Buying prints larger than selling | Selling prints larger than buying |
| Prints moving price higher | Prints moving price lower |
| Price accumulation at multiple levels | Distribution across multiple levels |

---

## Key Patterns

### Momentum / Velocity Pattern
Aggressive single-direction pressure through consecutive price levels.
- Burst: `bid>ask = 30+100+150+200` — 500 cumulative contracts pushing through price
- Significant volume on one side moving through levels
- Price keeps advancing in the same direction

**Signal:** Continuation — trade with the momentum direction

### Exhaustion Pattern
Tape hits a price where momentum is present but absorbed — concentration of active prints at a single level with no follow-through.
- Price stays at a level for multiple large prints
- No advancement despite heavy volume
- Print direction changes or balances

**Signal:** Reversal candidate — especially at structural levels

### Absorption Pattern
Price moves to a level where prints actively occur through large passive liquidity.
- Multiple large ask-side entries at the same price
- Aggressive volume but price stalls (non-progress)
- Suggests passive accumulation — a large buyer absorbing sellers

**Signal:** Strong hands at this level — reversal or consolidation ahead

### Iceberg / Passive Large Orders
Hidden large interest identified by small consistent prints:
- Single prints small (20–50 contracts) appearing consistently at many price levels
- Same size repeated predictably
- Potential hidden large interest at these levels

**Signal:** Significant institutional position being built/defended

### Sweep vs Absorption
Sweep: aggressive buy orders push rapidly through multiple levels → then price fades when sweep exhausts.
- Sweep signature: large prints in rapid succession through multiple price levels, size accelerating

**Signal:** If no follow-through after the sweep → fade the sweep

### Size Momentum (Speed vs Price)
- **Tape momentum:** Size increases at a price level as print size grows → aggressive buying consuming liquidity
- **Tape deceleration:** Size decreases as tape slows → possible absorption or fading

---

## The Key Reading Principle

> *"Read prints not as isolated events, but as sequences and conversations between buyers and sellers."*

Patterns need confluence — prints alone rarely mean enough. Always read tape in context of:
- **Structure** (where is price relative to VAH, VAL, POC, VWAP?)
- **Prior participation** (is this level an HVN or LVN?)
- **Delta context** (is CVD confirming or diverging?)

---

## Tape and DOM Integration

| DOM | Tape |
|---|---|
| Shows potential resting orders (passive intent) | Shows actual executed trades (aggression) |
| Confirms whether support/resistance are held | Confirms whether aggression is occurring |
| Often more stable when reading size | Often faster, more immediate |

> "The DOM shows the 'what', while the tape provides the 'who'. When both align — DOM shows large resting orders and tape shows aggression at that level — you're much more confident."

---

## Common Misinterpretations

**Pitfall 1: Overtrading** — reacting to every print without reading the complete context.

**Pitfall 2: Overreaction to single large prints** — individual large orders can be hedges, reversals, or noise. Require pattern, not just size.

**Pitfall 3: Confusing pace/momentum with direction** — heavy buying tape ≠ automatically long. Check structure first.

**Pitfall 4: Ignoring size relativity** — "large" is always relative to this market right now. Is a 200-lot print large or normal for this session?

---

## Connections

| Concept | Link |
|---|---|
| Footprint (organized tape) | [[Orderflow/Footprint Chart]] |
| DOM complement | [[Orderflow/DOM (Depth of Market)]] |
| Delta derivation | [[Orderflow/Delta (Bid-Ask Delta)]] |
| Absorption concept | [[Concepts/Orderflow]] |
| Real-time reading | [[Lectures/Phase-4-Order-Flow/L21 - DOM and Tape Reading]] |
