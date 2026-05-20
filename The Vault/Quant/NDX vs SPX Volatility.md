# NDX vs SPX Volatility

> Source: Nasdaq Global Information Services — "Nasdaq-100 Higher Volatility than the S&P 500" (Efram Slen, 2019)

**Tags:** `#quant` `#NQ` `#ES` `#volatility` `#NDX`
**Links:** [[Volatility/VIX]] · [[Concepts/Implied Volatility]] · [[Lectures/Phase-3-Options-Flow/L13 - IV and Volatility]]

---

## The Key Findings

**NDX has historically higher realised volatility than SPX — but not by as much as commonly assumed.**

Annual volatility differential (NDX − SPX):
- Range: typically 0.5% to 6.2% higher annually
- Average excess return of NDX over SPX: ~7% annually
- NDX outperformed SPX 10 out of 12 years (2007–2019)

**The surprising finding:** During the post-GFC recovery (2009–2010), NDX had *lower* volatility than SPX despite dramatically higher returns. The beta advantage worked: NDX captured upside without proportional downside vol during the recovery.

---

## VXN vs VIX

VXN (Nasdaq-100 vol index) tracks VIX closely but is typically 2–5 points higher.

**VXN/VIX Ratio as a Signal:**
- VXN/VIX > 1.15: Tech-specific stress → NQ underperforms ES → trade NQ short relative to ES long
- VXN/VIX ≈ 1.05: Normal — no specific signal
- VXN/VIX < 1.0: Unusual (typically in bear markets when growth leads down)

---

## Why NQ > ES Volatility

1. **Concentration:** NQ has 100 components vs S&P 500's 500 — higher single-name risk
2. **Sector tilt:** 55%+ tech weight — more cyclical, more sensitive to rates and growth expectations
3. **Duration sensitivity:** Higher P/E, longer duration assets — more sensitive to rate changes
4. **Liquidity:** Slightly thinner than ES at times, amplifying moves

---

## Trading Implications

**In rising rate environments:** Short NQ before ES — NQ is more duration-sensitive, reprices faster.

**In vol spikes:** NQ typically falls more than ES — the VXN premium widens further in stress.

**For options:** NQ options are *relatively cheaper* than ES options on a realised-vs-implied basis (NQ typically delivers more vol than priced in). NQ options provide better bang-for-buck for directional strategies.

**For top/bottom tick setups:** An NQ/ES SMT divergence (ES makes new low but NQ doesn't) is a high-conviction bottom tick signal — see [[Lectures/Phase-4-Order-Flow/L20 - Liquidity Sweeps and Engineered Moves]].

---

## Connections

[[Volatility/VIX]] · [[Lectures/Phase-3-Options-Flow/L13 - IV and Volatility]] · [[Lectures/Phase-4-Order-Flow/L20 - Liquidity Sweeps and Engineered Moves]]
