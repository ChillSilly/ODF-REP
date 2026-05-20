# L16 — Market Microstructure

> **Lecture 16 of 27 — Phase 4: Order Flow**
> Before you can read the tape, you must understand the architecture of the market itself — the order book, how orders interact, and why price moves the way it does tick by tick.

---

# PART 1 — THEORY

## 1.1 The Limit Order Book

The **Limit Order Book (LOB)** is the real-time queue of all outstanding limit orders at every price level. It is the mechanism through which all price discovery occurs in futures markets.

**Structure:**
```
ASK SIDE (sellers)
5,245.00  |  [25 contracts]    ← Best ask (lowest offer)
5,244.75  |  [18 contracts]
5,244.50  |  [42 contracts]

── SPREAD (5,244.75 − 5,244.50 = 0.25 pts = $12.50) ──

5,244.50  |  [67 contracts]    ← Best bid (highest buy offer)
5,244.25  |  [31 contracts]
5,244.00  |  [88 contracts]
BID SIDE (buyers)
```

**Key components:**
- **Best bid:** Highest price someone is willing to pay
- **Best ask:** Lowest price someone is willing to sell
- **Spread:** The gap between them (your transaction cost)
- **Depth:** Total volume available at each level
- **Queue position:** Earlier limit orders have priority at the same price

---

## 1.2 Market Orders vs Limit Orders — The Aggressor/Passive Distinction

**Market orders (aggressive):** Execute immediately at the best available price. They *consume* existing liquidity. They move the price.

**Limit orders (passive):** Wait at a specified price. They *provide* liquidity. They don't move the price — they are the price.

**The fundamental flow mechanic:**
- When a large market order hits the ask: aggressive buying → price moves up
- When a large market order hits the bid: aggressive selling → price moves down
- The speed and size of market orders relative to limit order depth determines how far price moves per unit of volume

**Why this matters:** Your entire footprint and delta analysis is built on classifying volume as aggressive buying (hit the ask) or aggressive selling (hit the bid). Delta = aggressive buys − aggressive sells.

---

## 1.3 Order Flow Toxicity — VPIN

**VPIN (Volume-Synchronized Probability of Informed Trading)** measures the proportion of volume that comes from informed (non-random) traders:

```
VPIN = |V_buy − V_sell| / (V_buy + V_sell)
```

- High VPIN (> 0.5): Large imbalance between buy and sell aggression. Informed traders dominating. Market makers widen spreads and pull back.
- Low VPIN (< 0.2): Balanced flow. Noise trading dominant. Tight spreads.

**The practical implication:**
When VPIN spikes, it signals informed order flow — someone knows something and is acting. This is not coincidentally the same formula as the imbalance ratio in footprint charts. High imbalance = high information content = potential directional signal.

**VPIN as a liquidity warning:** Market makers monitor VPIN in real time. When VPIN rises, they pull quotes, widen spreads, and reduce depth. This is the mechanism behind liquidity fragmentation during informed flow events.

See: [[Microstructure/R3 Orderflow Heterogeneity]] · [[Microstructure/R5 Fragmentation]]

---

## 1.4 The Five Microstructure Regimes (Your Vault Framework)

Your existing vault identifies five exploitable microstructure regimes. This lecture fills them in mechanically:

**R1 — Dealer Gamma Constraint:**
Dealers' gamma obligations create systematic buy/sell pressure. In positive GEX → suppression. In negative GEX → amplification. The regime is readable via GEX levels.

**R2 — Spread Expansion:**
When bid-ask spreads widen significantly vs. recent average → early warning of volatility expansion. Dealers are pricing in higher risk. This precedes large moves.

**R3 — Order Flow Heterogeneity:**
When buy and sell aggression are clearly unequal (high imbalance/VPIN) → informed flow. Price will follow the direction of aggression.

**R4 — Market Impact:**
Large orders have instantaneous impact (moves price immediately) and decayed impact (price reverts partially after the order is filled). Understanding this prevents you from chasing moves created by single large orders.

**R5 — Fragmentation:**
When HFTs and dealers pull quotes, the visible book becomes misleading. Apparent depth disappears on execution. This is the regime where spoofing and layering are most damaging to retail traders.

See: [[Microstructure/Microstructure Overview]] · [[Microstructure/R1 Dealer Gamma Constraint]] through [[Microstructure/R5 Fragmentation]]

---

## 1.5 Spoofing and Layering

**Spoofing:** Placing large limit orders with no intent to execute them, to create a false impression of supply or demand, then cancelling before they're hit.

**How to spot it:**
- Large bid appears → price moves toward it → bid is cancelled before it gets hit
- The "phantom" order was placed to attract buyers; when they arrived, it disappeared
- Price then falls — the spoofer sold into the buyers they attracted

**Layering:** Multiple large orders placed at different price levels, all of which are cancelled as price approaches. Creates the appearance of deep support or resistance.

**Your protection:**
- Never make trading decisions solely based on DOM size
- Require price to actually execute near the large order before using it as a reference
- Watch for orders that appear and disappear without execution — they're manipulation, not information

See: [[Xhengo/DOM Reviews]] · [[Institutional Behaviour/Order Manipulation]]

---

## 1.6 The Spread as a Regime Indicator

**R2 from your vault:** Spread expansion is an early warning system.

Normal ES spread: 0.25 points (1 tick, $12.50)
Elevated ES spread: 0.50–1.00 points
Crisis spread: > 1.00 point

**When spreads widen:**
- Market makers are pricing in higher adverse selection risk
- Either VPIN has spiked (informed flow detected) or volatility is expected to spike
- Being a buyer or seller in this environment means you're paying more to transact

**Practical rule:** If ES spread is consistently wider than 1 tick during your intended trade window → the market is telling you something is wrong. Do not enter new positions. Wait for spread normalization.

---

# PART 2 — PRACTICE

## 2.1 DOM Reading Framework

The DOM (Depth of Market / Level 2) shows the live order book. Read it with these filters:

**Genuine large orders (trust):**
- Orders that *don't move* when price approaches
- Orders that get partially filled and remain
- Orders that appear *before* a directional move (not in response to it)

**Suspicious orders (question):**
- Orders that cancel before price reaches them
- Orders that appear simultaneously on both sides at similar size (creating false balance)
- Orders that pulse in and out rhythmically without execution

**The DOM absorption read:**
Large resting bid that absorbs aggressive selling without price breaking lower → absorption → bullish signal. Large resting offer that absorbs aggressive buying without price breaking higher → absorption → bearish signal.

This is the core of the Xhengo DOM review methodology.

See: [[Xhengo/DOM Reviews]]

---

## 2.2 Spread Watch During Trading

Every session, monitor ES spread in real time:
```
Normal (1 tick = 0.25 pts): Green light, normal sizing
Elevated (2 ticks = 0.50 pts): Yellow light, reduce size 30%
Wide (4+ ticks = 1.00+ pts): Red light, no new entries, close if in
```

Wide spreads appear during:
- First 60 seconds of the cash open
- During data releases
- During flash crashes or sudden vol spikes
- During roll week (front month thinning)

---

## 2.3 The Aggression Test

Before entering any intraday trade, run a 60-second aggression test:

**Observe the last 20 prints on the tape:**
- If >70% are aggressive buys (trades executing at the ask): buyer aggression dominant → long bias
- If >70% are aggressive sells (trades executing at the bid): seller aggression dominant → short bias
- If mixed: no clear aggression → do not force a directional trade

This is the raw signal that delta and CVD tools formalize. Doing it by eye trains the intuition.

---

## 2.4 Identifying the R5 Fragmentation Regime

When you're seeing whipsaw moves that reverse immediately and your DOM keeps showing orders that cancel:

**Checklist:**
- [ ] VIX rising rapidly (liquidity providers are leaving)
- [ ] Spread widening vs morning average
- [ ] DOM depth dropping (fewer contracts visible at each level)
- [ ] Fills taking longer or experiencing slippage

**Response:** Stop trading aggressively. Switch to limit orders only. Reduce size by 50%. Wait for spread to normalize before resuming.

The worst losses in futures come from trying to trade in the fragmentation regime. Recognize it and stand aside.

---

## Connections

| Concept | Links |
|---|---|
| DOM reading | [[Xhengo/DOM Reviews]] · [[Orderflow/Footprint Chart]] |
| VPIN / toxicity | [[Microstructure/R3 Orderflow Heterogeneity]] · [[Concepts/Adverse Selection]] |
| Spread as warning | [[Microstructure/R2 Spread Expansion]] · [[Concepts/Bid Ask Spread]] |
| GEX → R1 | [[Microstructure/R1 Dealer Gamma Constraint]] · [[Concepts/GEX]] |
| Spoofing | [[Institutional Behaviour/Order Manipulation]] · [[Flows/HFT Spoofing Flow]] |

---

## Tags
`#lecture` `#phase-4` `#orderflow` `#microstructure` `#DOM` `#LOB` `#VPIN` `#spread` `#aggression` `#spoofing`

*Next → [[L17 - Footprint Charts and VAP]]*
*Previous → [[L15 - OPEX Mechanics]]*
