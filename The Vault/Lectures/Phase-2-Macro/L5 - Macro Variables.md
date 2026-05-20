# L5 — Macro Variables That Move Futures

> **Lecture 5 of 27 — Phase 2: Macro Narrative**
> Four variables drive the majority of futures price action: interest rates, the dollar, inflation, and growth. Master their relationships and you can construct a narrative from almost any data point.

---

# PART 1 — THEORY

## 1.1 Interest Rates — The Master Variable

Interest rates are the most powerful macro variable for futures traders because they affect *every* asset class simultaneously through the discount rate mechanism.

**The mechanism:**
- Higher rates → higher discount rate → lower present value of future cash flows → lower equity valuations
- Higher rates → stronger dollar (capital flows to higher-yielding US assets)
- Higher rates → higher carry cost for commodities → lower commodity prices
- Higher rates → tighter financial conditions → lower credit availability → lower growth expectations

**The instruments:**
- Fed Funds Rate: the overnight policy rate set by the FOMC. The anchor.
- 2-Year Treasury Yield (ZT futures): the market's expectation of where the Fed will be 2 years from now. Most sensitive to near-term policy expectations.
- 10-Year Treasury Yield (ZN futures): the sum of expected short-term rates + term premium. The global risk-free benchmark.
- 30-Year Treasury Yield (ZB futures): the long-duration asset most affected by inflation and supply concerns.

**The Yield Spread (2s10s):**
```
Yield Spread = 10Y − 2Y
```
- Positive (normal): Economy healthy, growth expected
- Flat: Uncertainty, late cycle
- Inverted (2Y > 10Y): Recession signal. Has preceded every US recession since 1955 with ~70% accuracy. The mechanism: Fed has raised short rates above long rates, meaning the market expects economic slowdown that will force future rate cuts.

**For futures traders:** Monitor the *rate of change* of yields, not just the level. A 10-year yield rising from 3.5% to 4.5% over 3 months is vastly different from the same move over 3 weeks. Speed matters.

See: [[Macro-Drivers/Interest Rates]] · [[Macro-Drivers/Treasury Yields]]

---

## 1.2 The US Dollar — The Global Liquidity Toggle

The dollar (DXY index) is a measure of global liquidity conditions because most of global trade and financial transactions are denominated in USD.

**Dollar up → tighter global liquidity:**
- Foreign borrowers who owe dollars face higher debt service costs in local currency terms
- Commodity prices fall (priced in USD, dollar appreciation makes them more expensive globally)
- EM assets underperform (dollar strengthens relative to EM currencies)
- Gold typically falls in dollar terms

**Dollar down → looser global liquidity:**
- Global growth improves as dollar financing becomes cheaper
- Commodities rise
- EM assets rally
- Multinationals earn more in dollar terms from foreign revenues

**The key driver of the dollar:**
Real interest rate differentials between the US and other major economies (primarily Europe and Japan). If the US Fed is tightening while the ECB is holding → real rate differential widens → capital flows to the US → dollar strengthens.

**The 2025 context:** Dollar strength driven by US growth exceptionalism + sticky inflation keeping Fed higher for longer vs. ECB cutting. This created a headwind for commodities and EM but supported US equity earnings from domestic companies.

See: [[Macro-Drivers/Inflation]] · [[Concepts/Risk Appetite]]

---

## 1.3 Inflation — The Policy Driver

Inflation doesn't move futures directly — it moves *expectations* for Fed policy, which then moves rates, the dollar, and eventually everything else.

**The transmission chain:**
```
CPI/PCE print → Fed policy expectations → rates → dollar → equities/commodities
```

**Why it matters for futures traders:**
The Fed's dual mandate (price stability + full employment) creates a mechanical policy response to inflation data. When CPI beats expectations → Fed must stay hawkish → rates reprice higher → equities discount rate adjusts → NQ (long-duration growth) sells off more than ES.

**CPI vs PCE:**
The Fed officially targets PCE (Personal Consumption Expenditures), not CPI. PCE uses a chain-weighted methodology that is generally 0.3–0.5% lower than CPI. Markets track CPI because it is released first and is more widely followed.

**Core vs Headline:**
- Headline: includes food and energy (volatile)
- Core: excludes food and energy
- Supercore (Fed's preferred): core services excluding shelter (most sticky, hardest to reduce)

For futures trading: the surprise in headline CPI drives the immediate reaction. But the *supercore* trend determines whether the narrative is truly changing.

**The NDX vs SPX inflation sensitivity:** Research from Nasdaq confirms NDX volatility has historically been ~2–6% higher annually than SPX. In high-inflation/high-rate environments, this differential widens further because NQ is more duration-sensitive (higher P/E, more future cash flows discounted). When rates spike, sell NQ first, then ES.

See: [[Macro-Drivers/Inflation]] · [[Catalysts/CPI Release]]

---

## 1.4 Growth — The Earnings Anchor

GDP and its leading indicators set the earnings trajectory that ultimately justifies equity valuations.

**Key growth indicators:**

| Indicator | Type | Frequency | What It Measures |
|---|---|---|---|
| PMI Manufacturing | Leading | Monthly | Factory order pipeline |
| PMI Services | Leading | Monthly | Service sector expansion |
| ISM Non-Manufacturing | Leading | Monthly | Broader business activity |
| Retail Sales | Coincident | Monthly | Consumer spending |
| NFP (jobs) | Coincident | Monthly | Labour market health |
| GDP | Lagging | Quarterly | Overall output |
| Yield Curve | Leading | Daily | Market-implied growth expectations |

**The PMI threshold:** Above 50 = expansion, below 50 = contraction. When PMI crosses 50 from above or below → narrative shift signal.

**The Growth-Inflation quadrant:**
| Growth | Inflation | Regime | Best Assets |
|---|---|---|---|
| Rising | Falling | Goldilocks | Equities, credit |
| Rising | Rising | Overheating | Commodities, short bonds |
| Falling | Rising | Stagflation | Commodities, cash, defensive |
| Falling | Falling | Recession/Deflation | Long bonds, gold |

**Identifying the quadrant you're in is the single most important macro decision** — it tells you which assets to own and which to avoid.

---

## 1.5 The Taylor Rule — What the Fed "Should" Do

The Taylor Rule provides a mechanical benchmark for where the Fed funds rate should be given current economic conditions:

```
i = r* + π + 0.5(π − π*) + 0.5(y − y*)
```

- `r*` = equilibrium real rate (~2%)
- `π` = current inflation
- `π*` = target inflation (2%)
- `y − y*` = output gap (actual minus potential GDP)

**Why this matters for traders:** When the Fed funds rate is significantly *above* the Taylor Rule estimate → policy is restrictive → disinflation ahead → rate cuts coming → bullish duration (long ZN/ZB). When *below* the Taylor Rule → policy is too loose → inflation risk → hikes coming → bearish duration.

Comparing the current rate to the Taylor Rule estimate tells you the direction and urgency of future policy changes — months before the market fully prices them.

---

# PART 2 — PRACTICE

## 2.1 The Four-Variable Morning Scan

Every morning before the open, check these four readings in 5 minutes:

```
1. 10-Year yield: direction (vs. yesterday, vs. last week)
2. Dollar (DXY): direction and strength
3. Inflation expectations: 10-year breakeven (TIPS spread)
4. Growth proxy: PMI reading or equity futures gap (pre-market)
```

**Quick interpretation:**
- Yields up + Dollar up + Equities down = risk-off, inflation fear or Fed hawkishness
- Yields down + Dollar down + Equities up = risk-on, growth/easing expectations
- Yields up + Equities up = growth optimism (economy strong, rates rise for "right reasons")
- Yields down + Equities down = growth fear / recession signal

---

## 2.2 The Inflation Surprise Trade

The most reliable intraday setup from macro variables is the **CPI/PCE surprise trade**:

**Setup: CPI beats expectations (higher than forecast)**
1. Initial reaction: equities sell, yields spike, dollar rises
2. Wait 15–30 minutes for the initial move to complete
3. Check: was the beat in core or just energy/food? (food/energy = less policy-relevant)
4. If core beat: the move is real, don't fade it. Stay on the right side of rates.
5. If headline beat but core in-line: initial move likely fades. Fade the equity selloff after 15 minutes.

**Setup: CPI misses expectations (lower than forecast)**
1. Initial reaction: equities rally, yields fall, dollar falls
2. The quality of the miss matters: shelter and supercore falling = sustainable. Only energy = transitory.
3. Sustainable miss → hold the equity rally through the session
4. Transitory miss → fade the rally after 30 minutes

---

## 2.3 The Growth-Inflation Quadrant Trade

Use the quadrant framework to bias your weekly directional trades:

**Currently in Goldilocks (growth OK, inflation falling):**
- Bias long ES and NQ
- Prefer NQ (higher beta to rate declines)
- Short ZB (rising yields in moderate growth)

**Currently in Overheating (growth AND inflation rising):**
- Short ZN/ZB (rates must rise further)
- Long commodities (CL, GC in real-asset demand)
- Reduce equity exposure or hedge with puts

**Currently transitioning (mixed signals):**
- Reduce all position sizes
- Wait for the next catalyst to resolve the ambiguity
- Trade smaller, keep stops tight

---

## 2.4 Yield Curve Inversion as Top Tick Setup

A deeply inverted yield curve (2s10s deeply negative) historically precedes recessions. But equities can still rally for months after inversion — the inversion signals recession risk, not immediate recession.

**The top tick setup:**
1. Yield curve deeply inverted (>-50bps) for 6+ months
2. Equities at or near all-time highs (market ignoring the signal)
3. CTA and speculative positioning near multi-year highs (crowd is in)
4. Leading indicators begin to roll over (ISM below 50, jobs revisions down)
5. A catalyst confirms the deceleration → entry short

This is a months-long setup, not a daily trade. But when it resolves, the move is 20–40% in equity indices. This is your highest-timeframe top tick setup.

---

## Connections

| Concept | Links |
|---|---|
| Rates → GEX → vol | [[Concepts/GEX]] · [[Volatility-Concepts/VIX]] |
| Dollar → intermarket | [[L7 - Intermarket Relationships]] · [[Macro-Drivers/Interest Rates]] |
| Inflation → catalyst | [[Catalysts/CPI Release]] · [[L8 - Economic Calendar]] |
| Growth quadrant | [[Regimes/Short Gamma Regime]] · [[Bridge - Regimes to Strategies]] |
| Taylor Rule → policy cycle | [[L6 - Central Banks]] · [[Catalysts/FOMC Decision]] |
| NDX vol premium | [[Volatility-Concepts/VIX]] · [[Volatility-Concepts/Volatility Regime]] |

---

## Tags
`#lecture` `#phase-2` `#macro` `#rates` `#dollar` `#inflation` `#growth` `#taylor-rule` `#yield-curve`

*Next → [[L6 - Central Banks]]*
*Previous → [[L4 - Narrative Framework]]*
