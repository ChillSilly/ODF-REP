# TPO and Market Profile

> *"TPO is a time-based view of the auction. Wide TPO development signals value building. Thin zones behave like traverse areas until proven otherwise."*
> Source: Jewraj Microstructure & Orderflow + UPS Trading Guide

**Tags:** `#orderflow` `#TPO` `#market-profile` `#AMT`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/AMT]] · [[Orderflow/Volume Profile]] · [[Profile-Levels/POC]] · [[Profile-Levels/VAH]] · [[Profile-Levels/VAL]] · [[Profile-Levels/Single Prints]] · [[Profile-Levels/Initial Balance]] · [[Lectures/Phase-4-Order-Flow/L18 - Market Profile and AMT]]

---

## Origin

Developed by J. Peter Steidlmayer at the CBOT in the 1980s. Steidlmayer, a floor trader, sought to visualize the "natural organization" of markets beyond bar charts. The TPO evolved from his work on the Liquidity Data Bank (LDB). The concept draws directly from [[Orderflow/AMT|Auction Market Theory]].

---

## What a TPO Is

Each letter represents a **30-minute period** (default) where price traded at a given level:
- A = 9:30–10:00 (opening)
- B = 10:00–10:30
- C = 10:30–11:00
- ...continuing through the session

**More letters at a price = more time spent = acceptance**
**Fewer letters at a price = price moved through quickly = rejection**

The profile is a histogram rotated 90 degrees. The statistical foundation: one standard deviation from the mean = 68–70% value area (Gaussian distribution).

---

## Key Metrics

### Point of Control (POC)
Price with the most TPOs. Represents the fairest price through a time-price approach. Acts as a gravity point — prices gravitate back due to unfilled orders, hedging, and agreement.

**Variations:**
- Developing POC: Intra-session POC that shifts as the session progresses
- Naked POC: Never revisited from a prior session — acts as magnet and strong S/R
- Migrating POC: Trends directionally — indicates directional conviction

### Value Area (VA)
Range capturing 68–70% of TPO letters (one standard deviation).
- Customisation: some use 70% for strict Gaussian, 65% for conservative
- Overnight VA vs RTH VA: compare for gap analysis

### Tails and Single Prints
**Among the most important profile metrics.** Two or more single TPOs stacked vertically at the profile extremes = prices very quickly rejected. Represent strong initiative activity — marks the edge of the auction.

**Single prints elsewhere in the profile:** Unfinished business — price will typically return.

### Initial Balance (IB)
First two brackets (A–B, first hour's range). Sets the daily tone.
- Wide IB = Strong directional flow, expect range extensions
- Narrow IB = Uncertainty, balanced conditions likely

**IB Extension Target:**
```
Extension Target = IBhigh/low ± 2 × IBrange
```

---

## The Five Day Types

### 1. Normal Day
- Bell-curve profile, POC in center, balanced two-sided trade
- Strategy: Fade from extremes to POC. Mean-revert.

### 2. Normal Variation Day
- Similar to Normal but slight directional bias
- POC slightly off-center (60/40 split)
- Strategy: Lean in direction of bias, still fade extremes

### 3. Trend Day
- Elongated, thin profile. POC at one extreme.
- Minimal two-sided trade. Each 30-min bracket at new extreme.
- **Rule: DO NOT fade the trend.** Trade pullbacks in direction of trend.
- Prior day's value area = support/resistance

### 4. Non-Trend Day
- Sideways consolidation, wide value area, POC in middle
- Strategy: Tight range trades, reduce size, take profits quickly

### 5. Double Distribution Day
- Two separate value areas, gap or quick move between them, two POCs
- Represents two different perceptions of value in one session
- Strategy: Trade between the distributions; the gap is an LVN

---

## Multi-Timeframe Composite Analysis

**Session composite:** Intraday value reference.
**Weekly composite:** Shows where the week's fair value is. Key for swing trading context.
**Monthly composite:** Defines major structural zones. Where institutions have been accumulating.

**Why composites matter for top/bottom ticking:**
Major tops and bottoms typically form when price moves far outside the monthly or quarterly composite value area. The further from long-term value → more vulnerable to mean-reversion. When price returns to the monthly POC after a major excursion → highest-probability outcome: return to structural fairness.

---

## AMT Integration

TPO profiles reveal the three AMT states:
1. **Balance:** Bell-curve distribution, POC in centre, two-sided trade
2. **Imbalance:** Elongated profile, POC at extreme, single prints
3. **Double Distribution:** Two separate value areas, shift in perceived fair value

**Trading rule:** Balance → mean-revert. Imbalance → trend follow. See [[Orderflow/AMT]].

---

## Bracket Analysis

- **Developing brackets:** Overlapping profiles bound flow until breakout. Overlapping TPOs = bracket strength.
- **Balance vs imbalanced:** Multi-day balance = consolidation. Imbalance = trend initiation.
- **Naked levels:** Untested POC/VAH/VALs from composites act as magnets and strong S/R when revisited.

---

## Connections

| Concept | Link |
|---|---|
| AMT foundation | [[Orderflow/AMT]] |
| Volume distribution | [[Orderflow/Volume Profile]] |
| Profile levels | [[Profile-Levels/POC]] · [[Profile-Levels/VAH]] · [[Profile-Levels/VAL]] |
| Single prints | [[Profile-Levels/Single Prints]] |
| Initial balance | [[Profile-Levels/Initial Balance]] |
| Lecture | [[Lectures/Phase-4-Order-Flow/L18 - Market Profile and AMT]] |
