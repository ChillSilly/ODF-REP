# L2 — Futures Pricing

> **Lecture 2 of 27 — Phase 1: Foundations**
> Futures don't trade at spot price. Understanding *why* — and when the gap distorts — is structural edge.

---

# PART 1 — THEORY

## 1.1 The Cost of Carry Model

Futures price at **fair value** relative to spot through the cost-of-carry relationship:

```
F = S × e^(r−q)T      [continuous compounding]
F = S × (1 + r − q)T  [discrete approximation]
```

- `S` = current spot price
- `r` = risk-free rate (financing cost)
- `q` = continuous yield (dividends for equity, convenience yield for commodities)
- `T` = time to expiration in years

**Intuition:** If you can buy the index at 5,000 today and hold it, you forgo the risk-free rate but receive dividends. A futures contract at fair value makes you indifferent between owning spot and owning futures.

**Current context (2025–2026):** With risk-free rates elevated (Fed funds at multi-year highs), the fair value premium of equity index futures over spot is significantly larger than the ZIRP era. An ES contract 3 months out trades ~15–25 points above spot vs. ~2–5 points in 2020–2021. This matters for basis trades and for reading apparent "gaps."

---

## 1.2 The Basis

```
Basis = Futures Price − Spot Price
```

In normal markets (positive carry), basis is positive — futures trade above spot. The basis **decays** toward zero as expiration approaches. This decay is deterministic and predictable.

**Strengthening basis:** Futures rise faster than spot (or fall slower). Net bullish signal — new money entering via futures.

**Weakening basis:** Futures fall faster than spot. Net bearish signal — hedging flow or forced liquidation hitting futures first.

**At expiry:** Basis = 0 by convergence. Arbitrageurs enforce this mechanically.

---

## 1.3 Contango vs Backwardation

**Contango** (normal): F > S. The forward curve slopes upward.
- Storage costs + financing exceed convenience yield
- Normal for financial futures and most storable commodities
- Rolling long positions costs money (you sell cheap, buy expensive)

**Backwardation**: F < S. The forward curve slopes downward.
- Acute immediate supply shortage
- Holding the physical commodity is more valuable than the forward
- Rolling long positions earns money (you sell expensive, buy cheap)
- Signals: physical tightness, geopolitical supply risk, acute demand spike

**The 2025 Gold Backwardation:** During the 2025 safe-haven surge (gold surpassing $4,600), COMEX gold went into backwardation — front month priced above deferred. This signalled acute physical demand overwhelming forward supply expectations. The CME responded by raising gold margins to 5% of contract value. This is a live example of how pricing structure feeds into your macro narrative.

---

## 1.4 Roll Yield and the Carry Trade

When you hold a futures position past expiry, you must roll — close the front month and open the next. The **roll yield** is the P&L from this process:

**In contango:** Roll yield is *negative* — you sell the cheaper front month and buy the more expensive back month. Systematic drag.

**In backwardation:** Roll yield is *positive* — you sell the expensive front month and buy the cheaper back month. Systematic gain.

**For index futures:** The roll yield reflects the implied repo rate (financing cost minus dividend yield). When rates are high, the roll costs more, which changes the economics of carry trades and index replication.

---

## 1.5 Implied Repo Rate and Fair Value Gaps

The **implied repo rate** is what the futures market is implying as the financing cost:

```
Implied Repo = [(F/S) − 1] / T − q
```

When the implied repo diverges significantly from actual short-term rates, it signals:
- Large-scale hedging demand (repo above market rate → heavy selling pressure in futures)
- Arbitrage opportunity (large institutional basis trades exploit the gap)
- Structural crowding (one side of the basis trade getting congested)

**Practical use:** If ES futures are trading significantly *below* fair value, it means futures sellers (hedgers, shorts) are dominating. Spot is held up by passive index flows while futures are depressed by active hedging — a technically bearish spread that often resolves with spot catching down.

---

## 1.6 Special Opening Quotation (SOQ) and Expiry Mechanics

Cash-settled futures (ES, NQ) expire against the **Special Opening Quotation** — not the 9:30 opening index level, but calculated from the *opening print* of each individual component stock.

**Why this matters:**
- The SOQ is calculated between 9:30–10:00 on expiry morning
- Some component stocks open late → the SOQ calculation is delayed
- Large open interest at nearby strikes creates **pin risk** in the days before expiry
- This is the mechanical foundation of the OPEX gamma pinning you'll use in Phase 3

**Triple/Quadruple witching:** When equity index futures, equity options, index options, and single-stock futures all expire on the same day (quarterly). Creates the highest volume and most distorted price action of any regular calendar event.

---

# PART 2 — PRACTICE

## 2.1 Reading the Basis for Directional Bias

Check the ES basis (futures vs. fair value) every morning during pre-market:

**Futures trading above fair value:**
- Buyers are paying a premium to get long via futures
- Institutional accumulation or positive macro overnight flow
- Bullish pre-market bias — expect cash to open higher

**Futures trading below fair value:**
- Sellers are aggressively shorting futures
- Hedging flow, risk-off, or institutional distribution
- Bearish pre-market bias — expect cash open to gap down or sell

**Rule:** Fair value deviation of more than 5 ES points in either direction in pre-market is a genuine signal. Less than 5 points is noise.

---

## 2.2 Contango/Backwardation as Macro Regime Signal

Check the forward curve for the key markets you trade or use as inputs:

| Market | Normal State | Backwardation Signal |
|---|---|---|
| ES/NQ | Contango (rates > dividends) | Acute risk-off, forced selling |
| CL (Crude) | Contango or slight backwardation | Supply shock, geopolitical |
| GC (Gold) | Contango | Safe-haven demand surge |
| ZN (10Y) | Normal | Rate expectations shift |

When crude goes into sharp backwardation → immediate supply concern → inflationary pressure → bearish for duration assets (ZN) → narrative input for your macro thesis.

---

## 2.3 Roll Week Rules

The roll typically occurs 5–7 business days before expiry as volume migrates to the next contract.

**Rules:**
1. Switch to trading the back month when it exceeds 50% of open interest
2. Do not use the front month's price action for reference once volume drops below 30% of normal
3. The roll spread (front vs. back month price difference) tells you the market's implied financing cost — deviation from the theoretical cost signals unusual positioning
4. Roll week frequently produces range-bound price action as large holders roll neutrally. Reduce directional bias, tighten targets

---

## 2.4 The Carry Trade Context for Equity Futures

In elevated-rate environments (2023–2026), the carry cost of holding long equity futures is higher than historical norms. This has a structural implication:

- Systematic funds and risk parity strategies that are long equities **via futures** face higher carry costs
- When rates spike unexpectedly, these funds must either reduce position size or hedge more aggressively
- This creates a **rate-sensitivity tail risk** in equity futures that didn't exist during ZIRP

**Your edge:** When 10-year yields spike suddenly (NFP beat, hawkish Fed surprise), watch equity index futures for an exaggerated down move relative to the actual earnings impact. The carry cost repricing is mechanical and often overshoots. That overshoot is your mean-reversion opportunity.

---

## 2.5 Arbitrage Boundaries as Support/Resistance

Fair value acts as a gravitational anchor. Price doesn't stay far from fair value for long because arbitrageurs enforce convergence.

**Practical use:**
- If ES opens 20 points below fair value on no major news → statistical mean-reversion setup (buy)
- If ES opens 25 points above fair value on no major news → fading setup (sell)
- During liquid hours (8am–noon ET) this gap typically closes within 30–60 minutes

**Important caveat:** Fundamental news can shift fair value itself. If the news is bad enough, fair value drops too, so futures being below the *old* fair value is not a buy signal. Always assess whether fair value itself has changed.

---

## Connections

| Concept | Links |
|---|---|
| Fair value basis | [[L1 - Futures Market Structure]] · [[Macro-Drivers/Interest Rates]] |
| Backwardation signal | [[Bridge - Macro Volatility Catalysts]] · [[Catalysts/CPI Release]] |
| Roll mechanics | [[Regimes/OpEx Pinning Regime]] · [[Concepts/GEX]] |
| Carry trade risk | [[Macro-Drivers/Treasury Yields]] · [[Concepts/Risk Appetite]] |
| SOQ / OPEX | [[Concepts/Gamma Flip]] · [[Practice/Pre-Session Checklist]] |

---

## Tags
`#lecture` `#phase-1` `#foundations` `#futures-pricing` `#basis` `#contango` `#backwardation` `#roll` `#carry`

*Next → [[L3 - Market Participants]]*
*Previous → [[L1 - Futures Market Structure]]*
