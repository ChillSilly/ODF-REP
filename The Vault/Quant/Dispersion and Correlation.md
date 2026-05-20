# Dispersion and Correlation — The Volatility Map

> *"All bear markets are unpleasant, but those of the 2008 variety are especially so."*
> Source: S&P Dow Jones Indices — The Dispersion-Correlation Map (Chan & Lazzara, 2016)

**Tags:** `#quant` `#macro` `#volatility` `#dispersion`
**Links:** [[Volatility/Volatility Regime]] · [[Volatility/VIX]] · [[Lectures/Phase-2-Macro/L7 - Intermarket Relationships]]

---

## The Framework

Two independent sources of market volatility:

**Correlation** = measure of *timing* — whether index components move in the same direction at the same time.

**Dispersion** = measure of *magnitude* — how much the average stock's return differs from the market's return.

```
Market Volatility ↑ when:
  • Dispersion rises (components moving more)
  • Correlation rises (components moving together)
  • Or both simultaneously
```

**The dispersion-correlation map** plots these two variables against each other. Points near the origin = lower volatility. Points far from origin = higher volatility.

---

## A Tale of Two Crises

### Technology Bubble (2000–2002)
- **High dispersion, below-average correlation**
- Tech stocks fell violently; everything else held
- Sector-specific collapse → diversification worked
- Defensive strategies achieved positive returns despite S&P -38%

### Global Financial Crisis (2008)
- **Above-average dispersion, very high correlation**
- Everything fell together
- Diversification failed — no place to hide
- All stocks co-moved with the market → defensive strategies barely helped

> *"2008 was especially painful given the very high correlations among equity securities. In 2000–2002, there were places for an investor to hide. In 2008, the degree of co-movement left less latitude for defensive strategies to succeed."*

---

## Why This Matters for Futures Trading

**High correlation + high dispersion (2008 scenario):**
- Macro risk dominates — everything moves together
- The only hedge is broad index shorts (ES/NQ short, long ZN)
- Sector relative value trades fail
- Maximum systemic fear → maximise macro signal, minimise micro noise

**High dispersion + low correlation (2000–2002 scenario):**
- Stock-specific risk dominates
- Index shorts alone are insufficient hedge
- Sector rotation is meaningful
- Macro narrative must be supplemented with sector analysis

**Low dispersion + low correlation (normal bull market):**
- Calm, orderly uptrend
- Trend-following works
- GEX pinning works
- Narrative-driven positioning works

---

## Reading the Current Environment

To determine which regime you're in:
1. Check the VIX/VXN relationship — are they moving together or diverging?
2. Check sector correlation — are all S&P 500 sectors rising/falling together?
3. Check individual stock vol vs index vol (dispersion measure)
4. If high correlation: use broad index tools. If low: use sector/relative value tools.

---

## Historical Annual Data (SPX)

| Year | Correlation | Notable Event |
|---|---|---|
| 2008 | Very High (>0.5) | Financial crisis — maximum co-movement |
| 2000–2001 | Below average | Tech bubble — sector-specific |
| 2017 | Low | Calm bull market |
| 2022 | High | Inflation shock — everything sold |

---

## Connections

[[Volatility/Volatility Regime]] · [[Lectures/Phase-2-Macro/L7 - Intermarket Relationships]] · [[Lectures/Phase-5-Top-Bottom-Ticking/L25 - Case Studies]]
