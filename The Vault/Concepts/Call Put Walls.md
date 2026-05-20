# Call and Put Walls

**Tags:** `#concepts` `#options` `#levels` `#GEX`
**Links:** [[Concepts/GEX]] · [[Concepts/Gamma Flip]] · [[Lectures/Phase-3-Options-Flow/L11 - Options Chain]] · [[Regimes/OpEx Pinning Regime]]

---

## Definitions

**Call Wall:** The highest OI call strike above current price. Acts as a magnetic ceiling — dealer hedging flows resist upside extension above it. In positive GEX, it's where the pin is anchored.

**Put Wall:** The highest OI put strike below current price. Acts as magnetic floor in positive GEX. In negative GEX, breaking the put wall accelerates downside (dealers forced to sell more futures).

---

## Mechanics

**Near the call wall:**
- Dealers short calls at that strike → must buy futures as price rises
- Approaching the call wall → accelerating dealer buying → potential for explosive break above
- In pinning regime → price decelerates as it approaches (dealers selling surface above)

**Near the put wall:**
- Dealers short puts at that strike → must sell futures as price falls
- Approaching the put wall → accelerating dealer selling → potential for trap door below
- In pinning regime → price decelerates as it approaches (dealers buying below)

---

## Trading Rules

**Between the walls (positive GEX):**
- Mean-reversion is your friend
- Fade extremes, target VPOC between the walls
- This is the range-bound approach

**Wall breach (negative GEX):**
- Wall breach on volume + stacked imbalances = momentum trade
- Don't fade — follow the break
- Target next structural level or the opposing wall

---

## Related

[[Concepts/GEX]] · [[Concepts/Gamma Flip]] · [[Lectures/Phase-3-Options-Flow/L11 - Options Chain]]
