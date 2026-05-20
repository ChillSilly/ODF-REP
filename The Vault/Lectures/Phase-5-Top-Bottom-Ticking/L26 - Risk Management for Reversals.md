# L26 — Risk Management for High-Conviction Reversals

> **Lecture 26 of 27 — Phase 5: Top/Bottom Ticking**
> The best trade setup in the world means nothing if you size it incorrectly, place your stop in the wrong place, or get shaken out before it works. Risk management is not separate from trading — it is trading.

---

# PART 1 — THEORY

## 1.1 Why Reversal Trades Have Unique Risk Profiles

Top/bottom tick trades have a fundamentally different risk profile from trend-following trades:

**Trend-following risk profile:**
- Many small losses (trend fades that don't follow through)
- Occasional large wins (caught a trend)
- Position sizing is relatively symmetric — each trade is similar risk

**Reversal trade risk profile:**
- Few trades (high selectivity required — A/B grade only)
- Higher conviction per trade (5 layers aligned)
- Larger potential reward per trade (entering at the macro turn)
- But: if wrong, the trend continues against you immediately — no slow decay
- Stop must be placed at the *structural invalidation level*, not at an arbitrary distance

**The key implication:** A reversal trade requires a *binary stop* — either your thesis is right (the reversal is happening) or it is wrong (the trend is resuming). There is no "partial credit." The stop placement is the most important risk decision you make.

---

## 1.2 The Binary Stop Framework

**Where to place stops for reversal trades:**

**Not:** "2 ATR from entry" — this is symmetric sizing that doesn't reflect the binary nature of reversal trades.

**Yes:** At the level where your thesis is definitively invalidated.

**For top tick (short entry):**
- Thesis: the move is exhausted and reversing
- Invalidation: price makes a *new high* beyond the exhaustion zone
- Stop: above the highest wick of the exhaustion zone + 3–5 ticks buffer

**For bottom tick (long entry):**
- Thesis: the move is exhausted and reversing
- Invalidation: price makes a *new low* beyond the absorption zone
- Stop: below the lowest wick of the absorption zone + 3–5 ticks buffer

**Why this matters:** If you place your stop inside the exhaustion zone, you'll be stopped by normal volatility (not by invalidation of your thesis). A proper binary stop is often wider than "standard" — which means you must size smaller to keep dollar risk constant.

---

## 1.3 Sizing for Reversal Trades

**The fixed risk formula:**
```
Contracts = Floor(Dollar Risk / (Stop Distance in points × Tick Value × Ticks per point))
```

**Example (ES bottom tick):**
- Account size: $50,000
- Risk per trade: 1% = $500
- Entry: 5,200
- Stop: 5,185 (15 points = 60 ticks below entry)
- ES tick value: $12.50
- Dollar risk per contract: 60 ticks × $12.50 = $750

- Contracts = Floor($500 / $750) = 0 contracts → **size down to MES**

- MES dollar risk per contract: 60 ticks × $1.25 = $75
- MES contracts = Floor($500 / $75) = 6 MES contracts

**This is the correct approach.** Wide stops require small size. Never widen your stop to fit the trade — reduce the number of contracts.

---

## 1.4 The Convexity of Reversal Trades

From the Unified Trading Framework (Convexity and EV materials): reversal trades at major turning points have *convex payoff profiles*.

**Why reversal trades are convex:**
- Your downside is fixed (the stop at invalidation)
- Your upside scales with the size of the narrative reversal
- At a major macro turn, the upside can be 20–50× your initial risk

**The standard trade:**
- Stop: 15 ES points = $750 per contract
- T1 (50% off): 30 ES points = $1,500 (+2R)
- T2 (25% off): 80 ES points = $4,000 (+5.3R)
- T3 (trailing): 200+ ES points = $10,000+ (13R+)

**This is the payoff distribution you're seeking:** Most trades hit T1 (you're profitable). A portion hit T2 (above breakeven overall). The rare A-grade setups at major macro turns hit T3 (career-defining trades). Manage T3 entries carefully — they are the most valuable trades of the year.

---

## 1.5 Drawdown and Sequence Management

**The Bayesian Kelly implication:** After a losing streak in reversal trades, your Bayesian WR estimate drops. The framework automatically reduces your position size. This is correct — fight the urge to "make it back" by sizing up after losses.

**The losing streak protocol:**
- 2 consecutive losing reversal trades: reduce size by 30%, review setup quality (were they truly A/B grade?)
- 3 consecutive losses: reduce size by 50%, pause for 1 week, review all 3 trades in depth
- 4+ consecutive losses: stop trading this setup entirely, go back to paper trade observation mode

**The winning streak protocol:**
- 3 consecutive winning reversal trades: you may increase size by 15–20% (Bayesian posterior improving)
- Never increase size beyond 2× your standard sizing regardless of win streak
- From the Unified Framework: "dependency analysis" — wins following wins may justify pressing the edge slightly

---

## 1.6 Breakeven Stops — When They Help and When They Destroy Edge

From the Convexity and EV materials: **breakeven stops are mathematically destructive** to high R:R systems.

**Why:**
- Moving stop to breakeven after T1 hit converts a "still running" trade into a binary zero/+2R outcome
- Your T2 and T3 potential is eliminated every time the trade comes back to breakeven and stops you
- A system with 40% WR and 6R winners needs to let winners run to 6R — stopping at BE kills this

**The correct approach: partial profits instead of breakeven stops**
1. At 30–50% of T1 distance: close 20–25% of position, bank partial profit
2. Leave remaining position running to T1, T2, T3
3. Only move stop to BE *after* T1 is hit and you've already banked 50% of the position

This way:
- You have locked-in profit (psychological comfort)
- You maintain significant exposure for the full reversal move
- Your expectancy remains intact

---

# PART 2 — PRACTICE

## 2.1 The Pre-Trade Risk Calculation Protocol

Before every reversal trade entry, complete this calculation:

```
Instrument: [ES / NQ / CL / ZN]
Account size: $[amount]
Risk per trade (from Bayesian Kelly): [%] = $[amount]

Setup grade: [A / B / C]
Grade multiplier: A = 1.0, B = 0.6, C = 0 (no trade)

Adjusted risk: $[amount] × [grade multiplier] = $[dollar risk]

Entry: [price]
Stop: [price]
Stop distance: [points] = [ticks]
Dollar risk per contract: [ticks] × $[tick value] = $[amount]

Contracts: Floor($[adjusted risk] / $[dollar risk per contract]) = [N]

T1 target: [price] | Contracts to close: [N × 0.5]
T2 target: [price] | Contracts to close: [N × 0.25]
T3 trailing: [entry] | Remaining: [N × 0.25]
```

**This calculation takes 2 minutes. Do it every time, without exception.**

---

## 2.2 The Exit Ladder Rules

For every reversal trade, use this exit structure:

**Exit ladder:**
1. At T1 (first structural target): close 50% of position
2. Move stop to entry (not breakeven — entry) on the remaining position
3. At T2: close 25% of position (you're now holding 25% for the full move)
4. Remaining 25%: trail at 1.5× ATR behind price
5. Trail until stop is hit naturally

**The discipline rule:** Once you've closed 50% at T1, the remaining 50% is essentially "free money" — you are trading with profits. This mental accounting helps you hold through pullbacks that would otherwise shake you out of a winning trade.

---

## 2.3 Managing Drawdown to Structural Levels

Reversal trades frequently experience an adverse move before the real reversal begins. The "false break" (stop hunt) pattern can take your trade 10–15 ticks against you before the real reversal.

**Pre-plan for the adverse move:**
- Know in advance: "this trade may go 10 ticks against me before it works"
- This is why your stop is at the *invalidation level*, not at a psychological comfort level
- If the trade goes 10 ticks against you but your stop is 25 ticks away and all five layers are still intact → hold

**The "is anything invalidated?" check:**
If an adverse move occurs, run through the five layers:
- Are any layers no longer valid?
- Did something fundamentally change?
- If no → hold. If yes → exit immediately regardless of distance to stop.

---

## 2.4 The Kelly Sizing Across Multiple Prop Accounts

From the Convexity and EV materials applied to reversal trades:

**Single prop account with A-grade reversal setup:**
- This is your highest-EV trade of the week/month
- Deploy near daily risk limit on this single trade (it earns that allocation)
- If the trade works: cash out the daily target, reset for tomorrow
- If it doesn't: you've used your daily risk allocation on your best setup — no shame

**Multiple prop accounts (3–5 accounts):**
- Enter the same A-grade reversal setup across all accounts simultaneously
- Each account is an independent +EV attempt
- The reversal will not happen on every account on the same day — some will stop out
- The accounts that catch the reversal generate outsized returns (T2, T3 targets)
- This is the correct application of "maximize attempts" from the EV framework

**Breakeven win rate for reversal trades in prop structure:**
If daily risk = $200 and daily target = $1,000 and your reversal setup hits T2 when it works (5:1 R:R):
```
Breakeven WR = $200 / ($1,000 + $200) = 16.7%
```

You only need your reversal trades to work 17% of the time to break even. With a proper A-grade setup, your actual win rate should be 50–60%.

---

## Connections

| Concept | Links |
|---|---|
| Binary stop placement | [[Execution/Stop Placement]] · [[Practice/Invalidation Rules]] |
| Bayesian position sizing | [[Risk and Psychology/Position Sizing]] · [[Execution/Position Sizing]] |
| Breakeven stop mathematics | [[Risk and Psychology/Risk Management]] · [[Risk and Psychology/Drawdown]] |
| Partial profits | [[Execution/Trade Management]] · [[Execution/Target Setting]] |
| Prop firm EV | [[Convexity_and_EV]] · [[Risk and Psychology/Risk Management]] |

---

## Tags
`#lecture` `#phase-5` `#risk-management` `#position-sizing` `#stops` `#exits` `#kelly` `#drawdown` `#convexity` `#prop-firm`

*Next → [[L27 - Daily Ritual and Pre-Market Checklist]]*
*Previous → [[L25 - Case Studies]]*
