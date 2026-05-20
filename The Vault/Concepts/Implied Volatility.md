# Implied Volatility

**Tags:** `#concepts` `#IV` `#options` `#volatility`
**Links:** [[Volatility/VIX]] · [[Volatility/IV Skew and Smile]] · [[Volatility/IV Crush]] · [[Greeks/Vega]] · [[Lectures/Phase-3-Options-Flow/L13 - IV and Volatility]]

---

## Definition

The implied volatility (IV) is the σ value you must input into the Black-Scholes model to match the market price of an option. It is the market's **consensus forecast of future realised volatility** over the option's life.

```
Market price → Black-Scholes model → Implied σ
```

IV is a forward-looking pricing metric — not a prediction, but a risk transfer price.

---

## IV vs Realised Volatility

IV tends to trade **above** realised volatility (volatility risk premium — option sellers are compensated for taking on risk).

When IV >> realised vol: options are expensive → selling vol has positive EV
When IV ≈ or < realised vol: options are cheap → buying vol has positive EV

---

## Key IV Applications

1. **VIX** = model-free 30-day SPX IV → [[Volatility/VIX]]
2. **VXN** = Nasdaq-100 equivalent → historically 2–5 points above VIX
3. **Put skew** = OTM puts cost more than OTM calls → [[Volatility/IV Skew and Smile]]
4. **Term structure** = short-dated IV vs long-dated IV → [[Lectures/Phase-3-Options-Flow/L13 - IV and Volatility]]
5. **IV crush** = drop after event resolution → [[Volatility/IV Crush]]

---

## Related

[[Lectures/Phase-3-Options-Flow/L13 - IV and Volatility]] · [[Concepts/GEX]] · [[Volatility/VIX]]
