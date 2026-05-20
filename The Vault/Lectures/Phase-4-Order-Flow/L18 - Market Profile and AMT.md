# L18 — Market Profile and Auction Market Theory

> **Lecture 18 of 27 — Phase 4: Order Flow**
> Market Profile is not a technical indicator. It is a framework for understanding *why* price moves — rooted in auction theory, not pattern recognition. It tells you whether the market is in balance or out of balance and what comes next.

---

# PART 1 — THEORY

## 1.1 Auction Market Theory — The Foundation

**Auction Market Theory (AMT)** states that markets are continuous two-sided auctions where price moves to *facilitate trade*. The sole purpose of price movement is to find the level where buyers and sellers are willing to transact.

**The two auction states:**
1. **Price discovery (trending):** Price is moving away from a previous value area, searching for a new one. The market has not found acceptance at current prices. It will keep moving until it finds a level where both sides will transact.

2. **Value building (balancing):** Price has found a range where buyers and sellers are relatively in agreement. Volume accumulates. A value area forms. This is the market "agreeing on fair value."

**The cycle:**
```
Balance (value building) → Imbalance catalyst → Price discovery → New balance
```

Every trade setup in futures is either:
- Trading the *transition* from balance to imbalance (breakout)
- Trading *within* balance (mean-reversion to value)

Understanding which state you're in is the single most important AMT decision.

---

## 1.2 Market Profile Components

Developed by J. Peter Steidlmayer at the CBOT in the 1980s. Market Profile organizes price data into a statistical distribution that reveals acceptance and rejection.

**TPO (Time Price Opportunity):** Each letter represents a 30-minute period:
- A = 9:30–10:00 (opening)
- B = 10:00–10:30
- ...continuing through the session

More letters at a price = more time spent = **acceptance** (market found value here)
Few letters at a price = price moved through quickly = **rejection** (market rejected this area)

**Key Market Profile levels:**
- **POC (Point of Control):** Price with the most TPOs. Statistical "fair price" of the day.
- **Value Area (VA):** Range containing 70% of TPOs (≈ 1 standard deviation). The range where the market agreed value resided.
- **VAH / VAL:** Top and bottom of the value area.
- **Initial Balance (IB):** First hour's range. Sets the reference for range extension.

**IB Extension Target:**
```
IB Extension = IBhigh/low ± 2 × IBrange
```

---

## 1.3 The Five Day Types

From the UPS materials, understanding the day type tells you which trading approach to use:

**1. Normal Day:**
- Bell-curve profile, POC in center, balanced two-sided trade
- Strategy: Mean-revert from extremes to POC, fade VAH/VAL

**2. Normal Variation Day:**
- Similar to Normal but with slight directional bias
- POC slightly off-center
- Strategy: Lean in direction of POC skew but still fade extremes

**3. Trend Day:**
- Elongated, thin profile. POC at one extreme.
- Strong directional conviction from open
- Strategy: **Do NOT fade.** Trade pullbacks in direction of trend. Prior day's value area becomes support/resistance.
- Signature: Opening range holds, each hour makes a new extreme

**4. Non-Trend Day:**
- Wide value area, lots of two-way trade, POC in middle
- Strategy: Tight range trades, reduce size, take profits quickly

**5. Double Distribution Day:**
- Two separate value areas (two peaks on the profile)
- Gap between distributions where price moved quickly
- Signals: Intraday narrative shift or different overnight vs. day-session perception of value
- Strategy: Trade between the distributions; the gap is an LVN

---

## 1.4 Composite Profiles — The Structural Map

**Session composite:** Single day's profile → intraday value reference.

**Weekly composite:** 5-day profile → shows where the *week's* fair value is. Key for swing trading context.

**Monthly composite:** 20+ day profile → defines the major structural zones. Where institutions have been accumulating. Where they'll defend.

**Why composites matter for top/bottom ticking:**
Major tops and bottoms typically form when price moves far outside the monthly or quarterly composite value area. The further price moves from long-term value, the more vulnerable it is to mean-reversion. When price returns to the monthly POC after a major excursion → you are trading toward structural fairness, which is one of the highest-probability outcomes in all of futures trading.

See: [[Profile-Levels/Point of Control POC]] · [[Orderflow/TPO & Market Profile]]

---

## 1.5 Bracket Trading and Balance

**Bracket trading:** When today's range is entirely inside yesterday's value area → the market is in balance. Yesterday's buyers and sellers are still in agreement. No new information has moved the needle.

**What balance tells you:**
- Low directional conviction
- Fade extremes, target the POC
- The longer balance persists, the more violent the eventual breakout

**Balance → imbalance transition:**
When price breaks out of a balance area with momentum (confirmed by volume and delta), it transitions to price discovery mode. The prior balance area becomes the *reference* — a return to it will be the next major support/resistance.

**Separated value areas (new narrative):**
When today's value area has no overlap with yesterday's → a significant move has occurred. The market has genuinely repriced. The old value area is now remote reference.

**Overlapping value areas (continuation of search):**
Today's VA partially overlaps yesterday's → market is still searching for fair value. Continuation bias.

---

## 1.6 Single Prints and Poor Highs/Lows

**Single prints:** Price levels where only one TPO letter appears. The market moved through this level so fast it never accepted it. Single prints are **unfinished business** — price will typically return to fill them.

**Poor high:** A high formed by a single TPO, indicating the upward move ended with no acceptance at the high. The market did not auction the high properly.

**Poor low:** Same concept for a low.

**Why they matter:** Poor highs and lows are the market's unfinished auctions. In AMT, unfinished auctions get completed. A poor high will typically be retested and either accepted (more TPOs form) or rejected again (new high forms).

This directly connects to your unfinished auction concept in orderflow.

See: [[Profile-Levels/Single Prints]] · [[Orderflow-Concepts/Unfinished Auction]]

---

# PART 2 — PRACTICE

## 2.1 Daily Market Profile Setup

Every morning before the open:
```
1. Identify prior day's key levels:
   - Prior day POC: [level]
   - Prior day VAH: [level]
   - Prior day VAL: [level]
   - Prior day high/low: [levels]

2. Note any single prints or poor highs/lows from prior sessions

3. Identify the current day type bias based on pre-market action:
   - Opening inside VA → normal/non-trend day likely
   - Opening outside VA → potential trend day or test of VA boundary

4. Define your scenarios:
   - If price opens at VAH → either acceptance (breaks above) or rejection (fades back to POC)
   - If price opens at VAL → either acceptance (breaks below) or support (bounces to POC)
```

---

## 2.2 The Day Type Trade

**Identifying a Trend Day early (first 60–90 minutes):**
- Price opens at one extreme and stays there (does not return to the opening range)
- Initial balance is small (< 50% of prior day's range)
- Volume is above average from the open
- Each 30-min letter is making a new extreme in the direction of the trend
- Delta is consistently positive (uptrend) or negative (downtrend) throughout

**Once a Trend Day is identified: stop fading.** The correct trade is to trade every pullback to VWAP or prior TPO support in the trend direction. This is the Trend Day rule from your vault: "DO NOT fade the trend."

**The danger:** Trend Days look like Normal Days until they're well underway. This is why initial position size should be small, scaling in as the Trend Day signature confirms.

---

## 2.3 The Balance Breakout

**Setup:**
1. Market has been in balance for 2+ days (value areas overlapping)
2. A catalyst appears (data, news, or technical break)
3. Price breaks outside the balance area with expanding volume
4. Delta is stacked imbalances in direction of break

**Entry:** On the first close outside the balance area
**Stop:** Back inside the balance area by more than 3 ticks (if price returns, the break was false)
**Target:** The estimated price level for the new value area to form (1–2 standard deviations of the prior balance area away)

---

## 2.4 The VAL/VAH Trade

The most reliable intraday level-based trade:

**VAL support trade:**
1. Price pulls back to prior day's VAL
2. Volume is declining on the pullback (sellers losing conviction)
3. Delta shows absorption at VAL (large buys absorbing the selling)
4. Footprint confirms (imbalances flipping to buy-side)
→ Enter long, target prior day's POC or VAH

**VAH resistance trade:**
1. Price rallies to prior day's VAH
2. Volume declining on the rally (buyers losing conviction)
3. Delta shows distribution at VAH (absorption of buyers)
4. Footprint shows selling imbalances developing
→ Enter short, target prior day's POC or VAL

See: [[Xhengo/TPO — Xhengo]] · [[Orderflow/Auction Market Theory]]

---

## Connections

| Concept | Links |
|---|---|
| AMT fundamentals | [[Orderflow/Auction Market Theory]] · [[Orderflow/TPO & Market Profile]] |
| Value area levels | [[Profile-Levels/Value Area High VAH]] · [[Profile-Levels/Value Area Low VAL]] |
| Single prints | [[Profile-Levels/Single Prints]] · [[Orderflow-Concepts/Unfinished Auction]] |
| Day types | [[Day-Types/]] · [[Xhengo/TPO — Xhengo]] |
| Composite profiles | [[Orderflow/Volume Profile]] · [[Profile-Levels/Point of Control POC]] |

---

## Tags
`#lecture` `#phase-4` `#orderflow` `#market-profile` `#AMT` `#TPO` `#value-area` `#POC` `#day-types` `#balance` `#auction`

*Next → [[L19 - COT Report]]*
*Previous → [[L17 - Footprint Charts and VAP]]*
