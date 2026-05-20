# Put Skew

**Tags:** `#concepts` `#options` `#skew` `#volatility`
**Links:** [[Concepts/Implied Volatility]] · [[Volatility/IV Skew and Smile]] · [[Lectures/Phase-3-Options-Flow/L11 - Options Chain]] · [[Lectures/Phase-3-Options-Flow/L13 - IV and Volatility]]

---

## Definition

Put skew is the phenomenon where OTM put options have higher implied volatility than ATM options, which have higher IV than OTM calls:

```
IV_OTM put > IV_ATM > IV_OTM call
```

---

## Why Put Skew Exists

1. **Crash risk / fear:** Puts are bid up as portfolio protection by institutional investors
2. **Leverage effect:** When stocks fall, realised volatility rises, making puts worth more
3. **Convexity premium:** Put buyers are buying tail insurance that dealers are reluctant to sell

---

## Reading Skew

**High put skew (25Δ put IV − 25Δ call IV > 8%):** Elevated fear, heavy institutional protection. Cautious for longs.

**Low/compressed put skew (spread < 4%):** Complacency. Market unhedged. Vulnerable to vol expansion. Classic top tick setup condition.

**Inverted skew (calls bid over puts):** Unusual. Signals either upside squeeze risk or short-squeeze demand.

---

## Related

[[Volatility/IV Skew and Smile]] · [[Concepts/Implied Volatility]] · [[Lectures/Phase-3-Options-Flow/L13 - IV and Volatility]]
