# L15 — OPEX Mechanics

> **Lecture 15 of 27 — Phase 3: Options Flow**
> Options expiry is the single most predictable recurring structural event in futures markets. Every month it creates the same sequence: pinning, compression, release, and dislocation. Learn the pattern cold.

---

# PART 1 — THEORY

## 1.1 The OPEX Calendar

**Monthly OPEX:** Third Friday of each month. All standard monthly options expire at the open (AM settlement for index options) or close (PM settlement for equity options).

**Quarterly OPEX (Quadruple Witching):** March, June, September, December. Index futures, index options, equity options, and single-stock futures all expire simultaneously. Maximum open interest, maximum dealer hedging obligations, maximum structural distortion.

**Weekly OPEX:** Every Friday. Lower OI but increasing significance due to 0DTE growth.

**0DTE:** Intraday expiry on Mon/Wed/Fri for SPX options. Gamma is infinite near ATM — every tick forces massive dealer hedging. Changed the structure of afternoon futures trading permanently.

---

## 1.2 The OPEX Pinning Mechanism

In the days approaching OPEX, price tends to gravitate toward the strike with the highest open interest — the **max pain** level or pin strike.

**The mechanic:**
1. High OI at a specific strike creates a large gamma concentration
2. Dealers with short gamma at that strike must hedge aggressively when price moves away
3. Their hedging *pulls price back* toward the strike (they sell rallies above, buy dips below)
4. The market is literally pinned by the mechanical necessity of dealer hedging

**Max Pain:** The strike price at which the maximum number of options contracts expire worthless. Technically: the price at which the aggregate value of all open options is minimized. Sellers of options (often dealers and institutions who write covered calls/cash-secured puts) are incentivized for price to close here.

**Does pinning always work?** No. In negative GEX environments or when a strong macro catalyst overrides the pin, the pin breaks. But when GEX is highly positive and there's no strong directional catalyst, pinning is remarkably reliable.

---

## 1.3 The Pre-OPEX Compression Window

In the 5–7 trading days before OPEX, the pin effect creates the most compressed, range-bound trading environment of the month.

**Why:** Dealers are aggressively dampening volatility (they are long gamma, selling rallies and buying dips). Range expands only at the pin release.

**This is your accumulation window.** While the market is artificially compressed:
- Build your position in the direction of the dominant macro narrative (the one being suppressed)
- Use the low-volatility environment to enter with tight stops
- The post-OPEX release of compression is your profit engine

**The ideal setup:**
- Strong macro narrative exists (e.g., rate cut expectations building)
- Market is pinned 2–3% below the natural price implied by the narrative
- OPEX is 3–5 days away
- Enter the macro trade at a structural support level during the pin

---

## 1.4 The OPEX Release and Post-OPEX Dislocation

At OPEX:
1. All near-month gamma expires worthless or is exercised
2. Dealers' hedging obligations collapse simultaneously
3. The structural "pin" disappears
4. Whatever directional pressure was being suppressed is now free

**The post-OPEX pattern:**
- First 1–3 days after OPEX: above-average volatility as the market reprices without the pin
- Direction: usually the direction of the dominant macro narrative (the suppressed one)
- Magnitude: often 2–3× the pre-OPEX daily range
- Then: new option positions are opened for the next cycle, new pin establishes

**The quarterly OPEX dislocation** is the most powerful. Because quarterly options have accumulated OI for 3 months, the release of gamma is far larger than monthly OPEX. The post-quarterly-OPEX week is the highest-vol week of the quarter.

---

## 1.5 0DTE — The Intraday Gamma Machine

0DTE options (zero days to expiration) have transformed intraday futures dynamics since their expansion in 2022–2023.

**The mechanics:**
- 0DTE options have infinite gamma at ATM — any move creates massive delta changes
- Retail and institutional traders use 0DTE for intraday directional bets
- Dealers who sell 0DTE options must hedge extremely aggressively throughout the day
- This creates feedback loops within single trading sessions that didn't exist before

**The 0DTE daily pattern:**
- Morning: 0DTE positioning sets intraday bias
- 12–1pm: 0DTE delta decay accelerates (charm effect) → systematic mid-day flows
- 2–3pm: Maximum 0DTE gamma exposure → most volatile period relative to morning
- 3:30–4pm: 0DTE expiry approaches → dealers flatten positions → often creates a reversal or acceleration in the final 30 minutes

**The 0DTE trend day amplifier:**
If a strong directional catalyst hits in the morning and directional 0DTE call (or put) buying begins:
1. Retail buys 0DTE calls
2. Dealers sell and must buy futures to hedge
3. Futures buying pushes price up
4. Delta of 0DTE calls increases faster (high gamma)
5. Dealers must buy more futures
6. The loop creates a 1–2% intraday move from what would have been a 0.3% move

This is the 0DTE gamma squeeze. It amplifies trend days into extreme trend days.

---

## 1.6 SPX AM vs PM Settlement

**AM Settlement (for index options):**
SPX weekly options that expire on Friday use AM settlement — calculated from the opening prices of each S&P 500 component, not the regular market close. This creates known distortion in the 9:30–10:00 window.

**PM Settlement (for SPY, QQQ, most equity options):**
Uses the regular 4pm closing price. No pre-market distortion.

**Why this creates a trading opportunity:**
AM-settled index options force massive hedging in the opening 30 minutes of OPEX Friday. The SPX SOQ (Special Opening Quotation) can diverge significantly from the previous night's futures price. Institutions with large AM-settled positions must execute market-on-open orders. This creates systematic front-runnable order flow in the opening 30 minutes.

---

# PART 2 — PRACTICE

## 2.1 The Monthly OPEX Playbook

**10–7 days before OPEX (setup phase):**
- Identify the current pin strike (highest near-month OI)
- Check if macro narrative is being suppressed by the pin
- Begin monitoring for entry opportunity

**7–3 days before OPEX (accumulation phase):**
- Enter positions in the direction of the narrative if pin is holding and setup is clean
- Use the compressed vol to enter with tight stops (ATR is smaller than normal)
- Target: post-OPEX dislocation move

**OPEX Friday:**
- Reduce position if carrying through OPEX day (high noise-to-signal)
- Or: if carrying through, set wider stops to account for intraday pin and release volatility
- The pin may hold right up to close, then release immediately after

**Post-OPEX (Monday–Wednesday after OPEX):**
- This is the primary profit window
- Position is now "free" from the pin
- Let it run toward macro narrative target
- Use VPOC and Value Area as targets

---

## 2.2 The 0DTE Flow Trade

For the days where 0DTE activity is elevated (use Unusual Whales 0DTE filter):

**Morning 0DTE call sweep setup (bullish day likely):**
1. First 30 minutes: identify if there's unusual 0DTE call buying at OTM strikes
2. Price holds above VWAP and overnight high
3. The gamma feedback loop is beginning
4. Enter long futures on the first VWAP retest that holds
5. Stop: below VWAP by 4 ticks
6. Target: the 0DTE call strike being swept
7. Exit by 3:30pm — 0DTE positions force end-of-day hedging that can reverse direction

---

## 2.3 The Triple Witching Week Protocol

The week of quarterly OPEX (third week of March, June, September, December):

**Monday–Tuesday:** Normal, but monitor for pre-OPEX positioning entering the market (large OI builds)
**Wednesday–Thursday:** Pin effect is maximum; stay small, fade extremes
**Friday (OPEX day):** Avoid new positions in the first 90 minutes (AM settlement distortion). Trade the post-open stabilization.
**Following Monday–Wednesday:** Your highest-conviction post-OPEX trades. Deploy full sizing.

---

## 2.4 Charting the OPEX Cycle

Build this into your weekly prep:

```
Current OPEX date: [date]
Days until OPEX: [number]
Current pin strike: [strike]
Distance from pin: [%]
GEX level: [positive/negative]
Dominant macro narrative: [description]
Is the narrative being suppressed? [yes/no]
Post-OPEX target: [level]
```

When "narrative being suppressed = yes" and "days until OPEX < 7" → you have your entry window.

---

## Connections

| Concept | Links |
|---|---|
| Pinning mechanics | [[Concepts/GEX]] · [[Concepts/Call Put Walls]] · [[Regimes/OpEx Pinning Regime]] |
| 0DTE gamma | [[Greeks/Gamma]] · [[Microstructure/R1 Dealer Gamma Constraint]] |
| Post-OPEX trades | [[Practice/Top Tick Setup]] · [[Practice/Bottom Tick Setup]] |
| AM settlement | [[L1 - Futures Market Structure]] · [[Execution/Entry Timing]] |
| Compression → release | [[L4 - Narrative Framework]] · [[L9 - Narrative Shifts]] |

---

## Tags
`#lecture` `#phase-3` `#options` `#OPEX` `#0DTE` `#pinning` `#gamma-squeeze` `#triple-witching` `#opex-release`

*Next → [[L16 - Market Microstructure]]*
*Previous → [[L14 - Unusual Options Activity]]*
