# COT Report — Master Lecture

> **Lecture 19 of 27 — Phase 4: Order Flow**
> The COT report is the only public window into what institutional money is actually doing in the futures market. Most traders use it wrong. This lecture teaches you to use it the way macro funds do.

---

# PART 1 — THEORY
## How the COT Report Works and What It Actually Measures

---

## 1.1 What the COT Report Is

The **Commitments of Traders (COT) report** is a weekly publication by the **Commodity Futures Trading Commission (CFTC)** disclosing the aggregate positioning of all large traders across every major US futures market.

**The mechanics:**
- Data snapshot taken every **Tuesday**
- Released every **Friday at 3:30pm ET**
- **3-day lag** between snapshot and publication
- Covers any market where 20+ traders hold positions above CFTC reporting thresholds
- The aggregate of all reported positions represents **70–90% of total open interest** in most markets

The report has existed since June 1962. Versions trace back to 1924 when the US Department of Agriculture first began tracking grain futures commitments. It is one of the oldest continuous records of speculative positioning in financial markets.

**What it measures:** Who is holding what, in which direction, and how much. It does not tell you *why* they hold it or what they plan to do next.

---

## 1.2 The Two Report Formats

### Legacy (Traditional) Report
The original format, breaking participants into three groups:
1. **Commercials** (large hedgers)
2. **Non-Commercials** (large speculators)
3. **Non-Reportable** (small traders / retail)

This is the most widely used and the simplest to read. **For most commodity and financial futures analysis, start here.**

### Disaggregated / Traders in Financial Futures (TFF)
More granular. Breaks the legacy categories into four groups.

**For physical commodities (Disaggregated):**
- Producer / Merchant / Processor / User ← was "Commercials"
- Swap Dealers ← was part of "Commercials"
- Managed Money ← was "Non-Commercials"
- Other Reportables

**For financial futures (TFF — Traders in Financial Futures):**
- Dealer / Intermediary
- Asset Manager / Institutional
- Leveraged Funds
- Other Reportables

> **Critical note for equity index futures:** Use the **TFF report** for ES, NQ, ZN, and other financial futures. The legacy "Commercial" category in financial futures lumps asset managers (structural long-biased buyers) together with dealers (structural hedgers) — separating them reveals dramatically more information. Leveraged Funds in TFF is your proxy for the CTA / hedge fund speculative positioning that creates crowded trades.

See: [[COT/Non-Commercials]] · [[COT/Commercials]] · [[Participants/Institutions]]

---

## 1.3 The Three Participant Categories in Depth

### Commercials — The Structural Hedgers

**Who they are:** Businesses with actual commodity or financial exposure. In physical markets: grain farmers, oil producers, gold miners, airlines (hedging fuel), refiners. In financial markets: asset managers hedging equity portfolios with index futures, banks hedging interest rate exposure.

**Why they trade:** Not for profit from price movement — they trade to remove risk from their core business. A corn farmer who plants in spring and sells at harvest is exposed to falling corn prices. Selling corn futures locks in the current price, transferring that risk to a speculator who wants it.

**The structural behaviour:**
- Commercials are **price-sensitive hedgers**. The more prices rise, the more they sell (locking in high prices). The more prices fall, the more they buy (locking in low input costs).
- This creates a **natural counter-trend dynamic**: commercials are accumulating the most when price is at extremes, not when it's comfortable.
- In commodity markets, commercials are almost always net short (they are producers selling forward production). In financial futures, the picture is more complex because "commercial" includes both hedgers and dealers.

**The correct interpretation:**
- Absolute level of commercial positioning tells you less than **directional change in commercial positioning**
- Commercials aggressively reducing net shorts (i.e. covering shorts and going less bearish) into a falling market is bullish — they're telling you by their actions that prices at this level are cheap enough to stop hedging
- Commercials aggressively adding net shorts into a rising market is bearish — they're locking in production at what they view as an elevated price

See: [[COT/Commercials]]

---

### Non-Commercials — The Large Speculators

**Who they are:** Commodity Trading Advisors (CTAs), systematic trend-following funds (Man Group, Winton, AQR, etc.), discretionary macro hedge funds, commodity pool operators. They have no underlying business exposure. They trade purely for profit.

**Why they trade:** To profit from price movements. Most large speculators in the COT data are **trend-following** — their models signal to buy what is going up and sell what is going down.

**The structural behaviour:**
- They are generally on the right side of the trend during the trend's middle phase
- They are dangerously wrong at extremes because their models *continue adding* as trends extend
- As price rises, their long positioning grows. As it falls, their short positioning grows.
- At maximum positioning, the marginal buyer (or seller) has already bought (or sold). There is no one left to push price further.

**The positioning extreme dynamic:**
> Near a major top: Non-commercials are at their most net long. Non-reporting small speculators are also long and bullish. Commercials are at their most net short. Three-way divergence. The crowd is fully committed. The reversal is imminent.

This is the **positioning overhang** — the structural condition for a major turning point. The reversal begins not because fundamentals change (they don't always change first) but because the crowd is fully positioned and has no buying power left. Any negative catalyst triggers the unwind.

**Academic support:** Research by Bessembinder and Chan (1992) demonstrated that commercial hedgers possess superior forecasting ability. Wang (2003) found that high divergence between commercial and non-commercial positioning reliably preceded increased volatility and trend reversals.

See: [[COT/Non-Commercials]] · [[COT/Positioning Extremes]]

---

### Non-Reportable — The Small Speculators (Retail)

**Who they are:** Individual traders and small firms whose positions fall below CFTC reporting thresholds. They are essentially the "retail" of the futures market.

**Behavioural signature:** They are the last money into a move. They pile in at tops (buying into the excitement) and capitulate at bottoms (selling in panic). Their maximum bullish positioning near tops and maximum bearish positioning near bottoms is one of the most reliable contrarian signals in the COT framework.

> One theory: the optimal position is **contrary to the net non-reportable position** when it reaches an extreme. This is a simplification, but it captures a structural truth about when retail sentiment is maximally wrong.

See: [[Participants/Retail]]

---

## 1.4 The Open Interest Structure

**Open Interest (OI)** = the total number of outstanding futures contracts that have not been settled.

COT data is presented as a percentage of total open interest, not just raw contract counts. This normalisation is essential — a market with 500,000 total OI and non-commercials holding 100,000 longs is very different from a market with 50,000 total OI and non-commercials holding 100,000 longs.

**What rising open interest tells you:**
- Rising OI with rising price: new money is entering on the long side — trend confirmation
- Rising OI with falling price: new money is entering on the short side — trend confirmation (bearish)
- Falling OI with rising price: short covering — trend is weaker, driven by squeeze not genuine buying
- Falling OI with falling price: long liquidation — trend is weaker, driven by forced exits

This OI analysis sits between the COT report (weekly, slow) and your footprint/CVD work (intraday, fast) — it is the medium-term positioning lens.

See: [[COT/Open Interest COT]] · [[COT/Net Position]]

---

## 1.5 The COT Index — The Only Correct Way to Read Positioning

Raw net position numbers are meaningless without context. A non-commercial net long of 100,000 contracts sounds large — but is it extreme or moderate relative to history?

The **COT Index** normalises positioning against its own historical range:

```
COT Index = (Current Net Position − Minimum over N weeks) / (Maximum − Minimum over N weeks) × 100
```

- Output ranges from 0 to 100
- **0** = most bearish positioning in the lookback period
- **100** = most bullish positioning in the lookback period
- **Above 80:** Extreme bullish positioning — caution for longs
- **Below 20:** Extreme bearish positioning — caution for shorts
- **Crossing 50 from below:** Positioning is becoming more bullish — potential trend signal

Typical lookback: 52 weeks (1 year) or 156 weeks (3 years). The 3-year window catches more complete cycles.

> **The power of the index:** It removes the absolute-size problem and lets you compare positioning extremes across different markets and different time periods on the same scale. A COT Index reading of 95 in gold means something very specific and comparable to a 95 reading in crude oil.

See: [[COT/Net Position]] · [[COT/Positioning Extremes]]

---

## 1.6 The Three-Way Divergence — The Core Signal

The most powerful setup the COT report generates is the **three-way divergence** at market extremes:

**At a major top:**
| Participant | Positioning |
|---|---|
| Commercials | Maximally net short (hedging at high prices) |
| Non-Commercials | Maximally net long (trend-following into the high) |
| Small Speculators | Net long and increasingly bullish |

**At a major bottom:**
| Participant | Positioning |
|---|---|
| Commercials | Maximally net long (buying cheap inputs / reducing hedges) |
| Non-Commercials | Maximally net short (trend-following into the low) |
| Small Speculators | Net short and increasingly bearish |

The divergence between smart money (commercials doing the opposite of trend) and dumb money (retail doing the same as trend) is the structural signal. The greater the divergence, the more powerful the eventual reversal.

> "At major turning points, commercials quietly exit as momentum traders hit maximum capacity and retail enthusiasm peaks. Within weeks, the reversal begins, and positions unwind in the opposite sequence."

See: [[COT/COT and Day Trading]] · [[Practice/Top Tick Setup]] · [[Practice/Bottom Tick Setup]]

---

## 1.7 Limitations of the COT Report

**The lag problem:** You are reading Tuesday's data on Friday. In fast-moving markets, three days is significant. A major trend shift that began Wednesday is invisible in Friday's report. This is why COT is a *macro context tool*, not a precise entry tool.

**Classification ambiguity:** The CFTC does not reveal how individual firms are classified. A large bank may have its commercial banking arm classified as "commercial" and its hedge fund arm as "non-commercial." This creates noise in the data, especially in financial futures.

**No intent disclosure:** The report tells you *what* positions are held — not *why*. A large non-commercial long in crude oil could be a directional bet, a hedge against energy inflation in an equity portfolio, or a relative value trade against another energy product.

**Market-specific variations:** Commodity markets have more reliable commercial/non-commercial signals because the hedging logic is clear (farmers sell, end-users buy). Financial futures have more complex participant motivations. Always read COT in context of the specific market you're trading.

---
---

# PART 2 — PRACTICE
## Your Edge From the COT Report

---

## 2.1 The COT Workflow — Weekly Friday Ritual

Every Friday after 3:30pm ET, run this scan. It takes 15–20 minutes and gives you the macro positioning context for the following week.

**Step 1: Pull the data**
Sources (free):
- CFTC.gov → Commitments of Traders → Current report
- Barchart.com → Futures → COT Reports (charts already normalised)
- TradingView → COT indicator overlaid on price chart

**Step 2: Check your primary instruments**
For each market you trade, record:
- Current net non-commercial position
- Change from last week (direction and size)
- COT Index reading (0–100 scale, 52-week range)
- Current net commercial position change

**Step 3: Flag extremes**
Non-commercial COT Index above 80 or below 20 → enter this in your [[COT/Positioning Extremes]] note with the date.

**Step 4: Check for divergence**
Is non-commercial positioning extreme AND moving further in that direction while price is slowing or reversing? That is your early warning signal.

**Step 5: Update your bias**
Does the COT context support or challenge your existing directional bias for next week? Record it in your pre-session checklist.

See: [[Practice/Pre-Session Checklist]] · [[COT/COT Report Overview]]

---

## 2.2 The Positioning Extreme Setup — Your Core COT Trade

This is the highest-value use of the COT report. It does not give you the exact entry — it gives you the *structural permission* to look for a reversal.

**Setup conditions:**
1. Non-commercial COT Index reaches 85–100 (extreme long) or 0–15 (extreme short)
2. Commercial positioning is moving in the opposite direction (they are accumulating or distributing)
3. Small speculators are aligned with non-commercials (all pointing the same way = maximum crowding)
4. Price action shows signs of exhaustion (see below)

**What you do with it:**
- The extreme positioning tells you **the risk/reward of going with the trend has inverted**
- You do NOT short a COT-extreme market immediately — you put it on your radar and wait for confirmation
- The confirmation comes from your orderflow tools: CVD divergence, absorption on footprint, DOM showing large passive bids/offers absorbing aggressive flow

**Confirmation checklist:**
- [ ] CVD divergence (price makes new extreme, cumulative delta does not)
- [ ] Footprint absorption at a key level (large volume, price stalls)
- [ ] DOM: large resting orders absorbing aggressive market orders
- [ ] Macro catalyst that could trigger the unwind (earnings surprise, macro data miss, policy shift)
- [ ] Price breaks a short-term structural level (the trigger that forces stop cascades)

See: [[Orderflow/CVD Divergence]] · [[Orderflow-Concepts/Absorption]] · [[Practice/Top Tick Setup]] · [[Practice/Bottom Tick Setup]]

---

## 2.3 The Crowding Indicator for Top/Bottom Ticking

This is where the COT connects directly to your primary goal. You are not top/bottom ticking randomly — you are looking for locations where the **structural participant alignment forces a reversal**.

**The top tick model using COT:**

```
Step 1: Non-commercial COT Index > 85 (they are crowded long)
Step 2: Price is in a strong uptrend, narrative is bullish (everyone "knows" it goes higher)
Step 3: Commercial positioning is increasing net short (they are hedging at these highs)
Step 4: You shift from "looking for longs" to "looking for reversal signals"
Step 5: Orderflow confirms exhaustion → entry short
Step 6: Forced CTA liquidation becomes your tailwind as the move reverses
```

**The bottom tick model using COT:**
```
Step 1: Non-commercial COT Index < 15 (they are crowded short)
Step 2: Price is in a strong downtrend, narrative is bearish (everyone "knows" it goes lower)
Step 3: Commercial positioning is increasing net long (they are buying cheap)
Step 4: You shift from "looking for shorts" to "looking for reversal signals"
Step 5: Orderflow confirms exhaustion → entry long
Step 6: Forced short covering becomes your tailwind as the move reverses
```

**The edge:** You are not fighting the trend randomly. You are entering when the crowd is *structurally unable to push further* and when any catalyst will force the mechanical unwind. The COT tells you the structural conditions. The orderflow tells you the exact moment.

See: [[COT/Non-Commercials]] · [[Orderflow-Concepts/Trapped Traders]] · [[Practice/Top Tick Setup]]

---

## 2.4 COT as a Narrative Confirmation Tool

For your macro narrative framework (Phase 2 of the curriculum), the COT provides a critical validity check:

**The question to ask:** Does the current market narrative explain the current positioning?

**Example:**
- Narrative: "The Fed is going to keep rates higher for longer → bearish for equities"
- COT shows: Non-commercials are still net long equities at moderate levels
- Interpretation: The narrative exists, but the market hasn't fully positioned for it yet. The repricing has more to run. Do not be early shorting into a market that hasn't yet crowded short.

**Counter-example:**
- Narrative: "Recession is coming → bearish for equities"
- COT shows: Non-commercials are at a 3-year extreme net short
- Interpretation: The narrative is fully priced into positioning. Maximum pessimism. Any positive surprise triggers a violent short-covering rally regardless of whether the recession materialises.

> **The meta-lesson:** It is not the narrative that moves markets — it is the *delta between the narrative and current positioning*. COT gives you the positioning half of that equation.

See: [[Bridge - Macro Volatility Catalysts]] · [[Macro-Drivers/Interest Rates]] · [[Catalysts/FOMC Decision]]

---

## 2.5 The Managed Money Divergence (TFF Report)

For equity index futures (ES, NQ), use the **Traders in Financial Futures (TFF) report** and focus on the **Leveraged Funds** category — this is your proxy for CTA / hedge fund speculative positioning.

**The signal setup:**
1. Leveraged Funds at extreme net long or short (TFF report, 52-week range)
2. Asset Manager positioning moving in the opposite direction (they are reducing exposure)
3. Dealer positioning also moving against Leveraged Funds (dealers know something)

**Why this matters more than the legacy COT for equities:**
The legacy "Non-Commercial" category in equity index futures includes both systematic trend-followers (CTAs) and discretionary macro funds. Their dynamics are different. CTAs are forced buyers/sellers by their models. Discretionary macro funds make judgment calls. The TFF report separates these more cleanly by capturing the leveraged speculative community vs. the longer-horizon asset manager community.

---

## 2.6 COT + Options Flow = High-Conviction Top/Bottom Ticks

This is the full synthesis that separates a professional top/bottom tick from a guess:

**The three-layer confirmation stack:**

| Layer | Tool | What It Confirms |
|---|---|---|
| Macro context | COT Report | Structural positioning extreme — the crowd is wrong |
| Options flow | GEX / Skew / UOA | Dealer and institutional hedging confirms the thesis |
| Execution | Footprint / CVD / DOM | Forced flow has begun, absorption is happening |

**When all three align:**
- COT shows extreme non-commercial positioning
- Options flow shows dealers or institutions positioning for the reversal (unusual put buying at tops, call buying at bottoms, or GEX turning negative)
- Footprint shows absorption and CVD divergence at a key technical level

This is your **A-grade setup**. It is rare — perhaps 3–5 times per year in any given market. But when it appears, it offers asymmetric risk/reward because you are entering with the largest structural forces about to move in your direction.

See: [[Concepts/GEX]] · [[Concepts/Net Delta Exposure]] · [[Orderflow/CVD Divergence]] · [[Practice/Top Tick Setup]]

---

## 2.7 What COT Cannot Tell You — The Discipline of Limitations

**It cannot tell you timing.** An extreme COT reading can persist for weeks before the reversal. Entering the trade too early is a capital destruction strategy. Always wait for orderflow confirmation.

**It cannot tell you the size of the reversal.** A positioning unwind can be a minor pullback or a trend reversal. Use market profile and VPOC levels to gauge potential targets.

**It is not valid during macro regime changes.** When the fundamental backdrop changes dramatically (COVID lockdowns, surprise rate hike cycles), positioning extremes can persist or expand far beyond historical norms before reverting. The regime change overrides the positioning signal.

**It is a secondary tool, not a primary one.** Never enter a trade solely because the COT is extreme. It is context. Your orderflow is the trigger.

See: [[Regimes/Short Gamma Regime]] · [[Regimes/Long Gamma Regime]] · [[Bridge - Regimes to Strategies]]

---

## 2.8 The COT Obsidian Note System

Add these notes to your vault as you build this framework:

**[[COT/COT Report Overview]]** — master hub, links to all sub-notes
**[[COT/Commercials]]** — who they are, how to read commercial positioning changes
**[[COT/Non-Commercials]]** — CTA crowding dynamics, the overextension pattern
**[[COT/Net Position]]** — how to calculate and chart net positioning
**[[COT/Positioning Extremes]]** — your log of historical extreme readings with outcomes
**[[COT/Open Interest COT]]** — OI changes as a trend confirmation/denial tool
**[[COT/COT and Day Trading]]** — how weekly COT context filters your intraday bias

---

## Connections to Other Concepts

| Concept | Links |
|---|---|
| Positioning extremes → reversals | [[Practice/Top Tick Setup]] · [[Practice/Bottom Tick Setup]] |
| Commercial hedging | [[Participants/Institutions]] · [[Participants/Dealers]] |
| CTA crowding → forced liquidation | [[Orderflow-Concepts/Trapped Traders]] · [[Mechanisms/Stop Hunt Mechanism]] |
| Macro context | [[Bridge - Macro Volatility Catalysts]] · [[Catalysts/FOMC Decision]] |
| Options confirmation | [[Concepts/GEX]] · [[Concepts/Net Delta Exposure]] |
| Orderflow execution | [[Orderflow/CVD Divergence]] · [[Orderflow-Concepts/Absorption]] |
| Regime filter | [[Regimes/Short Gamma Regime]] · [[Bridge - Regimes to Strategies]] |

---

## Summary

### Theory
1. COT = weekly CFTC report showing aggregate futures positioning, captured Tuesday, released Friday. 3-day lag.
2. Three categories: Commercials (hedgers — structurally contrarian), Non-Commercials (speculators — trend-following, dangerous at extremes), Non-Reportable (retail — last money in, first money out).
3. Use the TFF report for financial futures (ES, NQ, ZN) — the Leveraged Funds category is your primary speculative positioning gauge.
4. The COT Index (0–100 normalisation) is the correct way to read positioning. Above 80 or below 20 = structurally extreme.
5. The three-way divergence (commercials vs non-commercials vs retail all pointing different directions) is the most powerful COT signal. It identifies the structural precondition for a major reversal.

### Practice
1. Run the Friday COT ritual: check your instruments, record the COT Index, flag extremes, update your bias.
2. When non-commercial COT Index > 85 or < 15: switch from trend-following mode to reversal-alert mode. Wait for orderflow confirmation before acting.
3. Use COT to validate your macro narrative — not as the narrative itself. The gap between the story and actual positioning is where the edge lives.
4. The highest-conviction top/bottom tick setup: COT extreme + options flow confirmation + footprint absorption, all aligned. This is your A-grade setup. Be patient for it.
5. Never enter a trade *because* of COT alone. It is context. Orderflow is the trigger. COT removes the wrong trades; it doesn't give you the exact right ones.

---

## Tags
`#lecture` `#phase-4` `#orderflow` `#COT` `#positioning` `#participants` `#smart-money` `#top-bottom-tick` `#macro` `#commercials` `#non-commercials`

---

*Next → [[L20 — Liquidity — Sweeps, Stops, and Engineered Moves]]*
*Previous → [[L18 — Market Profile and Auction Market Theory]]*
*Related → [[COT/COT Report Overview]] · [[Practice/Top Tick Setup]] · [[Practice/Bottom Tick Setup]]*
