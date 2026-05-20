# AMT — Auction Market Theory

> *"Markets are continuous two-way auctions. Their sole purpose is to facilitate trade and discover fair value."*
> Source: Jewraj Microstructure & Orderflow + Steidlmayer (CBOT, 1980s)

**Tags:** `#orderflow` `#AMT` `#foundation` `#auction`
**MOC:** [[00-MOC/MOC - Orderflow]]
**Links:** [[Orderflow/Volume Profile]] · [[Orderflow/TPO and Market Profile]] · [[Orderflow/Footprint Chart]] · [[Profile-Levels/POC]] · [[Profile-Levels/VAH]] · [[Profile-Levels/VAL]] · [[Lectures/Phase-4-Order-Flow/L18 - Market Profile and AMT]]

---

## What AMT Is

Auction Market Theory treats financial markets as **continuous two-way auctions** where price moves by the constant negotiation of buyers and sellers. The market has two core objectives:

1. **Facilitate trade** — bring buyers and sellers together
2. **Seek fair price** — find the level where buyers and sellers are in relative agreement

AMT was developed by J. Peter Steidlmayer at the Chicago Board of Trade in the early 1980s. He introduced Market Profile as its visual expression.

**Key distinction:** *Value* (where most trading occurs, where buyers and sellers agree) is separate from *Price* (the current advertised level). Prices away from value are "unfair" until supply or demand brings the market to a new balance.

---

## The Three Variables

AMT measures the auction's success through three variables:

| Variable | What It Measures |
|---|---|
| **Price** | Where the market is advertising |
| **Time** | How long price spends at each level (acceptance vs. rejection) |
| **Volume** | Amount of participation at each level |

These three together reveal where the market found consensus (value) and where it rejected prices (imbalance).

---

## Price vs Value — The Core Distinction

**Price** = current advertisement in the auction. Where the market is *right now*.

**Value** = the area where most trading occurs. Where buyers and sellers willingly transact. Associated with high volume nodes (HVNs), the Value Area (VA), and the Point of Control (POC).

**The mechanism:** When price moves away from value, it creates opportunity. Without a strong catalyst for a new trend, prices at "unfair" levels tend to revert back to the value area. This is the mechanical basis for mean-reversion trades.

---

## Market States — Balance vs Imbalance

### Balanced Market (Equilibrium)
- Price rotating in a range near fair value
- High volume at the value area (acceptance)
- No strong directional bias
- Bell-curve Market Profile shape
- Short-term traders dominate
- **Strategy: mean reversion — fade extremes, target POC/VWAP**

### Imbalanced Market (Trending / Discovery)
- One side of the auction dominates
- Price "goes into discovery" seeking a new fair value
- Strong directional movement, price moves through levels quickly
- Low time spent at prices (single prints, tails)
- Often driven by "other time frame" (OTF) institutional participants
- Skewed or elongated Market Profile shape
- **Strategy: trend following — trade pullbacks in direction of imbalance**

```
Trading Strategy = f(Market State)
Balance → Mean reversion
Imbalance → Trend following
```

---

## The Five AMT Trading Rules

**Rule 1:** If price re-enters a previous balance area, it often retests one edge then travels to the opposite edge (range rotation).

**Rule 2:** Once price is accepted beyond a balance, it will usually continue in that direction until meeting the next balance (often the prior POC).

**Rule 3:** Balanced conditions call for patience and fading extremes.

**Rule 4:** Trending conditions call for momentum trading aligned with the dominant side of the auction.

**Rule 5:** Avoid chasing "unfair" prices. Respond to how the market responds to value.

---

## The Three AMT States (Practical Framework)

Jewraj's integration of AMT with volume profile identifies three live states:

1. **Seeking Balance** — Price is moving *toward* a balance area. In transit between zones of acceptance.
2. **Accepting Balance** — Price agrees with the current balance area. Two-sided trade is active.
3. **Rejecting Balance** — Price disagrees with the current balance area. Buyers and sellers think price should be elsewhere.

> *"When price tests a lower balance edge and then tests an upper balance edge and agrees with both extremes — we are now seeking balance at a different level."* — Jewraj

---

## Price Discovery Process

```
Price Discovery = Auction Process + Order Flow + New Information
```

The market constantly tests prices higher and lower until finding areas where:
- Buyers are willing to buy
- Sellers are willing to sell
- Both agree on fair value

**Integration with microstructure:** AMT aligns with academic concepts of continuous double auction markets, order flow dynamics, and liquidity provision and price discovery.

---

## Participant Types in AMT Context

**Short-term traders (locals):** Take liquidity with aggressive market orders. Their trades cause imbalances. They represent the noise.

**Long-term institutional players (OTF — Other Time Frame):** Provide liquidity, shift price from imbalance to balance. Their actions define the real structural moves.

Understanding which type is in control predicts whether the market will continue rotating in a range or break into a directional trend.

---

## Practical Implementation (5-Step Process)

1. Identify current market state (balanced or imbalanced)
2. Locate key auction levels (value area, POC, prior balance areas)
3. Wait for price to reach decision points (value extremes, breakout levels)
4. Confirm with orderflow (aggression, acceptance/rejection — see [[Orderflow/Footprint Chart]], [[Orderflow/Tape (Time and Sales)]])
5. Enter with clear risk management (stops at acceptance/rejection levels)

---

## Orderflow Confirmation Tools for AMT

| Tool | What It Confirms |
|---|---|
| [[Orderflow/DOM (Depth of Market)]] | Liquidity at key levels |
| [[Orderflow/Tape (Time and Sales)]] | Market aggression (market orders hitting bids/offers) |
| [[Orderflow/Delta (Bid-Ask Delta)]] | Which side is in control |
| Tape speed | Fast = strong imbalance, Slow = balance |

---

## Connections

| Concept | Link |
|---|---|
| Value area levels | [[Profile-Levels/VAH]] · [[Profile-Levels/VAL]] · [[Profile-Levels/POC]] |
| Balance area identification | [[Orderflow/Volume Profile]] |
| Day type classification | [[Orderflow/TPO and Market Profile]] |
| Execution confirmation | [[Orderflow/Footprint Chart]] · [[Orderflow/Delta (Bid-Ask Delta)]] |
| Lecture reference | [[Lectures/Phase-4-Order-Flow/L18 - Market Profile and AMT]] |
| Liquidity voids | [[Profile-Levels/LVN]] · [[Profile-Levels/Single Prints]] |
