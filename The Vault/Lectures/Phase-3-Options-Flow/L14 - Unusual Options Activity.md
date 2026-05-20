# L14 — Unusual Options Activity

> **Lecture 14 of 27 — Phase 3: Options Flow**
> Unusual options activity is institutional intent made visible. When large money moves fast through the options market, it leaves a fingerprint. This lecture teaches you to read it.

---

# PART 1 — THEORY

## 1.1 What Makes Activity "Unusual"

Unusual Options Activity (UOA) is defined by deviation from the statistical norm across three dimensions:

**1. Volume/OI ratio:**
```
Ratio = Today's Volume / Open Interest
> 2.0 = Unusual
> 5.0 = Highly unusual
> 10.0 = Extreme
```

**2. Premium size:** Options costing $100k+ in total premium. Small traders don't write $500k checks for options. When premium is large and the trade is directional (OTM calls or puts), it signals institutional intent.

**3. Timing and clustering:** Multiple large orders at the same strike over a short window. A single large trade can be a hedge. Three in a row is conviction.

---

## 1.2 Sweeps — The Institutional Footprint

A **sweep order** is routed across multiple exchanges simultaneously to ensure immediate, complete execution at the best available prices. The priority is speed over price — which means the buyer believes being fast matters more than saving a few cents.

Retail traders don't need sweeps. They have time. Institutions and informed traders use sweeps when they believe they have an edge that is *time-limited*.

**Why sweeps exist:**
- The trader expects price to move soon and wants full position before it does
- They don't want partial fills that leave them exposed with an incomplete position
- They want to force positioning rather than telegraph their intent via limit orders

**One sweep = ambiguous** (could be a hedge, a speculative probe, a volatility trade)

**Repeated sweeps at the same strike in the same direction = conviction.** The Repeated Sweeps document makes this clear: when the same strike is hit multiple times aggressively, it eliminates the noise. This is directional intent.

---

## 1.3 The Dealer Hedging Consequence of Sweeps

From the Repeated Sweeps material: sweeps don't just signal institutional intent — they *cause* price movement through dealer hedging.

When calls are swept:
1. Institutions buy calls → dealers sell them → dealers are now short gamma
2. Dealers delta-hedge by buying the underlying (futures)
3. Repeated sweeps force dealers to keep adding futures
4. This mechanical buying creates the very move the institution was anticipating

```
Calls swept → Dealers buy futures → Price rises → 
Delta increases → Dealers buy more futures → Loop
```

This is the **gamma feedback loop**. It's why strong moves often start *after* sweeps, not before. The sweep is the trigger; dealer hedging is the engine.

---

## 1.4 Dark Pools and Block Trades

**Dark pools** are private trading venues where large institutional orders are executed without displaying to the public order book. They exist to prevent front-running of large orders.

**Why dark pools matter for options flow:**
- Large institutional positions are often built in dark pools first (equity legs of option trades)
- When you see a large OI build at a specific options strike simultaneously with dark pool prints in the underlying → coordinated positioning
- Dark pool prints that cluster at specific price levels create de facto support/resistance that isn't visible in the standard order book

**Block trades** are large options trades (above exchange minimum block size thresholds) executed bilaterally — dealer-to-institution — outside the exchange's electronic book. They show up in the tape but were negotiated privately.

Block trades tell you:
- The institution didn't want to move the market with the order
- The trade is large enough to require negotiation
- It often represents hedging of a large existing equity or futures position

**Block trade interpretation:**
- Block purchase of puts on a stock/index → institution hedging a large long position → near-term caution
- Block purchase of calls → institution adding upside exposure → bullish thesis
- Block purchase of straddles/strangles → institution expecting big move, direction uncertain (event-driven)

---

## 1.5 Reading Flow in Aggregate — Netflow

**Netflow** is the aggregate directional bias of options premium flowing on a given day:
```
Netflow = Premium of calls bought − Premium of puts bought
```

Positive netflow → more call premium purchased → net bullish institutional intent

Negative netflow → more put premium purchased → net bearish institutional intent

**The hierarchy of signals:**
1. Netflow alone = weak signal (could be hedging)
2. Netflow + sweep confirmation = moderate signal
3. Netflow + repeated sweeps at high-OI strike + price confirming = strong signal
4. All of the above + CVD divergence turning at the level = actionable setup

The Sweeps document explicitly states: "The highest quality setups happen when netflow is clearly directional, repeated sweeps confirm intent, price is near a key open-interest strike, and structure supports the move. That's when moves become asymmetric."

---

## 1.6 What UOA Cannot Tell You

**It cannot tell you the intent.** A large put purchase could be a new bearish bet or a hedge against an existing long equity position. Context from the broader options picture (which strikes, what expiry, what size relative to existing OI) helps disambiguate.

**It cannot tell you the timing.** Institutions often buy options weeks before they expect the move. Early UOA signals that don't immediately produce a move can still be valid — they may be early.

**It can be manufactured.** "Dark pool manipulation" and "tape painting" exist. A sophisticated actor can generate sweep-like signals to front-run retail traders following the flow. Always require price confirmation before acting.

---

# PART 2 — PRACTICE

## 2.1 The UOA Scan Workflow

**Tools:**
- Unusual Whales (unusualwhales.com): real-time options flow
- Market Chameleon: aggregated unusual activity
- Quiverquant (quiverquant.com): congressional trading + options flow combined

**Daily scan (10 minutes, pre-market or during lunch break):**

1. Filter for: volume/OI > 3, premium > $50k, 0–30 DTE, OTM options
2. Sort by total premium (largest first)
3. Identify any clustering: same ticker, same strike, same direction, multiple times
4. Cross-reference with existing OI at that strike
5. Check price action: is the underlying near the strike? Is there a catalyst?

**Record any identified setups in your [[Trading-Journal/Journal Index]]**

---

## 2.2 The Sweep Confirmation Framework

Apply this 5-step filter before trading any UOA signal:

```
Step 1: Is it a sweep? (Check execution type — crosses multiple exchanges)
Step 2: Is it repeated? (Same strike, same direction, 2+ times in same session)
Step 3: Is the strike significant? (High OI already? Near current price?)
Step 4: Does netflow align? (Is the overall day's flow in the same direction?)
Step 5: Does price confirm? (Is price holding above key support / breaking resistance?)
```

All 5: A-grade setup. Trade with full sizing.
4 of 5: B-grade. Trade with 60% sizing.
3 or fewer: Do not trade. Wait for more confirmation.

---

## 2.3 The Sweep → Futures Trade Translation

When you identify a confirmed UOA signal, translate it into a futures trade:

**Bullish sweep signal (repeated call buying):**
- The sweep forces dealers to buy futures (gamma feedback loop)
- Your entry: buy futures when price breaks above the strike being swept or holds above key VWAP/VPOC support
- Stop: below the key structural low that would invalidate the sweep thesis
- Target: the call wall + the next structural resistance level

**Bearish sweep signal (repeated put buying):**
- The sweep forces dealers to sell futures
- Your entry: short futures on break below the key structural support near the put strike
- Stop: above the structural high that would invalidate the thesis
- Target: the put wall + next structural support level

**Timing note:** Sweeps often precede moves by 30 minutes to 2 hours. Don't chase the immediate reaction. Wait for price structure confirmation.

---

## 2.4 Dark Pool + Options Convergence

The highest-conviction UOA setup combines dark pool prints with options flow:

**Bullish setup:**
1. Large dark pool buys appear at a specific price level (clustered prints)
2. Simultaneously, call sweeps hit the nearest OTM strike
3. Price holds above the dark pool print level on any retest
4. Netflow is strongly positive

This combination means: an institution built an equity position in the dark, then bought call protection/leverage above it. They expect price to go higher and are positioned in both legs.

**Entry:** On the first pullback to the dark pool print level that holds
**Stop:** Below the dark pool level
**Target:** The call strike being swept

---

## Connections

| Concept | Links |
|---|---|
| Sweep mechanics | [[Flows/Dark Pool Flow]] · [[Flows/Stop Hunt Flow]] |
| Gamma feedback loop | [[Concepts/GEX]] · [[Concepts/Dealer Hedging]] |
| Netflow → direction | [[Orderflow/CVD Divergence]] · [[Orderflow-Concepts/Initiative Phase]] |
| UOA confirmation | [[Practice/Top Tick Setup]] · [[Execution/Entry Timing]] |
| Block trades | [[Participants/Institutions]] · [[Institutional Behaviour/Dark Pools]] |

---

## Tags
`#lecture` `#phase-3` `#options` `#UOA` `#sweeps` `#dark-pools` `#netflow` `#institutional-flow` `#unusual-activity`

*Next → [[L15 - OPEX Mechanics]]*
*Previous → [[L13 - IV and Volatility]]*
