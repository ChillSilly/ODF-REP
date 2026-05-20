# R4 — Market Impact

**Tags:** `#microstructure` `#market-impact` `#execution`
**Links:** [[Concepts/Market Impact]] · [[Lectures/Phase-4-Order-Flow/L16 - Market Microstructure]]

---

Large orders have two types of impact:

**Instantaneous impact:** Price moves immediately when a large order hits the book. The larger the order relative to available depth, the larger the impact.

**Decayed impact:** After the large order is filled, price partially reverts. The permanent component = information content of the trade. The temporary component = pure liquidity demand.

**Practical use:** When you see a large tape print move price sharply, wait for the decay before entering. The initial move often overshoots by 30–50% of the eventual permanent impact. Chasing the initial spike = entering at the temporary overshoot.
