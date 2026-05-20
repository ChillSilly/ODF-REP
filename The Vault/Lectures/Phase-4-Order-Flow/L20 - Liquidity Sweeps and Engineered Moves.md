# L20 — Liquidity: Sweeps, Stops, and Engineered Moves

> **Lecture 20 of 27 — Phase 4: Order Flow**
> Every significant move in futures begins with a liquidity grab. Understanding where stops cluster, how institutional players engineer sweeps, and how to avoid being the liquidity — is the difference between consistently losing and consistently winning.

---

# PART 1 — THEORY

## 1.1 What Liquidity Actually Means

**Liquidity** in microstructure terms is the ease with which large orders can be executed without moving price adversely. But in the context of institutional order flow, it has a more specific meaning:

**Liquidity pools:** Concentrations of resting orders (limit orders to buy or sell) at predictable price levels. The most common locations:
- Below swing lows (retail stop-losses on long positions)
- Above swing highs (retail stop-losses on short positions)
- At round numbers (psychological levels: 5,000, 5,100, 5,200 in ES)
- Below/above previous day's high or low
- At prior week's high/low
- Below/above prior VPOC or VAL/VAH

**Why institutional players need this liquidity:** A large fund cannot simply place a market order for 5,000 ES contracts — the market impact would be enormous. Instead, they use techniques to access resting orders at specific levels, engineering conditions where opposing resting limit orders are available to fill them.

---

## 1.2 Stop Hunts — The Mechanism

A **stop hunt** is a deliberate engineered move to trigger clusters of stop-loss orders, creating the liquidity needed for large positions to be entered or exited.

**The mechanic:**
1. Institutional player identifies where retail stop-losses cluster (below a key low, above a key high)
2. They engineer a move through that level — using their own orders plus the mechanical delta of dealer hedging
3. Stop-losses trigger, creating a surge of market orders (sells if stops are hit below, buys if above)
4. The institutional player absorbs this surge of orders, filling their large desired position
5. Price reverses immediately after the liquidity is consumed

**The signature on the chart:**
- Price breaks a key level that "should" hold
- Volume spikes sharply on the break
- Price reverses *immediately* after the break with no follow-through
- The candle has a long wick or creates a false break pattern

This is the "wick through and close back above" pattern that SMC (Smart Money Concepts) traders call an "order block" or "liquidity sweep."

See: [[Mechanisms/Stop Hunt Mechanism]] · [[Flows/Stop Hunt Flow]] · [[Institutional Behaviour/Stop Hunting]]

---

## 1.3 Draw on Liquidity (DOL)

The **Draw on Liquidity** concept: price is always moving *toward* the next significant pool of liquidity. The question is not "where is price going?" but "where is the nearest significant liquidity pool?"

**Identifying DOL targets:**
- Equal highs: Two or more highs at approximately the same level → large cluster of stops above → price will be drawn there
- Equal lows: Same concept downward
- Previous week's high/low: Well-known reference level, large stop cluster
- Previous month's high/low: Even larger stop cluster
- Round numbers: 5,000, 5,100, 5,200 in ES → large psychological clusters
- Prior OPEX pin level: Dealers exiting hedges → liquidity release

**The DOL trade:** You don't predict where price "should" go by fundamentals alone. You identify where the nearest significant liquidity pool is, confirm the macro narrative supports movement in that direction, and position for the move toward that pool.

See: [[Orderflow-Concepts/Draw on Liquidity DOL]]

---

## 1.4 How Institutional Players Execute Without Moving Market

**TWAP (Time-Weighted Average Price):** Splitting a large order into smaller pieces executed over a period of time, aiming to achieve the average price over the time window. Spreads impact across many transactions.

**VWAP execution:** Executing in proportion to volume at each price level. Achieves approximately the volume-weighted average price without single large prints.

**Iceberg orders:** Only a small portion of the order is visible in the DOM. As the visible portion is filled, the rest replaces it automatically. What looks like a 50-contract order is actually 5,000 contracts.

**Stop-hunt-facilitated fills:** Engineer the move that creates the liquidity, then absorb it. More sophisticated than TWAP — achieves better fills by creating the conditions for large supply/demand to appear organically.

**Why this matters:** When you see price break a "key level" and immediately reverse, you're watching institutional facilitation, not a failed breakout. The smart move is to enter in the direction of the reversal, not continue in the direction of the break.

---

## 1.5 The SMT Divergence Signal

From your vault: **SMT (Smart Money Technique) Divergence** occurs when correlated instruments fail to confirm a price extreme.

**ES and NQ are correlated.** When:
- ES makes a new low but NQ does NOT make a new low → divergence
- The new low in ES was a liquidity sweep (stop hunt) not supported by broad market weakness
- NQ's refusal to confirm tells you the move was engineered, not genuine

**The SMT signal:**
- ES sweeps below the prior session low
- NQ holds its prior session low
- ES immediately reverses with volume
→ Long ES, targeting at least the prior session low from above (now support)

This is your correlated-instrument liquidity detection tool. The divergence is the fingerprint that a sweep occurred.

See: [[Technical-Analysis/SMT Divergence]] · [[Setups/SMT Bottom Tick]]

---

## 1.6 Liquidity Voids and Inefficiencies

When price moves very rapidly through a level with minimal volume, it creates a **liquidity void** — an area where the auction was incomplete. Price frequently returns to these zones to "repair" the inefficiency.

**Identifying liquidity voids:**
- LVN (Low Volume Node) in the volume profile
- Gaps in overnight sessions
- Vertical price moves with minimal footprint activity (few TPOs)
- Single prints in Market Profile

**The re-test mechanic:** Price is drawn back to liquidity voids because:
1. Traders who wanted to transact in that zone didn't get the chance (they were skipped)
2. Institutional players with partial fills want to complete their orders at the void level
3. The vacuum of orders creates a natural price attractor

---

# PART 2 — PRACTICE

## 2.1 Mapping Liquidity Pools Before the Session

Every pre-session, mark these levels on your chart:

**High-priority liquidity pools:**
```
□ Prior week's high / low
□ Prior day's high / low
□ Prior session overnight high / low
□ Equal highs (2+ touches at same level)
□ Equal lows (2+ touches at same level)
□ Significant round numbers within 1% of current price
□ Prior OPEX pin level
```

These are your **DOL magnets**. Price will likely test at least one of them during the session.

---

## 2.2 The Stop Hunt Trade

**Setup (bottom tick version):**
1. Price is in a downtrend or pullback
2. You've identified equal lows or a prior swing low — large stop cluster below
3. Price approaches the cluster level
4. Volume spikes as price breaks through (stops triggering)
5. Within 1–3 bars, price reverses back above the level
6. Footprint shows absorption at the swept level (sells absorbed, CVD divergence)

**Entry:** On the close of the first bar that reverses back above the swept level
**Stop:** Below the wick low (below the sweep)
**Target:** Prior swing high or VPOC above

**The key confirmation:** The reversal bar must close *back above* the swept level. A close below means the sweep was genuine, not engineered — do not enter.

---

## 2.3 Identifying the DOL and Trading Toward It

Every day, answer: "What is the closest significant unswept liquidity pool, and which direction would we need to move to reach it?"

**Example workflow:**
- Prior week's high is at 5,280 ES, unswept (hasn't been visited this week)
- Current price: 5,245
- Macro narrative is bullish (soft landing, rate cuts anticipated)
- GEX is positive (dealers suppressing volatility, mean-reverting)
- COT shows moderate (not extreme) speculative longs

**Analysis:** DOL is above at 5,280. Macro supports upward movement. GEX supports orderly upward drift. COT not crowded. → Bias long, targeting the prior week's high liquidity pool.

**This is not prediction — it's identifying where the market must eventually go to satisfy the unswept orders sitting above.**

---

## 2.4 SMT Divergence — Execution Rules

**For the bottom tick version:**
1. ES (or the weaker instrument) makes a new session/swing low
2. NQ (or the stronger instrument) does NOT confirm → holds its low
3. The sweep in ES reverses within 1–3 bars
4. Enter long ES on the confirmation bar
5. Confirm with footprint absorption at the swept level
6. Stop below the swept low
7. Target prior swing high or VPOC

**Why NQ vs ES:**
- In risk-on environments, NQ typically leads ES (NQ makes higher highs first, higher lows first)
- A divergence where ES sweeps low but NQ doesn't means the selling was concentrated in ES (likely forced: margin calls, index rebalancing, not genuine fundamental selling)
- When the concentrated selling exhausts, ES recovers

See: [[Technical-Analysis/SMT Divergence]] · [[Setups/SMT Bottom Tick]] · [[Concepts/Correlated Instruments]]

---

## Connections

| Concept | Links |
|---|---|
| Stop hunt mechanism | [[Mechanisms/Stop Hunt Mechanism]] · [[Institutional Behaviour/Stop Hunting]] |
| Draw on liquidity | [[Orderflow-Concepts/Draw on Liquidity DOL]] · [[Concepts/Liquidity]] |
| SMT divergence | [[Technical-Analysis/SMT Divergence]] · [[Setups/SMT Bottom Tick]] |
| Liquidity voids | [[Profile-Levels/Low Volume Node LVN]] · [[Profile-Levels/Single Prints]] |
| Absorption at swept level | [[Orderflow-Concepts/Absorption]] · [[Orderflow/CVD Divergence]] |

---

## Tags
`#lecture` `#phase-4` `#orderflow` `#liquidity` `#stop-hunt` `#draw-on-liquidity` `#SMT` `#sweeps` `#institutional-flow`

*Next → [[L21 - DOM and Tape Reading]]*
*Previous → [[L19 - COT Report]]*
