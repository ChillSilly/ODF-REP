# Dealers / Market Makers

**Tags:** `#participants` `#dealers`
**Links:** [[Concepts/GEX]] · [[Concepts/Dealer Hedging]] · [[Options-Flow/Dealer Hedging Mechanics]] · [[Participants/HFTs]] · [[Lectures/Phase-1-Foundations/L3 - Market Participants]]

---

**Who:** Proprietary trading firms, bank flow desks, designated HFT market makers (Citadel Securities, Virtu, IMC).

**Mandate:** Stay delta-neutral. Profit from bid-ask spread and short-term inventory management. No directional view.

**Behavioural signature:**
- Provide liquidity in normal conditions, withdraw in stress
- Gamma hedging obligations force mechanical futures buying/selling regardless of view
- Their withdrawal = [[Microstructure/R5 Fragmentation]] regime

**In the GEX framework:** Dealers' options books determine whether they are long or short gamma → determines market regime → see [[Concepts/GEX]]

**Forced flows from dealers:**
- OPEX: unwind hedges at/after expiry → post-OPEX directional move
- Vol spike: reduce gamma exposure → pull book → [[Microstructure/R5 Fragmentation]]
- Charm/vanna flows: end-of-day systematic rebalancing
