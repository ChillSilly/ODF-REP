# L12 — GEX, DEX, and Dealer Hedging

> **Lecture 12 of 27 — Phase 3: Options Flow**
> GEX (Gamma Exposure) is the most important structural metric in modern equity futures markets. It tells you whether dealers are suppressing volatility or amplifying it — and therefore which trading regime you're in.

---

# PART 1 — THEORY

## 1.1 What GEX Actually Measures

GEX (Gamma Exposure) is the aggregate gamma that dealers hold across all outstanding options, converted to dollars of futures they must buy or sell per 1% move in the underlying.

```
GEX = Σ [Γᵢ × OIᵢ × 100 × S² × 0.01]
```

Where:
- `Γᵢ` = gamma of each option at strike i
- `OIᵢ` = open interest at that strike
- `S` = current spot price
- The sign depends on whether dealers are long or short the option

**The key assumption:** For calls, dealers are typically *short* (customers buy calls, dealers sell). For puts, dealers are typically *short* (customers buy puts for protection, dealers sell). This makes aggregate GEX typically negative, but the *magnitude and rate of change* is what matters.

**Positive GEX:** Dealers are net long gamma. They act as stabilizers — selling into rallies, buying into dips. Markets become mean-reverting. Volatility is suppressed.

**Negative GEX:** Dealers are net short gamma. They are forced to buy into rallies and sell into selloffs to stay delta-neutral. Markets become trending and amplified. Volatility is expanded.

---

## 1.2 The GEX Mechanism in Detail

**In positive GEX (dealers long gamma):**

```
Price rises 1% → Dealer delta increases → Dealer must sell futures to rebalance
Price falls 1% → Dealer delta decreases → Dealer must buy futures to rebalance
```

Dealers are *always trading against the direction of movement*. This creates a natural dampening effect. The market mean-reverts. This is why low-volatility bull markets often coincide with large positive GEX environments — dealers are mechanically suppressing every move.

**In negative GEX (dealers short gamma):**

```
Price rises 1% → Dealer's short calls gain delta → Dealer must buy futures to hedge
Price falls 1% → Dealer's short puts gain delta → Dealer must sell futures to hedge
```

Dealers are *always trading in the direction of movement*. This amplifies every move. Small directional catalysts become large sustained trends. This is the regime for momentum trading.

**The GEX flip:** The level where aggregate dealer gamma crosses from positive to negative. When spot price crosses the GEX flip level, the entire market regime changes from mean-reversion to amplification. This is often the most important structural level in the market on any given day.

See: [[Concepts/Gamma Flip]] · [[Microstructure/R1 Dealer Gamma Constraint]]

---

## 1.3 DEX — Delta Exposure

DEX (Delta Exposure) is the aggregate directional exposure dealers hold from their options hedging:

```
DEX = Σ [Δᵢ × OIᵢ × contract multiplier]
```

Where dealers are short calls (negative delta) and short puts (positive delta — puts have negative delta, so being short a put is positive).

**DEX tells you:** The net directional obligation of dealers. When DEX is very negative (dealers are structurally short delta), any rally forces aggressive futures buying as dealers chase their hedge. This is fuel for momentum moves and short squeezes.

**The vanna contribution to DEX:** When IV falls (vol compression), the delta of OTM options changes (vanna effect). As vol compresses after a fear event, dealer delta positions automatically shift, creating **systematic buying pressure** in futures even without a price catalyst. This is the "vol crush rally" mechanic.

---

## 1.4 The Gamma Regime Map

```
HIGH POSITIVE GEX              GAMMA FLIP              HIGH NEGATIVE GEX
|___________________________|_____________|___________________________|
↑                            ↑              ↑
Suppressed vol            Critical level    Amplified vol
Mean-revert               Regime change     Trend-follow
Fade extremes             Avoid             Break-and-run
```

**Current GEX level sources:**
- SpotGamma (subscription, most accurate)
- Volland (free, good approximation)
- Squeezemetrics (institutional-grade)
- Option volume analysis DIY (harder but teachable)

---

## 1.5 OPEX and the GEX Reset

At each monthly options expiry, all near-month options expire worthless or are exercised. This means dealer gamma positions are *closed* at expiry.

**The OPEX dynamic:**
1. Approaching OPEX: GEX typically peaks (maximum open options, maximum dealer hedging obligations)
2. At OPEX: All near-month gamma disappears. GEX collapses.
3. Post-OPEX: Dealers have minimal hedging constraints. Market is "unanchored."
4. Post-OPEX moves: The direction the market was being held back from (by the pin) often resumes violently in the first 1–3 days after OPEX.

**The quarterly OPEX (March, June, September, December)** is the most powerful because all quarterly, monthly, and weekly options expire simultaneously. This creates the maximum post-OPEX dislocation.

See: [[Regimes/OpEx Pinning Regime]] · [[L15 - OPEX Mechanics]]

---

## 1.6 Charm and the End-of-Day Flow

Charm (∂Δ/∂t) is the rate of delta decay as time passes. As each day ends, the delta of near-expiry options changes, forcing dealers to adjust their hedges even without price movement.

**The end-of-day charm effect:** In the final hour of trading, dealers with large near-expiry positions must rebalance for overnight risk. This creates systematic buying or selling pressure in the final 30 minutes depending on the direction of net charm flow.

For 0DTE options (same-day expiry), charm is extreme — the delta of a near-ATM 0DTE option decays from 0.5 to near 0 or 1 within hours. This creates rapid, forced dealer adjustment throughout the afternoon — the source of the violent 3pm-close dynamics in modern futures markets.

---

# PART 2 — PRACTICE

## 2.1 Daily GEX Regime Classification

Every morning, classify the day's GEX regime in one of four states:

| GEX Level | Regime | Strategy |
|---|---|---|
| Large positive (>$5bn for SPX) | Strong suppression | Fade extremes, mean-revert to POC |
| Small positive | Mild suppression | Moderate range trading, reduce sizing |
| Near zero (around gamma flip) | Unstable | Avoid large positions, tight stops |
| Negative | Amplification | Trend-follow, breakout above/below key levels |

**Sources to check:** SpotGamma dashboard or Volland.com before each session.

---

## 2.2 The GEX Flip Trade

When price crosses the gamma flip level with momentum, the regime changes instantly. This is one of the cleanest, most mechanical setups in the market:

**Setup:**
1. Identify the GEX flip level (available on SpotGamma as "Gamma Flip" or "Zero Gamma" level)
2. Price is currently above the flip (positive GEX, mean-reverting regime)
3. A catalyst pushes price through the flip level
4. The market enters negative GEX — dealers now amplify the move instead of dampening it

**Entry:** Break below the flip level with volume confirmation (footprint shows aggressive sellers)

**Target:** The next major structural level (VPOC, Value Area Low, put wall strike)

**Stop:** Back above the flip level by more than 5 ES points (confirms the flip was genuine, not a false break)

---

## 2.3 The Pinned Market Play

When GEX is high and positive, markets pin to the strike with the highest OI near current price.

**Setup:**
1. GEX is significantly positive
2. Price is within 0.3–0.5% of a high-OI strike
3. OPEX is within 3–5 days
4. Price keeps returning to that strike after small excursions

**Trade:** Range trade around the pin. Buy at the put wall, sell at the call wall. Tight stops (the pin only works until it doesn't). Scale down size as OPEX approaches (the pin can break violently).

---

## 2.4 The Post-OPEX Setup

The highest-conviction setup related to GEX:

**Setup:**
1. Pre-OPEX: large positive GEX, market has been pinned near a strike
2. OPEX occurs, gamma expires, GEX collapses
3. Market is now "free" — dealers have minimal hedging constraints
4. There is a macro narrative or technical pressure that was being suppressed

**Entry:** Monday after monthly OPEX, in the direction of the dominant macro narrative

**Why it works:** The suppression was artificial (dealer hedging). Once removed, the underlying directional pressure asserts itself. The move is often 2–3× the normal weekly range in the first post-OPEX week.

See: [[Practice/Pre-Session Checklist]] · [[Regimes/OpEx Pinning Regime]] · [[Practice/Top Tick Setup]]

---

## Connections

| Concept | Links |
|---|---|
| GEX calculation | [[Concepts/GEX]] · [[Greeks/Gamma]] |
| Gamma flip | [[Concepts/Gamma Flip]] · [[Microstructure/R1 Dealer Gamma Constraint]] |
| OPEX mechanics | [[L15 - OPEX Mechanics]] · [[Regimes/OpEx Pinning Regime]] |
| Vanna flows | [[Concepts/Net Delta Exposure]] · [[Volatility-Concepts/IV Crush]] |
| Call/put walls | [[Concepts/Call Put Walls]] · [[L11 - Options Chain]] |

---

## Tags
`#lecture` `#phase-3` `#options` `#GEX` `#DEX` `#gamma` `#dealer-hedging` `#gamma-flip` `#regime` `#OPEX`

*Next → [[L13 - IV and Volatility]]*
*Previous → [[L11 - Options Chain]]*
