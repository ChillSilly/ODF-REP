# Black-Scholes and Greeks Math

**Tags:** `#quant` `#options` `#math`
**Links:** [[Greeks/Greeks Introduction]] · [[Concepts/Implied Volatility]] · [[Lectures/Phase-3-Options-Flow/L10 - Options Primer]]

---

## Black-Scholes Formula

```
Call: C = S₀N(d₁) − Ke^(−rT)N(d₂)
Put:  P = Ke^(−rT)N(−d₂) − S₀N(−d₁)

d₁ = [ln(S₀/K) + (r + σ²/2)T] / (σ√T)
d₂ = d₁ − σ√T
```

**Put-Call Parity:** `C − P = S₀ − Ke^(−rT)`

## Greeks Formulas

```
Delta_call = N(d₁)         Delta_put = N(d₁) − 1
Gamma = n(d₁) / (Sσ√T)
Vega = S√T × n(d₁)
Theta_call ≈ −[Sσn(d₁)/(2√T)] − rKe^(−rT)N(d₂)
```

**Key insight:** BS assumes constant σ. Reality: IV varies by strike and maturity → the volatility surface. The deviation from constant vol is where information about risk and fear is stored.

## IV Surface Dimensions

- **X-axis:** Strike (moneyness)
- **Y-axis:** Time to expiration
- **Z-axis:** Implied volatility

The surface reveals: tail risk pricing (skew), term structure of uncertainty (contango/backwardation), and dealer inventory constraints.
