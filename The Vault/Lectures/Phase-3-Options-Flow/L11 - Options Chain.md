# L11 — Reading the Options Chain

> **Lecture 11 of 27 — Phase 3: Options Flow**
> The options chain is the market's balance sheet of positioned bets. Reading it tells you where fear lives, where conviction lives, and where price will be attracted or repelled.

---

# PART 1 — THEORY

## 1.1 The Anatomy of an Options Chain

An options chain displays all available options for a given underlying at every strike and expiry. Key columns:

| Column | What It Shows |
|---|---|
| Strike | The price at which the option can be exercised |
| Bid/Ask | Current market for the option |
| Last | Most recent transaction price |
| Volume | Contracts traded today |
| Open Interest (OI) | Total outstanding contracts (open but not closed) |
| IV (Implied Vol) | The volatility implied by the option's current price |
| Delta | Directional exposure per contract |
| Gamma | Delta change per $1 move |

**Volume vs. OI:** Volume resets daily. OI accumulates over time and only changes when positions are opened or closed. OI tells you *where risk is stored*; volume tells you *where action is happening today*.

---

## 1.2 Open Interest — The Pressure Map

OI is the most important column in the chain for structural analysis.

**High OI at a call strike:**
- Many participants are long those calls (they paid premium, they want price above that strike)
- The dealer side is *short* those calls
- As price approaches that strike, dealer delta hedge buying accelerates → can act as a magnet
- If price *breaks* through, dealer buying becomes explosive (gamma squeeze)

**High OI at a put strike:**
- Many participants are long those puts (they want protection below that strike)
- The dealer side is *short* those puts
- As price falls toward that strike, dealer selling accelerates → acts as a support "trap door"
- If price breaks through, dealer selling accelerates → fast move down

**The Call/Put Wall:** The highest OI call strike is the "call wall" — a magnetic ceiling. The highest OI put strike is the "put wall" — a magnetic floor. Price tends to stay between these walls in a pinning regime (positive GEX).

See: [[Concepts/Call Put Walls]] · [[Concepts/GEX]]

---

## 1.3 OI Profile and Dealer Positioning

To determine whether dealers are long or short gamma at a given strike, you need to know who *bought* the options originally:

**The practical approximation:**
- OI at strikes that are at or just above the current price in calls → typically retail/institutional bought → dealers short → negative gamma above current price
- OI at strikes that are at or just below the current price in puts → typically bought as protection → dealers short → negative gamma below current price
- OI at far OTM strikes → often sold by dealers to institutions as yield enhancement → dealers long gamma at extremes

**The gamma-neutral level (GEX = 0):** The price level where dealer gamma exposure flips from positive (stabilizing) to negative (amplifying). Above this level, dealers act as a brake on volatility. Below it, they become accelerators.

See: [[Concepts/Gamma Flip]] · [[Microstructure/R1 Dealer Gamma Constraint]]

---

## 1.4 Volatility Skew and What It Tells You

In a rational Black-Scholes world, all options on the same underlying with the same expiry would have the same implied volatility. In reality, the IV varies significantly across strikes — this is the **volatility skew** or **smile**.

**Equity put skew (the most common):**
```
IV of OTM puts > IV of ATM options > IV of OTM calls
```

OTM puts are expensive (high IV) because:
1. Crash protection demand: institutional investors buy OTM puts as tail hedges
2. Leverage effect: when stocks fall, volatility rises, making puts worth more
3. Convexity premium: put buyers are buying tail insurance that dealers are reluctant to sell

**Reading the skew level:**
- High put skew (25Δ put IV − 25Δ call IV > 8%): elevated fear, institutional protection heavy
- Low put skew (spread < 4%): complacency, market unhedged, vulnerable to vol expansion
- Inverted skew (calls bid over puts): unusual, signals either upside squeeze risk or short-squeeze demand

**The NDX/NQ skew vs. SPX/ES skew:** The Nasdaq research confirms NQ has higher realized vol than ES but similar IV. This means *NQ options are relatively cheaper* than ES options on a realized-vs-implied basis. NQ options provide better bang-for-buck for directional options strategies.

See: [[Volatility/IV Skew & Smile]] · [[Concepts/Put Skew]] · [[Concepts/IV Smile]]

---

## 1.5 Term Structure — The Time Dimension

The term structure of implied volatility shows IV across different expiries for the same strike.

**Contango (normal):** Near-term IV < long-term IV. Market expects future vol but is calm now.

**Backwardation (inverted):** Near-term IV > long-term IV. Immediate fear — something is happening *now*. This is the structure that appears during acute risk events (earnings, FOMC, CPI).

**VIX term structure signals:**
- Front-month VIX > 3-month VIX: acute stress, near-term fear dominant
- Front-month VIX << 3-month VIX: extreme complacency, vulnerability to vol expansion
- VIX term structure flattening: transition phase, build-up of uncertainty

The VIX complex in your vault (Xhengo module) provides the practical daily workflow for reading the term structure.

See: [[Xhengo/VIX Complex — Xhengo]] · [[Volatility-Concepts/Volatility Regime]]

---

## 1.6 Volume/OI Ratio — The Unusual Activity Flag

```
Volume/OI ratio = Today's Volume / Open Interest
```
- Ratio > 2.0: unusual activity
- Ratio > 5.0: highly unusual
- Ratio > 10.0: extreme — something is happening

When volume dramatically exceeds OI, new positions are being *created* rapidly, not just existing positions changing hands. This signals fresh conviction entering the market.

**Combined with sweep analysis** (L14): a high-volume/OI ratio at a specific strike with sweep orders is the strongest signal of institutional directional intent.

---

# PART 2 — PRACTICE

## 2.1 The Daily Options Chain Scan

Every pre-market, spend 5 minutes on the options chain for ES or NQ (the instrument you're trading):

**Step 1: Identify the call wall and put wall**
- Find the highest OI call strike above current price → call wall (resistance)
- Find the highest OI put strike below current price → put wall (support)
- Price tends to stay between these two levels in a positive GEX regime

**Step 2: Find the gamma flip level**
- The strike where call OI and put OI roughly balance (or use a GEX tool)
- Above gamma flip: mean-reverting, pin behavior
- Below gamma flip: accelerating, trending behavior

**Step 3: Check the nearest expiry's OI profile**
- Are there abnormally large OI clusters anywhere unexpected?
- Has OI at a specific strike grown significantly vs. yesterday? → Fresh positioning

**Step 4: Check skew**
- Put skew elevated? → Institutional fear, consider lightening longs
- Put skew collapsed? → Complacency, put structure becoming interesting

---

## 2.2 The Call/Put Wall Trading Rules

**Near the call wall (price approaching from below):**
- Expect deceleration (dealers selling futures as they get longer delta)
- Do not chase longs up to the call wall in a pinning regime
- If call wall is breached on strong volume → gamma squeeze potential → follow momentum

**Near the put wall (price approaching from above):**
- Expect deceleration (dealers buying futures as they get shorter delta)
- Do not chase shorts down to the put wall in a pinning regime
- If put wall is breached on strong volume → gamma cascade potential → follow momentum down

**Between the walls:**
- Mean-reversion is your friend
- Fade extremes, target the POC / VPOC between the walls
- Low-volatility, high-probability range trading

---

## 2.3 Skew as a Narrative Confirmation Tool

| Skew Condition | Narrative Signal |
|---|---|
| Put skew rising with price falling | Genuine fear, real selling — don't buy aggressively |
| Put skew rising with price *flat* | Hidden fear building — institutional protection without visible panic |
| Put skew collapsing with price rising | Pure momentum, no protection — vulnerability building |
| Call skew elevated (calls bid) | Short squeeze risk or upside catalyst anticipated |

**The compressed put skew setup (top tick signal):**
- Price at all-time highs
- Put skew compressed (nobody buying puts)
- COT shows extreme non-commercial long positioning
- → Classic bubble setup: everyone is long and unhedged
- A single shock triggers mass put buying → vol spike → dealer selling cascade → waterfall move

---

## 2.4 OI Changes as a Real-Time Tracker

OI is published daily after the close. Tracking OI changes tells you:
- Strike OI growing rapidly → large new positioning entering
- Strike OI falling rapidly → existing position being closed (profit-taking or stop-out)
- Unexpected OI at a specific strike → smart money has a thesis at that level

When OI builds dramatically at a strike that is currently OTM and near-expiry → high-conviction directional bet. The Sweeps document confirms: repeated sweeps + high and growing OI at the same strike = institutional conviction.

---

## Connections

| Concept | Links |
|---|---|
| OI → call/put walls | [[Concepts/Call Put Walls]] · [[Concepts/GEX]] |
| Skew → fear/complacency | [[Volatility/IV Skew & Smile]] · [[Concepts/Put Skew]] |
| Term structure | [[Xhengo/VIX Complex — Xhengo]] · [[Volatility-Concepts/Volatility Regime]] |
| Volume/OI → unusual activity | [[L14 - Unusual Options Activity]] · [[Flows/Dark Pool Flow]] |
| Gamma flip | [[Concepts/Gamma Flip]] · [[Microstructure/R1 Dealer Gamma Constraint]] |

---

## Tags
`#lecture` `#phase-3` `#options` `#options-chain` `#open-interest` `#skew` `#call-wall` `#put-wall` `#term-structure`

*Next → [[L12 - GEX and DEX]]*
*Previous → [[L10 - Options Primer]]*
