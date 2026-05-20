# L21 — DOM and Tape Reading in Real Time

> **Lecture 21 of 27 — Phase 4: Order Flow**
> The DOM and tape are the market's heartbeat in real time. Reading them correctly separates traders who react to price from traders who read intent — before price confirms it.

---

# PART 1 — THEORY

## 1.1 What the DOM Shows vs What It Hides

The DOM (Depth of Market, Level 2) displays the current order book: all limit orders to buy (bid side) and sell (ask side) at each price level, with their quantities.

**What it shows:**
- The *stated* intention of limit order holders
- The queue depth at each level
- The spread between best bid and best ask

**What it hides:**
- Iceberg orders (only small portions visible)
- Market orders about to hit (they don't appear in the DOM before execution)
- Orders in other venues / dark pools
- The intent behind the orders (hedging vs directional?)

**The critical limitation:** The DOM is a partially visible, partially manufactured picture. Heavy spoofing means large orders that *appear* in the DOM may not be real. Your primary tool for intent is execution — what actually *trades* — not what is merely *offered*.

---

## 1.2 The Tape — Actual Execution

The **time and sales (tape)** is the chronological record of every executed trade: price, size, side (bid or ask), and timestamp.

**Tape reading** is the art of inferring institutional intent from patterns in execution:

**Tape patterns:**
- Consistent large lot executions at the ask (aggressive buyers, repeatedly) → institutional accumulation
- Consistent large lot executions at the bid (aggressive sellers, repeatedly) → institutional distribution
- Small lots alternating bid/ask → retail noise, no directional signal
- Large single print at ask, then silence → one-off trade, wait for follow-through

**Speed of execution:** Fast, sequential prints at the same price → urgency (institutional). Scattered, slow prints → normal flow.

---

## 1.3 Stacking, Absorption, and Flipping

**Stacking:** Multiple consecutive large orders on the same side (all hitting bid or all hitting ask) within a short time window. Signals sustained directional intent.

```
Stacking (bullish): 250x, 180x, 320x, 200x — all at ask in 10 seconds
This is not random. Someone wants long exposure and wants it now.
```

**Absorption:** A large resting order that holds a price level as market orders pound it. The resting order absorbs all the aggression without moving. The balance eventually shifts when the aggressors exhaust their selling/buying.

**Flipping:** When a DOM level that was large bid suddenly becomes large ask — or vice versa. This signals intent has reversed. A large buyer who was defending a level has turned seller — often occurs right before a significant directional move.

**The flip trade:** When you see a large bid at 5,244 absorbing selling, then that bid disappears and a large ask appears at the same level → the former buyer has exited and the former support has become resistance → short opportunity.

See: [[Xhengo/DOM Reviews]]

---

## 1.4 Reading DOM Velocity

**Velocity** is how fast the DOM is changing — how rapidly new orders are appearing, canceling, and adjusting.

**Slow DOM:** Few changes per second. Low institutional activity. Normal range-bound trading. Footprint delta will be balanced.

**Fast DOM:** Rapid order placement and cancellation. Multiple large orders appearing simultaneously. Signs of:
- HFT activity (layering, spoofing)
- Institutional urgency
- Imminent large move

**The velocity spike warning:** When DOM velocity suddenly increases dramatically without a corresponding price move → something is brewing. An institutional player is positioning before a move. Stand by.

---

## 1.5 The DOM in Relation to GEX

Your GEX regime determines how to interpret DOM behavior:

**Positive GEX (dealer suppression):**
- Large resting bids and asks at key levels reflect dealer hedging obligations
- These levels are more reliable (less likely to be spoofed by dealers who must actually trade)
- DOM levels near the pin strike are mechanically defended

**Negative GEX (dealer amplification):**
- DOM is thinner (dealers not providing depth)
- Large orders can move price significantly per contract
- Spoofing is more dangerous (thinner real depth means fake orders create larger impression)

In negative GEX: be skeptical of all DOM levels. In positive GEX: DOM levels near high-OI strikes are more trustworthy.

---

## 1.6 The Xhengo DOM Review Framework

From your Xhengo module, the DOM review protocol categorizes each DOM observation:

**Absorption prints:** Large bid absorbing sell aggression without price moving → bullish signal
**Exhaustion prints:** Delta declining on each push without corresponding price extension → trend ending
**Spoofing identification:** Large order appears → price moves toward it → order cancels → you avoided the trap
**Layering detection:** Multiple orders at different levels all cancel simultaneously → manufactured depth

The key discipline: **React to executed volume, not resting orders.** The tape tells the truth; the DOM lies.

---

# PART 2 — PRACTICE

## 2.1 The Real-Time DOM Reading Protocol

During active trading, continuously cycle through these four reads:

**Read 1: Where is the bid/ask imbalance?**
- Is the bid side consistently deeper than the ask? → More passive buyers waiting → bullish lean
- Is the ask side consistently deeper? → More passive sellers waiting → bearish lean

**Read 2: Are large levels being absorbed or rejected?**
- Price testing a large DOM bid → does the bid hold (absorbed) or give way (rejected)?
- Absorbed → support confirmed → entry opportunity long
- Rejected → false support → short opportunity on break

**Read 3: What is the tape printing?**
- Big lots hitting ask repeatedly? → Stacking buy aggression → follow
- Big lots hitting bid repeatedly? → Stacking sell aggression → follow
- Mixed small lots? → Noise, no signal

**Read 4: Are there flips?**
- Any large bid turn to ask? → Support just became resistance → short
- Any large ask turn to bid? → Resistance just became support → long

---

## 2.2 The Absorption Trade Setup

The DOM absorption trade is the most reliable, highest-conviction entry signal:

**Setup:**
1. Price falls to a key level (VAL, prior day's low, VPOC, structural support)
2. Large resting bid appears at or slightly below the level
3. Aggressive selling hits the bid (tape shows large prints at bid)
4. The bid *holds* — absorbs the selling without breaking
5. After 1–3 minutes, selling volume dries up
6. First buy prints appear at the ask (early buyers re-entering)

**Entry:** When the first aggressive buy appears after the absorption period
**Stop:** Below the resting bid level (if the bid breaks, absorption failed)
**Target:** VWAP or VPOC above

**Patience rule:** The absorption period may take several minutes. Do not enter during the absorption itself — you don't know yet whether the bid will hold. Wait for the selling volume to dry up *first*.

---

## 2.3 The Tape-Reading Speed Drill

Build this skill through deliberate practice:

**Daily drill (5–10 minutes):**
1. Pull up the time and sales for ES during the most active period
2. For each 1-minute window, identify: dominant direction (bid/ask), average size, and any large prints
3. Compare your reading to the next bar's direction: did the tape correctly predict it?

After 30 days of this drill, your tape-reading speed and accuracy will have improved dramatically. This is the same approach the Xhengo module uses for DOM review sessions.

---

## 2.4 When to Ignore the DOM

**Ignore the DOM completely during:**
- First 60 seconds after data releases (algos, not humans)
- During OPEX Friday open (AM settlement distortion)
- When VIX is spiking rapidly (spreads wide, depth fake)
- During news bombs (DOM liquidity withdraws instantly)

In these environments, the DOM is noise. Price will gap through stated levels. Use higher-timeframe structure and wait for normalization.

---

## Connections

| Concept | Links |
|---|---|
| DOM absorption | [[Xhengo/DOM Reviews]] · [[Orderflow-Concepts/Absorption]] |
| Tape stacking | [[Orderflow-Concepts/Stacked Imbalances]] · [[Orderflow-Concepts/Initiative Phase]] |
| Spoofing detection | [[Institutional Behaviour/Order Manipulation]] · [[Microstructure/R5 Fragmentation]] |
| GEX + DOM | [[Microstructure/R1 Dealer Gamma Constraint]] · [[Concepts/GEX]] |
| Flipping | [[Orderflow-Concepts/Bias Shift]] · [[Practice/Pre-Session Checklist]] |

---

## Tags
`#lecture` `#phase-4` `#orderflow` `#DOM` `#tape` `#absorption` `#stacking` `#flipping` `#spoofing` `#velocity`

*Next → [[L22 - Top Bottom Tick Framework]]*
*Previous → [[L20 - Liquidity Sweeps and Engineered Moves]]*
