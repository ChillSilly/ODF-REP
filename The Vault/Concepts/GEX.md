# GEX — Gamma Exposure

**Tags:** `#concepts` `#GEX` `#dealer-hedging` `#regime`
**Links:** [[Concepts/Gamma Flip]] · [[Concepts/Call Put Walls]] · [[Concepts/Dealer Hedging]] · [[Options-Flow/Dealer Hedging Mechanics]] · [[Regimes/OpEx Pinning Regime]] · [[Greeks/Gamma]] · [[Lectures/Phase-3-Options-Flow/L12 - GEX and DEX]]

---

## Definition

GEX is the aggregate gamma that dealers hold across all outstanding options, converted to dollars of futures they must buy or sell per 1% move in the underlying.

```
GEX = Σᵢ [Γᵢ × OIᵢ × 100 × S² × 0.01]
```

---

## GEX Regimes

| GEX | Dealer Position | Market Behaviour | Strategy |
|---|---|---|---|
| **Positive (large)** | Net long gamma | Mean-reverting, suppressed vol, pinning | Fade extremes, range trade |
| **Near zero** | Unstable | Transitioning — unpredictable | Reduce size |
| **Negative** | Net short gamma | Amplifying, trending, squeeze risk | Trend-follow breakouts |

---

## The Pinning Mechanism

In positive GEX: dealers sell into rallies and buy into dips to remain delta-neutral → mechanically pulls price back toward high-OI strikes → "pinning" effect.

In negative GEX: dealers buy into rallies and sell into dips → amplifies every move.

---

## GEX Flip Level

The price at which aggregate dealer gamma crosses from positive to negative. Crossing this level changes the entire market regime from mean-reversion to amplification.

See: [[Concepts/Gamma Flip]]

---

## Sources

SpotGamma · Volland.com · Squeezemetrics

---

## Related

[[Options-Flow/Dealer Hedging Mechanics]] · [[Regimes/OpEx Pinning Regime]] · [[Lectures/Phase-3-Options-Flow/L12 - GEX and DEX]]
