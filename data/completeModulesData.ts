export const fullModulesContent = {
  // ==================== INTRODUCTION ====================
  "intro": {
    title: "Map and Study Plan",
    phase: "Introduction",
    topics: [
      {
        title: "Course Map",
        tag: "intro",
        content: `
This guide covers the complete spectrum of market regime analysis: from statistical structural break detection (Chow, Bai-Perron, CUSUM) to the implementation of Hidden Markov Models, volatility models (GARCH, HAR-RV), market microstructure (PIN/VPIN, order flow), and practical trading applications with adaptive position sizing and regime-based strategy selection.

**Course statistics:**
- 10 Modules
- 30+ Topics
- 150+ Subtopics
- Infinite depth
        `
      },
      {
        title: "Recommended Study Plan",
        tag: "intro",
        content: `
**Weeks 1-2: Statistical foundations and change point detection**
Concepts: Stationarity (ADF, KPSS), structural breaks (Chow, Bai-Perron), change point detection (PELT, WBS, BOCPD). 14-16 hours.

**Weeks 3-4: Hamilton Markov Switching and the MS family**
Concepts: Hamilton's paper (1989), Hamilton filter, Kim's smoother, EM algorithm. 16-18 hours.

**Weeks 5-6: Hidden Markov Models**
Concepts: Rabiner's three problems (Forward, Viterbi, Baum-Welch), Gaussian HMM, Student-t HMM. 16-20 hours.

**Weeks 7-8: Volatility and Correlation Regimes**
Concepts: HAR-RV, VIX term structure, DCC-GARCH, Copulas, Variance Risk Premium. 14-18 hours.

**Weeks 9-10: Microstructure and Order Flow**
Concepts: PIN, VPIN, Order Flow Imbalance, DOM absorption/exhaustion. 16-20 hours.

**Weeks 11-12: Machine Learning for Regimes**
Concepts: GMM clustering, BOCPD, LSTM, autoencoders. 18-22 hours.

**Weeks 13-14: Options Regimes and Real-Time Detection**
Concepts: GEX/DEX, Charm, vanna flows, Vol surface, SPRT, CUSUM. 16-20 hours.

**Weeks 15-16: Trading Applications**
Concepts: Kelly fraction by regime, Volatility targeting, Regime-strategy mapping. 14-18 hours.
        `
      }
    ]
  },

  // ==================== MODULE 1: FOUNDATIONS ====================
  "m1": {
    title: "Change Point Detection — Beyond Basic CUSUM",
    phase: "Module 1 — Foundations",
    topics: [
      {
        title: "PELT — Pruned Exact Linear Time (Killick, Fearnhead, Eckley 2012)",
        tag: "core",
        content: `
PELT is the reference algorithm for detecting multiple change points when exactness is needed. The core innovation is using dynamic programming with pruning that reduces the complexity from O(n²) to O(n) on average, making it viable for series of millions of data points while maintaining exact optimality.

**1.1 The mechanics of pruning — why it works**

The algorithm minimizes a penalized cost function:
Q(τ₁...τₖ) = Σᵢ C(y_{τᵢ₋₁:τᵢ}) + β·K

where C(y_{s:t}) measures the "inconsistency" of segment [s,t] and β is the penalty factor.

Pruning works as follows: for each point t, a list of "candidates" is maintained. If the cost of reaching t through a candidate is greater than the cost of bypassing it, that candidate is permanently pruned. In practice, this eliminates ~90% of the candidates in financial data.

**1.2 The optimal penalty — the problem of β**

- **BIC**: pen = log(n) · 2 · σ²_returns
- **AIC**: pen = 2 · 2 · σ²_returns  
- **HQC**: pen = 2 · log(log(n)) · σ²_returns

For typical daily returns: pen ≈ 0.03-0.08
For 5-min bars: pen ≈ 0.5-2.0
        `
      },
      {
        title: "BOCPD — Bayesian Online Changepoint Detection",
        tag: "advanced",
        content: `
Adams & MacKay (2007) developed BOCPD, which recursively calculates P(rₜ | x₁:t) where rₜ is the "run length" — the time elapsed since the last change point. This is fundamentally different from batch methods (PELT, WBS): BOCPD is online, delivering a probability distribution over the timing of the change at each timestep.

**2.1 The concept of run length**

rₜ ∈ {0, 1, 2, ...} where rₜ = k means "the last change occurred exactly k bars ago".

**2.2 The hazard function — controlling the rate of changes**

| Hazard Function | Formula | Behavior |
|-----------------|---------|----------|
| Constant | H(r) = 1/λ | Uniform rate of change |
| Geometric | H(r) = 1 - pᵒˡᵈ | Decays with run length |
| Uniform | H(r) = 1 si r ≥ L | Mandatory change after L bars |

For intraday market data, p_old = 0.999 (mean duration ≈ 1000 bars) is a good starting point.
        `
      },
      {
        title: "Structural Breaks — Tests Formales (Chow, Andrews, Bai-Perron)",
        tag: "core",
        content: `
Structural break tests answer a different question: given that you know (or suspect) there is a change, what is the statistical evidence to reject it? While PELT searches for where the changes are, the tests prove if there is sufficient evidence.

**Chow Test (1960)**

Gregory Chow developed the test for when the break point τ is known a priori. The null hypothesis is that the coefficients are equal before and after τ.

F = [(RSS_pooled - (RSS₁ + RSS₂)) / k] / [(RSS₁ + RSS₂) / (n - 2k)]

**Severe limitation**: if you estimate τ from the data, the distribution of the statistic changes and the test is invalidated.

**Andrews SupF and Bai-Perron**

Andrews (1993) proposed searching for the break point over the entire possible range. Bai & Perron (1998, 2003) developed the complete framework for multiple unknown changes. This is the gold standard for regime analysis in financial data.
        `
      },
      {
        title: "Information criteria and selection of the number of regimes K",
        tag: "core",
        content: `
The selection of K (number of regimes) is one of the most delicate problems in practice. K=2 is almost always too simple for financial markets; K>5 introduces overparameterization.

**AIC (Akaike Information Criterion)**
AIC = 2k - 2ln(L̂). Tends to overestimate K in finite samples. Use when the goal is pure forecasting.

**BIC (Bayesian Information Criterion)**
BIC = k·ln(n) - 2ln(L̂). Penalizes more aggressively. Theoretically consistent: selects the correct K with probability 1 as n→∞.

**HQIC (Hannan-Quinn Information Criterion)**
HQ = 2k·ln(ln(n)) - 2ln(L̂). Compromise between AIC and BIC. Particularly useful when there is strong temporal dependence.

| Criterion | Penalty | Tendency | Optimal Use |
|-----------|---------|----------|-------------|
| AIC | 2k | Overestimates K | Pure forecasting, large samples |
| BIC | k·ln(n) | Underestimates K | Regime identification |
| HQIC | 2k·ln(ln(n)) | Intermediate | Strong temporal dependence |

**Practical rule**: For ES/NQ with daily data, K=3-4 captures "bull trending", "bear trending", and "range/mean-reversion". K=4 adds "crisis/crash" as a separate state.
        `
      }
    ]
  },

  // ==================== MODULE 2: MS MODELS ====================
  "m2": {
    title: "Hamilton Markov-Switching Model — Complete Architecture",
    phase: "Module 2 — MS Models",
    topics: [
      {
        title: "Specification of the MS-AR(p) and the three variants",
        tag: "advanced",
        content: `
El modelo MS-AR(p) toma la forma:
yₜ = μ(Sₜ) + Σᵢ φᵢ(Sₜ)(yₜ₋ᵢ - μ(Sₜ₋ᵢ)) + σ(Sₜ)εₜ

donde Sₜ es el estado de Markov no observado. Dependiendo de qué parámetros cambien con el régimen, tenemos tres variantes:

**MSM (Markov Switching in Mean)**
Solo la media μ(Sₜ) cambia. Útil para modelar cambios en el drift sin cambios en la volatilidad.

**MSV (Markov Switching in Variance)**
Solo la varianza σ²(Sₜ) cambia. Especialmente útil para modelar regímenes de volatilidad.

**MSMV (Markov Switching in Mean and Variance)**
Ambos parámetros cambian. La especificación más general y más apropiada para datos financieros reales.

| Variante | Parámetros por estado | Aplicación |
|----------|------------|------------|
| MSM | μ₁, μ₂, σ², φ₁...φₚ | Cambios en drift |
| MSV | μ, σ₁², σ₂², φ₁...φₚ | Regímenes de volatilidad |
| MSMV | μ₁, μ₂, σ₁², σ₂², φ₁...φₚ | Regímenes completos |

**La matriz de transición P**

E[duración | régimen i] = 1 / (1 - pᵢᵢ)

Si p₁₁ = 0.97 (bull market), la duración esperada es 33 días. Si p₂₂ = 0.90 (bear market), la duración esperada es 10 días.
        `
      },
      {
        title: "Hamilton Filter and Kim Smoother",
        tag: "advanced",
        content: `
El filtro de Hamilton es el corazón computacional del MS model. Es análogo al filtro de Kalman pero para estados discretos: calcula recursivamente las probabilidades de estar en cada régimen.

**El algoritmo de filtrado — paso a paso**

El filtro opera en dos etapas por timestep:

**Prediction step:**
ξₜ₊₁|t = P' · ξₜ|t

**Update step:**
ηₜ₊₁(i) = p(yₜ₊₁ | Sₜ₊₁=i, y₁:ₜ)
ξₜ₊₁|t₊₁ = (ηₜ₊₁ ⊙ ξₜ₊₁|t) / Σⱼ ηₜ₊₁(j)·ξₜ₊₁|j

**Smoother de Kim (backward pass)**

Usa toda la muestra T para calcular P(Sₜ | y₁:T). Funciona recursivamente hacia atrás.

| Método | Datos usados | Uso |
|--------|-------------|-----|
| Filtrada: ξₜ|t | datos hasta t | Online, para trading |
| Suavizada: ξₜ|T | datos hasta T | Offline, para análisis |
        `
      }
    ]
  },

  // ==================== MODULE 3: HMM ====================
  "m3": {
    title: "Hidden Markov Models — Architecture and Rabiner's Three Problems",
    phase: "Module 3 — HMM",
    topics: [
      {
        title: "Problem 1 — Evaluation: Forward Algorithm",
        tag: "core",
        content: `
Lawrence Rabiner (1989) formalizó la teoría de HMMs con tres problemas fundamentales.

**Problema 1: Evaluation**
Dada una secuencia de observaciones O = (o₁, o₂, ..., oT) y un modelo λ = (A, B, π), ¿cuál es la probabilidad P(O|λ)?

**Algoritmo Forward**

α₁(i) = πᵢ · bᵢ(o₁)

αₜ(j) = bⱼ(oₜ) · Σᵢ [αₜ₋₁(i) · aᵢⱼ]

P(O|λ) = Σᵢ αT(i)

**Importante**: Usar log-space para evitar underflow.

log αₜ(j) = log bⱼ(oₜ) + logsumexp( log αₜ₋₁(i) + log aᵢⱼ )
        `
      },
      {
        title: "Problem 2 — Decoding: Viterbi Algorithm",
        tag: "core",
        content: `
**Problema 2: Decoding**
¿Cuál es la secuencia de estados más probable que generó la secuencia de observaciones?

**Viterbi vs. decoding marginal**

La diferencia es sutil pero crítica: Viterbi encuentra Q* = argmax_Q P(Q, O|λ), donde Q = (q₁, q₂, ..., qT) es la secuencia completa. El decoding marginal encuentra argmax_i P(Sₜ=i | O) para cada t independientemente.

Para trading, el Viterbi es más apropiado porque queremos la secuencia completa de regímenes. Sin embargo, las probabilidades filtradas son mejores para decisiones en tiempo real.

**Implementación:**

1. Inicialización: δ₁(i) = πᵢ · bᵢ(o₁)
2. Recursión: δₜ(j) = max_i [δₜ₋₁(i) · aᵢⱼ] · bⱼ(oₜ)
3. Backtrack: reconstruir la secuencia óptima
        `
      },
      {
        title: "Problem 3 — Learning: Baum-Welch (EM for HMM)",
        tag: "advanced",
        content: `
**Problema 3: Learning**
Baum-Welch es el algoritmo EM para estimar los parámetros de un HMM cuando no conoces las secuencias de estado.

**E-step: forward-backward para obtener γ y ξ**

γₜ(i) = P(Sₜ=i | O, λ) — probabilidad marginal
ξₜ(i,j) = P(Sₜ=i, Sₜ₊₁=j | O, λ) — probabilidad conjunta

γₜ(i) = αₜ(i)βₜ(i) / Σⱼ αₜ(j)βₜ(j)

**M-step: actualización de parámetros**

π̂ᵢ = γ₁(i)
âᵢⱼ = Σₜ ξₜ(i,j) / Σₜ Σₖ ξₜ(i,k)
μ̂ᵢ = Σₜ γₜ(i)·oₜ / Σₜ γₜ(i)
Σ̂ᵢ = Σₜ γₜ(i)·(oₜ-μ̂ᵢ)(oₜ-μ̂ᵢ)' / Σₜ γₜ(i)
        `
      },
      {
        title: "HMM Multivariado and Factor Reduction",
        tag: "advanced",
        content: `
**HMM for multiple assets**

For multi-asset portfolios, use multivariate HMM where each state has a complete covariance matrix.

**Factor Reduction**

When the number of assets is large, use factor models to reduce dimensionality:
- Extract factors (PCA, FA)
- Apply HMM to the factors
- Reconstruct probabilities for original assets

**Gaussian vs Student-t HMM**

Student-t HMM captures fat tails (kurtosis 6-12 vs. 3 of the Gaussian). Recommended for financial returns.
        `
      }
    ]
  },

  // ==================== MODULE 4: VOLATILITY ====================
  "m4": {
    title: "Volatility Regimes — RS-GARCH, HAR-RV, VIX Term Structure",
    phase: "Module 4 — Volatility",
    topics: [
      {
        title: "HAR-RV — Heterogeneous Autoregressive Realized Volatility (Corsi 2009)",
        tag: "quant",
        content: `
HAR-RV modela la volatilidad realizada como una combinación de componentes de diferentes horizontes temporales: diario (RV_D), semanal (RV_W), y mensual (RV_M).

**La mecánica del HAR**

RV_{t+1} = c + β_D·RV_t + β_W·RV^(W)_t + β_M·RV^(M)_t + εₜ

donde:
RV^(W)_t = (1/5)·Σᵢ₌₀⁴ RV_{t-i}  // 5-day moving average
RV^(M)_t = (1/22)·Σᵢ₌₀²¹ RV_{t-i} // 22-day moving average

**Interpretación de coeficientes típicos:**
- β_D ≈ 0.4-0.6 (alta persistencia diaria)
- β_W ≈ 0.1-0.2 (contribución semanal)
- β_M ≈ 0.05-0.15 (contribución mensual)
- β_D + β_W + β_M ≈ 0.6-0.8 (R² típico)

**HAR-RV con Jumps (HAR-RV-J)**

RV_{t+1} = c + β_D·C_t + β_W·C^(W)_t + β_M·C^(M)_t + β_J·J_t + εₜ

donde C_t = continuous component y J_t = jump component.
        `
      },
      {
        title: "VIX Term Structure — Contango vs Backwardation as regime indicators",
        tag: "core",
        content: `
The VIX is not just a number — its term structure reveals how the market prices volatility risk across different horizons.

**Contango — normal market regime**

Contango: the VIX futures curve has a positive slope. Option sellers receive premium for waiting.

The ratio VIX3M/VIX6M > 1 indicates less deep contango. A very deep contango is a sign of extreme complacency.

**Backwardation — stress regime**

Backwardation: spot VIX > VIX3M > VIX6M. The market is in urgent hedging mode.

Historically, backwardation >15% implies negative Sharpe ratio for short vol strategies.

**VVIX — the volatility of VIX**

High VVIX + low VIX = market paying for protection against a sudden spike = fragile complacency regime.

The VVIX/VIX ratio is particularly informative: levels >5 suggest systemic fragility.
        `
      },
      {
        title: "RS-GARCH — Regime-Switching GARCH",
        tag: "quant",
        content: `
Regime-switching GARCH: the parameters of the variance equation change according to the Markov regime.

**Specification:**

r_t = μ(S_t) + ε_t
σ²_t = ω + α·ε²_{t-1} + β·σ²_{t-1}

where S_t ∈ {1, 2, ..., K} is the regime.

**Applications:**
- More precise volatility forecasting by regime
- Detection of volatility persistence regimes
- Automatic volatility targeting
        `
      }
    ]
  },

  // ==================== MODULE 5: MICROSTRUCTURE ====================
  "m5": {
    title: "Microstructure and Order Flow — PIN, VPIN, OFI",
    phase: "Module 5 — Microstructure",
    topics: [
      {
        title: "PIN — Probability of Informed Trading (Easley & O'Hara 1987, 1992)",
        tag: "advanced",
        content: `
PIN cuantifica la probabilidad de que una orden provenga de un trader informado.

**El modelo de microestructura de PIN**

El modelo asume que los trades llegan según un proceso de Poisson con tasas diferenciadas:
- λᵢ (informados)
- λᵤ (no informados)
- λₑ (arrival de noticias)

**PIN estimado por MLE:**

PIN = λᵢ / (λᵢ + λᵤ)

Cuando PIN es alto, el flujo de órdenes está distorsionado hacia una dirección. Un PIN > 0.5 indica mercado muy adversarial.

**VPIN — Volume-synchronized PIN**

Easley, López de Prado & O'Hara (2012) propuso VPIN como versión sincronizada por volumen:

VPIN = |V_buy - V_sell| / V_total

**Thresholds históricos:**
- VPIN > 0.5 → percentil 90 → régimen de alta toxicidad
- VPIN > 0.7 → percentil 99 → crash inminente (ej. Flash Crash 2010)
        `
      },
      {
        title: "OFI — Order Flow Imbalance and DOM Regimes",
        tag: "advanced",
        content: `
OFI (Order Flow Imbalance) captures the imbalance between buying and selling pressure at the order book level.

**OFI = ΔAsk_size - ΔBid_size**

**Persistent OFI — accumulation/distribution**

- Persistently positive OFI + price rising = institutional accumulation
- Persistently positive OFI + flat price = hidden distribution
- Mean-reverting OFI = balanced regime

**DOM Absorption and Exhaustion**

- **Absorption**: a level of the DOM where there is a large bid/ask that does not disappear = defensive institutional limit. The price touches this level repeatedly but does not cross it.
- **Exhaustion**: price moves aggressively but volume does not increase (divergence).

In footprint: bars with positive delta but closes at lows = buying exhaustion.
        `
      }
    ]
  },

  // ==================== MODULE 6: CORRELATIONS ====================
  "m6": {
    title: "Correlation Regimes — DCC-GARCH, Copulas, Risk-On/Off",
    phase: "Module 6 — Correlations",
    topics: [
      {
        title: "DCC-GARCH (Engle 2002)",
        tag: "core",
        content: `
DCC-GARCH for dynamic correlation matrices.

**Step 1**: Estimate univariate GARCH for each series
**Step 2**: Calculate standardized residuals
**Step 3**: Estimate correlation dynamics

**Equation:**

Qₜ = (1-a-b)·S + a·uₜ₋₁uₜ₋₁' + b·Qₜ₋₁

where S is the unconditional correlation matrix.

The parameters a and b control the persistence of correlation changes:
- a + b ≈ 1 → high persistence (correlations change slowly)
- a + b < 1 → mean-reverting
        `
      },
      {
        title: "Copulas — Non-Linear Dependence and Tail Dependence",
        tag: "advanced",
        content: `
Copulas capture non-linear dependence and tail dependence that linear correlation misses.

**Types of Copulas:**

- **Gaussian**: linear correlation, has no tail dependence
- **Student-t**: has symmetric tail dependence
- **Clayton**: asymmetric dependence (more dependence in left tail)
- **Gumbel**: asymmetric dependence (more dependence in right tail)

**Market Application:**

Gaussian correlation drastically underestimates the probability of joint crashes. In crises, correlations increase but not in a linear fashion — copulas capture this.

**Copula selection:**
- Use log-likelihood, AIC, BIC
- Validate with backtesting of VaR and CVaR
        `
      },
      {
        title: "Risk-On/Risk-Off and the Correlation Regime",
        tag: "core",
        content: `
The "Risk-On/Risk-Off" regime describes the state where all assets move together according to risk sentiment.

**Risk-On:**
- High willingness to take risk
- Buy risky assets (equities, commodities)
- Sell safe assets (bonds, gold, JPY, CHF)
- Correlations between risky assets increase

**Risk-Off:**
- Low willingness to take risk
- Sell risky assets
- Buy safe assets
- Correlations between all assets increase (co-movement)

**Regime indicators:**
- High VIX + stocks falling = Risk-Off
- Low VIX + stocks rising = Risk-On
- Credit spreads widen = Risk-Off
        `
      }
    ]
  },

  // ==================== MODULE 7: ML ====================
  "m7": {
    title: "Machine Learning for Regime Classification",
    phase: "Module 7 — ML",
    topics: [
      {
        title: "GMM — Gaussian Mixture Model and clustering for regimes",
        tag: "core",
        content: `
GMM is an HMM without temporal dependence: each observation is assigned independently to one of K Gaussian clusters.

**Feature space should include:**
- return_rolling (5 days)
- vol_rolling (20 days)
- skew_rolling
- vol_ratio = RV/IV
- vix_level, vix_slope
- ofi_rolling
- correlation_rolling

**Optimal number of clusters K:**

By: (1) silhouette score, (2) BIC/GIC, (3) economic interpretability.

**GMM vs HMM:**

GMM does not model transitions between states — useful when you only want to characterize the "types" of regimes without worrying about the transition dynamics.
        `
      },
      {
        title: "LSTM for regime classification",
        tag: "advanced",
        content: `
LSTM captures long-term dependencies that HMM and GMM miss.

**Recommended architecture:**

LSTM(64) → Dropout(0.3) → LSTM(32) → Dropout(0.3) → Dense(K, softmax)

Input: sequence of T bars with features [return, vol, vol_ratio, ofi, vix_pct]
Labels: obtained from smoothed HMM

**Critical to avoid overfitting:**

Use strict walk-forward validation — never use random split for time series.

Training should be:
- data up to t_train: fit(t_train)
- predict t_train+1:test
- move the window forward
        `
      },
      {
        title: "Deep Learning for Regimes — Autoencoders and Transformers",
        tag: "advanced",
        content: `
**Autoencoders for anomaly detection**

- Train autoencoder on "normal regime"
- High reconstruction error → abnormal regime
- Does not require labels

**Transformers for regime classification**

- Attention mechanisms capture non-local dependencies
- Embeddings of market features
- Position encoding to capture temporality
        `
      }
    ]
  },

  // ==================== MODULE 8: OPTIONS ====================
  "m8": {
    title: "Options Regimes — GEX/DEX, Vol Surface, 0DTE",
    phase: "Module 8 — Options",
    topics: [
      {
        title: "GEX / DEX — Gamma Exposure (Patton & Sandmann 2020)",
        tag: "core",
        content: `
GEX (Gamma Exposure) = Σ Γ · ΔS · OpenInterest

DEX = dealers' gamma net exposure

**Concept:**
- Dealers long gamma = stabilizers (hedge direction)
- Dealers short gamma = destabilizers

**Positive GEX**: dealers are long gamma, they tend to buy when the price rises and sell when it falls — stabilizes the market.

**Negative GEX**: dealers are short gamma, they tend to exacerbate movements — can cause deleveraging cascades.

**Charm and vanna flows**

These are the mechanisms by which option hedging distorts the underlying:
- Charm: delta hedging of gamma produces temporal flow
- Vanna: sensitivity of delta to volatility affects hedging
        `
      },
      {
        title: "Vol Surface — Skew, Term Structure, Butterfly",
        tag: "advanced",
        content: `
The volatility surface reveals the price of risk by strike and expiration.

**Skew**
At-the-money vs out-of-the-money vol difference. Steep skew = market pricing tail events.

**Term Structure**
Contango vs backwardation in the vol curve.

**Butterfly**
Relationship between extreme strikes and the center.

**Regime classification by vol surface:**
- High vol + high skew = crisis regime
- Low vol + flat skew = complacency regime
- Steep term structure = normal contango
        `
      },
      {
        title: "0DTE — Zero Days to Expiration",
        tag: "advanced",
        content: `
0DTE: options with less than 1 day of life.

**Characteristics:**
- Extremely high gamma
- Accelerated theta decay
- Option volume exceeds the underlying

**Strategies:**
- Directional with strict risk management
- Iron condors for premium capture
- SPX 0DTE as portfolio hedge

**Risks:**
- Extreme gamma risk near the close
- Pin risk at significant strikes
- Liquidity can disappear quickly
        `
      }
    ]
  },

  // ==================== MODULE 9: REAL-TIME ====================
  "m9": {
    title: "Real-Time Detection — SPRT, CUSUM, Particle Filters",
    phase: "Module 9 — Real-Time",
    topics: [
      {
        title: "SPRT & CUSUM — Sequential Probability Ratio Test",
        tag: "core",
        content: `
SPRT (Wald 1945) minimiza el expected sample size para detectar cambios.

**SPRT:**

H₀: μ = μ₀
H₁: μ = μ₁

Log-likelihood ratio: Sₙ = Σ log(Λᵢ)

Decision:
- Sₙ > a → aceptar H₁
- Sₙ < b → aceptar H₀  
- a ≤ Sₙ ≤ b → continuar muestreando

**CUSUM:**

CUSUM = Σ (xₜ - μ₀)

Alertas cuando CUSUM sale de los bands ±k.

**Aplicación:**
- Detectar cambios de régimen en tiempo real
- Minimize detection lag
- Control false alarm rate
        `
      },
      {
        title: "Particle Filters — Sequential Monte Carlo",
        tag: "advanced",
        content: `
Particle filters use simulations for state tracking when analytical models do not work.

**Algorithm:**

1. **Prediction**: propagate particles according to the model
2. **Update**: reweight according to likelihood
3. **Resampling**: eliminate low weight particles

**Advantages:**
- Handles non-linearity
- Does not require conjugate distributions
- Flexible for multiple hypotheses

**Applications in trading:**
- Regime tracking with multiple models
- Estimation of complex latent states
- Filtering of noise in high-frequency data
        `
      }
    ]
  },

  // ==================== MODULE 10: TRADING ====================
  "m10": {
    title: "Trading Applications — Position Sizing, Strategy Selection, and Portfolio Management",
    phase: "Module 10 — Trading",
    topics: [
      {
        title: "Kelly Fraction by Regime and Volatility Targeting",
        tag: "core",
        content: `
Kelly criterion es la apuesta óptima para maximizar el logarithm del capital a largo plazo.

**Kelly clásico:**
f* = μ / σ²

**Kelly regime-conditional:**
f*(Sₜ=k) = μₜ / σₖ²

El sizing total se pondera por la incertidumbre de régimen:
f_total = Σₖ P(Sₜ=k | datos) · f*(k)

**Volatility Targeting**

size = σ_target / σ_forecast(Sₜ)

- Normal (σ=15%): size = 1x
- Crisis (σ=45%): size = 0.33x

Esto automatiza la reducción de exposición cuando el mercado se vuelve más volátil.

**Fractional Kelly**
Usar ¼ Kelly para robustez porque la estimación de μ y σ tiene error.
        `
      },
      {
        title: "Strategy Selection by Regime and the Transition Edge",
        tag: "advanced",
        content: `
No existe una estrategia universal que funcione en todos los regímenes.

**Regime-Strategy Matrix:**

| Régimen | Estrategia |
|---------|------------|
| Bull low-vol (trending) | Trend following, momentum, breakout |
| Bull high-vol | Breakout + volatility selling |
| Bear trending | Short, fade rallies |
| Range (neutral/low-vol) | Mean-reversion, stat arb |
| Crisis/crash | Defensive, reduced exposure, tail hedges |

**El edge de la transición**

El mayor edge no está en el régimen estable sino en la transición. Cuando P(nuevo_régimen) cruza 0.3-0.4, existe una ventana de 1-5 barras donde el precio aún refleja el régimen anterior.

**Threshold de transición:**
threshold = 0.3 + ADL_estimate / 100

Con ADL=5: threshold = 0.35
        `
      },
      {
        title: "Portfolio Construction and Risk Budgeting",
        tag: "practice",
        content: `
**Allocation by regime:**

strategy_allocation = Σₖ P(Sₜ=k) · W(k)

where W(k) = weights by strategy in regime k

**Risk Budgeting:**

1. Define target risk per strategy
2. Adjust by regime
3. Rebalance with regime probabilities

**Example:**
W(bull) = [momentum:0.5, breakout:0.3, mean_rev:0.2]
W(bear) = [short:0.4, fade_rally:0.3, defensive:0.3]
W(range) = [mean_rev:0.5, stat_arb:0.3, scalping:0.2]
        `
      }
    ]
  }
};

// Complete list of modules for the dashboard
export const modulesList = [
  { id: "intro", title: "Map and Plan", phase: "Introduction", icon: "00", color: "var(--color-cosmic-violet)" },
  { id: "m1", title: "Change Point Detection", phase: "Module 1 — Foundations", icon: "01", color: "var(--amber)" },
  { id: "m2", title: "Hamilton MS Model", phase: "Module 2 — MS Models", icon: "02", color: "var(--purple)" },
  { id: "m3", title: "HMM and the Three Problems", phase: "Module 3 — HMM", icon: "03", color: "var(--teal)" },
  { id: "m4", title: "Volatility Regimes", phase: "Module 4 — Volatility", icon: "04", color: "var(--red)" },
  { id: "m5", title: "Microstructure", phase: "Module 5 — Microstructure", icon: "05", color: "var(--green)" },
  { id: "m6", title: "Correlation Regimes", phase: "Module 6 — Correlations", icon: "06", color: "var(--orange)" },
  { id: "m7", title: "ML for Regimes", phase: "Module 7 — ML", icon: "07", color: "var(--pink)" },
  { id: "m8", title: "Options Regimes", phase: "Module 8 — Options", icon: "08", color: "var(--indigo)" },
  { id: "m9", title: "Real-Time Detection", phase: "Module 9 — Real-Time", icon: "09", color: "var(--accent)" },
  { id: "m10", title: "Trading Applications", phase: "Module 10 — Trading", icon: "10", color: "var(--green)" },
];

// Helper to get modules by phase
export const modulesByPhase = {
  "Introduction": ["intro"],
  "Module 1 — Foundations": ["m1"],
  "Module 2 — MS Models": ["m2"],
  "Module 3 — HMM": ["m3"],
  "Module 4 — Volatility": ["m4"],
  "Module 5 — Microstructure": ["m5"],
  "Module 6 — Correlations": ["m6"],
  "Module 7 — ML": ["m7"],
  "Module 8 — Options": ["m8"],
  "Module 9 — Real-Time": ["m9"],
  "Module 10 — Trading": ["m10"],
};