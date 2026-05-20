# L10 — Options Primer for Futures Traders

> **Lecture 10 of 27 — Phase 3: Options Flow**
> You don't need to trade options. You need to understand what options traders are doing, because their hedging obligations move futures. The options market is the hidden engine of futures price action.

---

# PART 1 — THEORY

## 1.1 What Options Actually Are

An option is a contract that gives the buyer the *right*, but not the *obligation*, to buy (call) or sell (put) an underlying asset at a specific price (strike) before or at a specific date (expiry).

**The key asymmetry:** The buyer pays a premium and has limited downside (the premium paid). The seller collects the premium and has theoretically unlimited liability. This asymmetry is what creates the dealer hedging flows that move futures.

**Call option:** The right to buy. Buyer profits when price rises above strike. Seller (dealer) is short the call and must hedge by buying the underlying as price rises.

**Put option:** The right to sell. Buyer profits when price falls below strike. Seller (dealer) is short the put and must hedge by selling the underlying as price falls.

---

## 1.2 The Greeks — What They Mean for Futures Traders

From the quant vault and UPS materials, the Greeks are partial derivatives of the option price. But what matters for futures traders is their *market impact*:

### Delta (Δ)
```
Δ = ∂V/∂S
```
How much the option price changes for a $1 move in the underlying.
- ATM call: Δ ≈ 0.5
- Deep ITM call: Δ → 1 (moves like the underlying)
- Deep OTM call: Δ → 0 (barely moves)

**For futures:** Delta is the *quantity* of futures the dealer must hold to hedge their options position. A dealer short 1000 ATM calls (Δ = 0.5) must hold 500 long futures contracts to delta-hedge. If price rises and delta increases to 0.6, they must buy 100 more futures contracts. This is dealer hedging.

### Gamma (Γ)
```
Γ = ∂²V/∂S² = ∂Δ/∂S
```
The rate of change of delta per dollar move in the underlying.
- Maximum at ATM, near expiry
- The source of the dealer hedging feedback loop

**For futures:** Gamma is the *urgency* of dealer hedging. When gamma is high (near ATM, near expiry), a small price move forces large delta adjustments → large futures buying or selling. This is GEX in action.

### Vega (ν)
```
ν = ∂V/∂σ
```
How much the option price changes for a 1% change in implied volatility.
- Long options have positive vega (profit from vol expansion)
- Short options have negative vega (profit from vol compression)

**For futures:** Vega tells you about the demand for volatility protection. When puts are heavily bought (high put vega demand), it signals institutional fear. When vega is compressed, it signals complacency.

### Theta (Θ)
Time decay — options lose value each day.
- Long options: pay theta (you lose value each day the underlying doesn't move)
- Short options: collect theta

**For futures:** The theta-gamma trade-off is the primary tension in options. Long gamma (short-dated options) = big futures moves are your friend. Short gamma (sold options, collected premium) = you need calm markets.

### Vanna (∂Δ/∂σ) and Charm (∂Δ/∂t) — Second-Order Greeks
These second-order Greeks create *additional* forced dealer flows:
- **Vanna:** When implied volatility changes, delta changes → additional hedging required
- **Charm:** As expiry approaches, delta decays → additional hedging required to stay delta-neutral

These are the flows that make OPEX week and vol spike events so dislocating — dealers are adjusting not just their primary delta hedge but also their vanna and charm exposures.

---

## 1.3 The Black-Scholes Model — What It Tells You

The Black-Scholes formula prices options assuming constant volatility, continuous trading, and no jumps. All three assumptions are violated in real markets. **This is the source of your edge.**

```
C = S₀N(d₁) − Ke^(−rT)N(d₂)

d₁ = [ln(S₀/K) + (r + σ²/2)T] / (σ√T)
d₂ = d₁ − σ√T
```

**The volatility surface:** Because Black-Scholes assumes constant vol but reality has a *smile/skew*, the implied volatility you back out from market prices is different for different strikes. This *volatility surface* is a map of what the market thinks about tail risk, skew, and future vol at different strikes and tenors. Reading it is an information edge. See: [[L13 - IV and Volatility]].

**Put-call parity:**
```
C − P = S₀ − Ke^(−rT)
```
This relationship must hold by arbitrage. Deviations (before financing costs) signal positioning stress or localized imbalances.

---

## 1.4 The Dealer Ecosystem

The options market is dominated by dealers (market makers) who must remain delta-neutral. This creates deterministic, forecastable hedging flows:

**When a customer buys calls from a dealer:**
1. Dealer is now short calls (negative gamma)
2. Dealer must *buy* futures to delta-hedge (go long delta)
3. If price rises, dealer's short call gains delta → dealer must *buy more* futures
4. If price falls, dealer's short call loses delta → dealer must *sell futures*
→ **In negative gamma: dealers amplify moves**

**When a customer buys puts from a dealer:**
1. Dealer is now short puts (negative gamma, negative delta)
2. Dealer must *sell* futures to delta-hedge
3. If price falls, dealer must *sell more* futures (put delta increases)
→ **Same amplification mechanic on the downside**

**When dealers are long gamma (they bought the options):**
- Dealers become natural stabilisers — they sell into rallies and buy into dips to stay delta-neutral
- This is the positive GEX environment: mean-reverting, pinned to strike price

---

## 1.5 Expiry Structure — Weeklies, Monthlies, 0DTE

**Monthly options** (standard expiry): Third Friday of each month for equity indices. Maximum open interest, maximum gamma exposure at expiry.

**Weekly options**: Expire every Friday. Lower premium, higher gamma risk.

**0DTE (Zero Days to Expiry)**: Options expiring the same day. Gamma is theoretically infinite at the money — any move forces massive dealer hedging. 0DTE volume on SPX now exceeds 40% of all SPX option volume, fundamentally changing intraday futures dynamics.

**The 0DTE effect on futures:**
- Morning 0DTE positioning by retail → afternoon dealer hedging → intraday momentum that can be explosive
- 0DTE activity peaks in the 1–3pm window as time decay accelerates
- The final 30 minutes (3:30–4pm) frequently sees violent moves as 0DTE positions are settled or hedged

---

# PART 2 — PRACTICE

## 2.1 The Options-Futures Translation Framework

For every options market observation, translate it into a futures market implication:

| Options Signal | Futures Implication |
|---|---|
| Heavy call buying at strike X | Dealers short gamma near X → buying futures → potential pin/magnet at X |
| Heavy put buying at strike Y | Dealers short gamma below Y → selling futures below Y → acceleration point |
| Net long gamma (GEX positive) | Futures market will mean-revert, hard to trend |
| Net short gamma (GEX negative) | Futures market will trend/amplify → trade breakouts |
| IV rising with price falling | Fear premium building → VIX spike risk → reduce long futures |
| IV falling with price rising | Complacency building → low vol regime → range-bound approach |

---

## 2.2 Identifying When Options Drive Futures

Options flows drive futures most powerfully under these conditions:
1. Near-term expiry (0DTE or weekly) → high gamma → large dealer hedging per tick
2. Price near a high-OI strike → gamma concentrated → pin/wall effect
3. IV rapidly changing → vanna flows → additional hedging layer
4. Post-OPEX unwind → dealers removing hedges → directional move freed

**Rule of thumb:** If price is within 0.5% of a high-OI strike with <5 days to expiry, the options market is likely dominating price action. Don't fight the pin.

---

## 2.3 Greeks Monitoring Checklist

For each trading session:
```
□ What is the nearest high-OI call/put strike?
□ Is GEX positive (mean-revert) or negative (trend)?
□ What is the gamma flip level (where GEX turns from + to −)?
□ Is IV rising or falling vs. yesterday?
□ How many days to the nearest monthly expiry?
□ Is 0DTE volume unusually high today?
```

These inputs feed directly into your regime identification for the session.

See: [[Concepts/GEX]] · [[Concepts/Gamma Flip]] · [[Concepts/Call Put Walls]] · [[Greeks/Greeks Introduction]]

---

## Connections

| Concept | Links |
|---|---|
| Delta hedging → dealer flows | [[Concepts/Dealer Hedging]] · [[Concepts/GEX]] |
| Greeks | [[Greeks/Delta]] · [[Greeks/Gamma]] · [[Greeks/Theta]] |
| 0DTE effect | [[L15 - OPEX Mechanics]] · [[Regimes/OpEx Pinning Regime]] |
| Volatility surface | [[L13 - IV and Volatility]] · [[Volatility/IV Skew & Smile]] |
| Black-Scholes | [[Concepts/Implied Volatility]] · [[Volatility-Concepts/IV Crush]] |

---

## Tags
`#lecture` `#phase-3` `#options` `#greeks` `#delta` `#gamma` `#vega` `#theta` `#dealer-hedging` `#black-scholes`

*Next → [[L11 - Options Chain]]*
*Previous → [[L9 - Narrative Shifts]]*
