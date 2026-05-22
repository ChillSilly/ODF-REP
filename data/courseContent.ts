import type { Course } from "@/types/course";

export const courseContent: Record<string, Course> = {
  "market-regimes": {
    id: "market-regimes",
    title: "Market Regimes — Complete Guide",
    subtitle: "Advanced Study Guide · AP",
    description: "From statistical structural break detection to the application of HMMs, Markov switching models, market microstructure, options, and deep learning.",
    stats: "10 Modules · 30+ Topics · 80+ Subtopics",
    modules: [
      {
        id: "00",
        title: "Recommended study plan",
        subtitle: "Optimal learning sequence",
        topics: [
          {
            id: "00-01",
            title: "Week 1-2 — Statistical foundations and change point detection",
            content: "Stationarity under regimes, Chow and Bai-Perron tests, classic CUSUM, information criteria (AIC/BIC/HQ) for selection of the number of regimes. Without this, everything else is a black box.",
            callouts: [
              { type: "warning", title: "Fundamental", text: "Before applying any regime model, you must master the statistical foundations. Without this, everything else is a black box." }
            ],
            resources: [
              { name: "ruptures (Python)", type: "library" },
              { name: "changepoint (R)", type: "library" },
              { name: "Fryzlewicz 2014", type: "paper" }
            ]
          },
          {
            id: "00-02",
            title: "Week 3-4 — Hamilton Markov Switching",
            content: "The original Hamilton (1989) model, EM estimation, Hamilton filter, MS-VAR, MS-GARCH. Implement from scratch in Python (statsmodels + manual).",
            resources: [
              { name: "statsmodels.tsa.regime_switching", type: "library" },
              { name: "MSwM (R)", type: "library" },
              { name: "Hamilton 1989 JoE", type: "paper" }
            ]
          },
          {
            id: "00-03",
            title: "Week 5-6 — Hidden Markov Models",
            content: "Baum-Welch (EM for HMM), Viterbi, forward-backward. Gaussian HMM vs. GMM-HMM. hmmlearn in Python. Multivariate HMM applied to ES/NQ.",
            resources: [
              { name: "hmmlearn (Python)", type: "library" },
              { name: "pomegranate (Python)", type: "library" }
            ]
          },
          {
            id: "00-04",
            title: "Week 7-8 — Volatility and Correlation Regimes",
            content: "RS-GARCH, HAR-RV, VIX term structure, DCC-GARCH, copulas, contagion vs. interdependence. Distinguish volatility regimes from directional regimes."
          },
          {
            id: "00-05",
            title: "Week 9-10 — Microstructure and Order Flow",
            content: "PIN/VPIN, order flow toxicity, AMT regimes, DOM absorption/exhaustion, footprint regimes, delta divergence. Direct application to NQ/ES."
          },
          {
            id: "00-06",
            title: "Week 11-12 — Advanced Machine Learning",
            content: "GMM clustering of returns, BOCPD (Bayesian Online Changepoint Detection), autoencoders for anomaly-based shifts, LSTM regime classification.",
            exercise: {
              question: "What is the main advantage of using GMM over K-means for regime clustering?",
              options: [
                "GMM allows non-spherical clusters",
                "GMM is computationally faster",
                "GMM does not require specifying K",
                "GMM works better with categorical data"
              ],
              correctAnswer: 0,
              explanation: "GMM (Gaussian Mixture Models) allows modeling clusters with different shapes (covariance), while K-means assumes spherical clusters with equal variance."
            }
          },
          {
            id: "00-07",
            title: "Week 13-14 — Options regimes and Real-time detection",
            content: "GEX/DEX regimes, vol surface regime classification, 0DTE flow, SPRT, particle filters, Kalman extensions for real-time detection."
          },
          {
            id: "00-08",
            title: "Week 15-16 — Trading applications",
            content: "Regime-conditional position sizing, strategy switching, factor exposure management, portfolio construction under regime uncertainty, regime transition edge."
          }
        ]
      },
      {
        id: "01",
        title: "Statistical foundations of regimes",
        subtitle: "The mathematical language behind everything",
        topics: [
          {
            id: "01-01",
            title: "Change Point Detection — beyond basic CUSUM",
            tag: "core",
            content: `The central problem: given a process {Xₜ}, detect whether the parameters of the data-generating process change at some unknown point τ. There are three main families of methods with radically different philosophies.

**PELT — Pruned Exact Linear Time**

A dynamic programming algorithm that finds the optimal number of change points by minimizing a penalized criterion. Complexity O(n) on average (vs O(n²) for binary segmentation). Minimizes C(y_{s:t}) + β for each segment. The penalty β controls the trade-off between fit and parsimony.

**Binary Segmentation and Wild Binary Segmentation**

BS recursively applies a hypothesis test over the entire segment, splitting at the point with the largest statistic. Wild BS (WBS) improves consistency by using random segments to prevent late changes from being masked by early changes.

**Bayesian Online Changepoint Detection (BOCPD)**

Adams & MacKay (2007). Instead of searching for change points in batch, it calculates in real time P(rₜ | x₁:t) where rₜ is the "run length" (time since the last change point). Critical for real-time trading.`,
            formulas: [
              {
                label: "Generalized CUSUM (bilateral)",
                content: "S^{+}_t = \\max(0, S^{+}_{t-1} + x_t - \\mu_0 - k)"
              },
              {
                label: "Penalized criterion (PELT)",
                content: "Q(\\tau_1...\\tau_k) = \\sum_i [C(y_{\\tau_{i-1}:\\tau_i}) + \\beta]"
              }
            ],
            codeExamples: [
              {
                language: "python",
                title: "PELT with ruptures",
                code: `import ruptures as rpt

# Detect change points in signal
signal = your_data  # numpy array

# PELT with BIC penalty
algo = rpt.Pelt(model="rbf").fit(signal)
change_points = algo.predict(pen=1)

# Binary Segmentation
algo = rpt.Binseg().fit(signal)
change_points = algo.predict(n_bkps=5)`,
                annotations: [
                  "PELT is O(n) vs O(n²) of other methods",
                  "The 'pen' parameter controls the number of detected changes",
                  "Adjust 'pen' according to the complexity of your data"
                ]
              }
            ],
            callouts: [
              { type: "info", title: "PELT vs Binary Segmentation", text: "PELT is faster but can miss close changes. Binary segmentation is more precise for short series." }
            ],
            resources: [
              { name: "ruptures (Python)", type: "library" },
              { name: "changepoint (R)", type: "library" },
              { name: "Fryzlewicz 2014 WBS", type: "paper" }
            ]
          },
          {
            id: "01-02",
            title: "Structural Breaks — Formal tests and regime selection",
            tag: "core",
            content: `Structural break tests distinguish changes in model parameters from the normal variability of the process. The philosophical difference with change point detection: here we assume a specific parametric model and test whether its parameters change.

**Chow Test (1960)**

The classic test for a known break point τ: H₀: β₁ = β₂ (the coefficients are equal before and after τ). F-statistic = [(RSS_R - RSS_U)/k] / [RSS_U/(n-2k)].

**Bai-Perron (1998, 2003) — the gold standard**

Allows multiple simultaneous unknown breaks. Uses the theory of supF statistics to determine the number of breaks sequentially. Dynamic programming algorithm O(n²).

**Information criteria for selecting K regimes**

AIC = 2k - 2ln(L̂), BIC = k·ln(n) - 2ln(L̂). In practice for financial markets: 2-4 regimes are usually sufficient.`,
            formulas: [
              {
                label: "Chow F-statistic",
                content: "F = \\frac{(RSS_R - RSS_U)/k}{RSS_U/(n-2k)}"
              },
              {
                label: "BIC for selecting K",
                content: "BIC = k \\cdot \\ln(n) - 2\\ln(\\hat{L})"
              }
            ],
            callouts: [
              { type: "warning", title: "Look-ahead bias", text: "Look-ahead bias in structural break detection is devastating. Always evaluate out-of-sample and measure the average detection lag (ADL)." }
            ],
            exercise: {
              question: "What is the main limitation of the Chow Test?",
              options: [
                "It only works with time series",
                "It requires knowing the break point a priori",
                "It does not work with more than 2 regimes",
                "It only applies to linear models"
              ],
              correctAnswer: 1,
              explanation: "The Chow Test requires knowing the break point τ a priori. In trading, we NEVER know it, which generates data snooping if τ is chosen by looking at the data."
            }
          }
        ]
      },
      {
        id: "02",
        title: "Classic Regime Switching Models",
        subtitle: "Hamilton (1989) and his extended family",
        topics: [
          {
            id: "02-01",
            title: "Hamilton Markov-Switching Model — complete architecture",
            tag: "advanced",
            content: `Hamilton's (1989) paper on business cycles is the foundational model. The idea: the parameters of the AR process change depending on a latent Markov state Sₜ that is not directly observable.

**Complete specification of the MS-AR(p)**

yₜ = μ(Sₜ) + φ₁(Sₜ)(yₜ₋₁ - μ(Sₜ₋₁)) + ... + σ(Sₜ)εₜ. The parameters that change can be: only the mean (MSM), only the variance (MSV), or both (MSMV).

**Hamilton Filter — inference on Sₜ**

It is a filter analogous to the Kalman filter but for discrete states: it recursively calculates the probability of being in each regime. The update uses Bayes' rule: ξₜ|ₜ ∝ ηₜ ⊙ (P'ξₜ₋₁|ₜ₋₁).

**Kim Smoother — smoothed probabilities**

Kim's (1994) smoother gives P(Sₜ = j | yₜ,...,y_T) using the entire sample. For real-time trading, only filtered probabilities are valid.`,
            formulas: [
              {
                label: "Transition matrix (K=2)",
                content: "P = \\begin{pmatrix} p_{11} & p_{12} \\\\ p_{21} & p_{22} \\end{pmatrix}"
              },
              {
                label: "Expected duration in regime j",
                content: "E[duration] = \\frac{1}{1 - p_{jj}}"
              }
            ],
            codeExamples: [
              {
                language: "python",
                title: "MS-AR(1) with statsmodels",
                code: `import numpy as np
from statsmodels.tsa.regime_switching.markov_autoregression import MarkovAutoregression

# Return data
y = returns_array  # numpy array

# MS-AR(1) model with 2 regimes
model = MarkovAutoregression(
    y, k_regimes=2, order=1,
    switching_variance=True
)

# Estimate by maximum likelihood
result = model.fit()

# Filtered probabilities
filtered_probs = result.filtered_marginal_probabilities

# Smoothed probabilities (uses future data)
smoothed_probs = result.smoothed_marginal_probabilities`,
                annotations: [
                  "switching_variance=True allows σ to change by regime",
                  "filtered_marginal_probabilities: only data up to t",
                  "smoothed_marginal_probabilities: uses the entire sample"
                ]
              }
            ],
            callouts: [
              { type: "info", title: "Configuration for NQ/ES", text: "An MS-AR(1) with K=2 typically captures the trend vs. correction regime well. The parameter p₁₁ is usually 0.95-0.98." }
            ],
            resources: [
              { name: "statsmodels.tsa.regime_switching", type: "library" },
              { name: "MSM (Python)", type: "library" },
              { name: "Hamilton 1989 JoE", type: "paper" }
            ],
            exercise: {
              question: "What is the difference between filtered and smoothed probabilities in an MS model?",
              options: [
                "Filtered ones use more data than smoothed ones",
                "Filtered ones do not use future data, smoothed ones do",
                "Smoothed ones are more useful for real-time trading",
                "There is no practical difference"
              ],
              correctAnswer: 1,
              explanation: "Filtered probabilities P(Sₜ|y₁:t) do not use future data, making them valid for real-time trading. Smoothed probabilities P(Sₜ|y₁:T) use the entire sample and are more precise for historical analysis."
            }
          },
          {
            id: "02-02",
            title: "Threshold Models — TAR, SETAR, LSTAR, MTAR",
            tag: "advanced",
            content: `Threshold models are an alternative to Markov-switching: the regime is not hidden, but rather determined by an observable variable crossing a threshold.

**TAR — Threshold Autoregressive**

yₜ = (φ₁₀ + φ₁₁yₜ₋₁ + εₜ)·I(qₜ₋d ≤ γ) + (φ₂₀ + φ₂₁yₜ₋₁ + εₜ)·I(qₜ₋d > γ). The threshold variable can be yₜ₋d itself (SETAR) or another variable.

**LSTAR — Logistic Smooth Transition AR**

Uses G(qₜ₋d; γ, c) = [1 + exp(-γ(qₜ₋d - c))]⁻¹ for gradual transitions between regimes.

**MTAR — Momentum Threshold AR**

The threshold is not the level but the difference Δqₜ (momentum). Especially relevant for asymmetric cointegration.`,
            callouts: [
              { type: "warning", title: "Philosophical difference", text: "MS models = latent regime, stochastic transition. Threshold models = deterministic regime given qₜ, predictable transition." }
            ]
          },
          {
            id: "02-03",
            title: "MS-GARCH, MS-VAR and cointegration with regimes",
            tag: "advanced",
            content: `Multivariate MS extensions are where the analysis becomes truly powerful — and computationally challenging.

**MS-GARCH — Haas, Mittnik, Paolella (2004)**

Each regime k has its own independent GARCH process: hₖ,ₜ = ωₖ + αₖε²ₜ₋₁ + βₖhₖ,ₜ₋₁. This avoids the path dependence problem of pure MS-GARCH.

**MS-VAR — Vector Autoregression with switching**

Yₜ = μ(Sₜ) + A₁(Sₜ)Yₜ₋₁ + ... + Σ(Sₜ)^(1/2)εₜ. All parameters can change with the regime.

**Regime-switching cointegration**

The cointegration relationship may exist only in certain regimes. For ES-NQ pairs trading: the spread may be cointegrated in normal regimes but diverge in risk-off.`,
            resources: [
              { name: "MSwM (R)", type: "library" },
              { name: "MSGARCH (R)", type: "library" },
              { name: "Kim & Nelson 1999", type: "paper" }
            ]
          }
        ]
      },
      {
        id: "03",
        title: "Hidden Markov Models",
        subtitle: "The probabilistic framework for latent regimes",
        topics: [
          {
            id: "03-01",
            title: "HMM Architecture — Rabiner's three problems",
            tag: "core",
            content: `An HMM is defined by λ = (A, B, π) where A is the transition matrix, B is the emission distributions, and π is the initial probabilities. Rabiner (1989) defined the three fundamental problems:

**Problem 1: Evaluation — P(O | λ)**

What is the probability of the observed sequence given the model? Solved with the forward algorithm. In log scale for numerical stability.

**Problem 2: Decoding — Viterbi**

What is the most probable sequence of latent states? Uses dynamic programming. Backtracking recovers the optimal sequence.

**Problem 3: Learning — Baum-Welch**

EM for HMM. E-step calculates γₜ(i) and ξₜ(i,j). M-step updates A, B, π. Convergence guaranteed to a local maximum.`,
            formulas: [
              {
                label: "Forward algorithm",
                content: "\\alpha_t(j) = b_j(o_t) \\cdot \\sum_i \\alpha_{t-1}(i) \\cdot a_{ij}"
              },
              {
                label: "Backward algorithm",
                content: "\\beta_t(i) = \\sum_j a_{ij} \\cdot b_j(o_{t+1}) \\cdot \\beta_{t+1}(j)"
              }
            ],
            codeExamples: [
              {
                language: "python",
                title: "HMM with hmmlearn",
                code: `from hmmlearn import hmm
import numpy as np

# Features: returns, vol, skew
X = np.column_stack([returns, realized_vol, skew])

# Gaussian HMM with K=3 states
model = hmm.GaussianHMM(
    n_components=3,
    covariance_type="full",
    n_iter=100,
    random_state=42
)

# Fit model
model.fit(X)

# Most probable state sequence (Viterbi)
states = model.predict(X)

# Probabilities by state
probs = model.predict_proba(X)

# Log-likelihood
log_likelihood = model.score(X)`,
                annotations: [
                  "covariance_type='full' allows different covariances per state",
                  "Run with multiple seeds to avoid local maxima",
                  "predict_proba gives the probabilities of each state"
                ]
              }
            ],
            resources: [
              { name: "hmmlearn (Python)", type: "library" },
              { name: "pomegranate (Python)", type: "library" },
              { name: "Zucchini et al. 2016", type: "paper" }
            ]
          },
          {
            id: "03-02",
            title: "HMM in markets — advanced emissions and K selection",
            tag: "advanced",
            content: `**Gaussian HMM vs GMM-HMM**

Gaussian HMM: each state emits oₜ ~ N(μᵢ, Σᵢ). Limitation: a single Gaussian per state cannot capture bimodal distributions or fat tails. GMM-HMM: bᵢ(o) = Σₖ wᵢₖ·N(o; μᵢₖ, Σᵢₖ).

**Student-t HMM for fat tails**

NQ returns have an empirical kurtosis of 6-12 (vs 3 for Gaussian). The Student-t HMM is more appropriate.

**Selecting the number of states K**

Methods: BIC on HMM, Akaike HQ, cross-validated log-likelihood, economic interpretability. For practical trading: K=2 or K=3 are usually sufficient and more stable OOS.`,
            codeExamples: [
              {
                language: "python",
                title: "Select K with BIC",
                code: `import numpy as np
from hmmlearn import hmm

X = your_features  # array (n_samples, n_features)

# Test K = 2, 3, 4, 5
results = []
for k in range(2, 6):
    model = hmm.GaussianHMM(n_components=k, n_iter=100)
    model.fit(X)
    
    # BIC = -2 * log_likelihood + k * log(n)
    n_params = k * (k - 1) + k * X.shape[1] + k * X.shape[1]**2
    bic = -2 * model.score(X) + n_params * np.log(X.shape[0])
    
    results.append({"k": k, "bic": bic, "model": model})

# Best K = the one that minimizes BIC
best = min(results, key=lambda x: x["bic"])
print(f"Best K: {best['k']}")`,
                annotations: [
                  "BIC penalizes complex models",
                  "K=3 gives bear/neutral/bull, K=4 adds crash",
                  "Always validate out-of-sample"
                ]
              }
            ]
          },
          {
            id: "03-03",
            title: "Multivariate HMM — portfolio applications",
            tag: "quant",
            content: `**Multivariate Gaussian HMM**

For a portfolio of m assets: oₜ ∈ ℝᵐ, bᵢ(o) = N(o; μᵢ, Σᵢ). The number of parameters grows as m²/2. Options: (1) Diagonal Σᵢ, (2) Factor structure, (3) Shrinkage Ledoit-Wolf.

**Input-Output HMM (IOHMM)**

The transition matrix A(uₜ) depends on an observable input variable uₜ (e.g., VIX, GEX, news sentiment). P(Sₜ=j | Sₜ₋₁=i, uₜ) = softmax(Wᵢⱼ · uₜ).`,
diagram: {
              type: "mermaid",
              title: "IOHMM Architecture",
              content: `flowchart TD
    A["VIX/GEX"] --> B["Input Layer"]
    B --> C{"HMM States"}
    C -->|Bull| D["μ_high, σ_low"]
    C -->|Bear| E["μ_low, σ_high"]
    C -->|Neutral| F["μ_0, σ_0"]
    D --> G["Portfolio Weights"]
    E --> G
    F --> G`
            }
          }
        ]
      },
      {
        id: "04",
        title: "Volatility Regimes",
        subtitle: "The most critical dimension for trading",
        topics: [
          {
            id: "04-01",
            title: "RS-GARCH, MRS-GARCH and switching GARCH family",
            tag: "advanced",
            content: `GARCH models capture volatility clustering, but assume stationary dynamics. RS-GARCH models allow parameters to switch between regimes.

**Haas-Mittnik-Paolella (2004)**

Each regime k has its own GARCH process: hₖ,ₜ = ωₖ + αₖε²ₜ₋₁ + βₖhₖ,ₜ₋₁. The total variance is the mixture: E[ε²ₜ | Fₜ₋₁] = Σₖ P(Sₜ=k)·(hₖ,ₜ + μ²ₖ).

**HAR-RV (Corsi 2009)**

RVₜ = c + β_D·RVₜ₋₁ + β_W·RV^(w)ₜ₋₁ + β_M·RV^(m)ₜ₋₁ + εₜ. The MS-HAR-RV version allows the coefficients to change by regime.`,
            regimeMatrixData: [
              { label: "Bull + Low Vol", title: "Quiet uptrend", description: "Best for momentum", color: "#22c55e" },
              { label: "Bull + High Vol", title: "Chaotic rally", description: "Active short squeeze", color: "#f59e0b" },
              { label: "Bear + Low Vol", title: "Slow bleed", description: "Passive accumulation", color: "#a78bfa" },
              { label: "Bear + High Vol", title: "Crash", description: "Avoid long positions", color: "#ef4444" }
            ],
            formulas: [
              {
                label: "Volatility Ratio",
                content: "VR(t) = \\frac{RV_{short}(t)}{RV_{long}(t)}"
              }
            ],
            codeExamples: [
              {
                language: "python",
                title: "HAR-RV with statsmodels",
                code: `import numpy as np
import pandas as pd
from statsmodels.regression.linear_model import OLS

def har_rv(rv_series):
    """Heterogeneous Autoregressive RV"""
    df = pd.DataFrame({'rv': rv_series})
    
    # Calculate weekly and monthly averages
    df['rv_w'] = df['rv'].rolling(5).mean()
    df['rv_m'] = df['rv'].rolling(22).mean()
    
    # Shift to avoid look-ahead
    df['rv_next'] = df['rv'].shift(-1)
    df = df.dropna()
    
    # HAR Regression
    X = df[['rv', 'rv_w', 'rv_m']]
    X = sm.add_constant(X)
    y = df['rv_next']
    
    model = OLS(y, X).fit()
    return model`,
                annotations: [
                  "RV must be realized volatility (e.g. Parkinson, Garman-Klass)",
                  "Use rv.shift(-1) to predict the next day without look-ahead",
                  "β_D > β_M indicates regimes with high reaction to immediate shock"
                ]
              }
            ]
          },
          {
            id: "04-02",
            title: "VIX Term Structure Regimes — contango, backwardation, kink",
            tag: "advanced",
            content: `The VIX futures curve (VX1, VX2,...,VX8) defines 3 structural regimes:

**Normal Contango**: VX1 < VX2 < ... < VX8. Calm market, vol sellers benefit from negative roll yield.

**Severe Backwardation**: VX1 >> VX2. Active crisis, extreme spot VIX but market expects normalization.

**Kink structure**: VX2 > VX1 but VX3 < VX2. Uncertainty concentrated in the short term.

**VVIX — volatility of volatility regime**

VVIX > 130 typically precedes VIX spikes. The VIX/VVIX ratio has more robust mean reversion properties.`,
            comparisonData: {
              headers: ["Regime", "VX1 vs VX2", "Roll Yield", "Strategy"],
              rows: [
                ["Contango", "VX1 < VX2", "-5% to -15% monthly", "Short vol"],
                ["Backwardation", "VX1 > VX2", "+5% to +20% monthly", "Long vol"],
                ["Kink", "VX2 > VX1 > VX3", "Variable", "Wait for event"]
              ]
            },
            callouts: [
              { type: "info", title: "Leading indicator", text: "A shift from contango to backwardation (VX1 crossing VX2) precedes high-vol episodes of 5-15 days." }
            ]
          },
          {
            id: "04-03",
            title: "Vol Surface Regimes — skew, kurtosis, ATM/OTM dynamics",
            tag: "quant",
            content: `**SVI Parametrization of the surface**

The SVI model (Gatheral 2004): w(k) = a + b[ρ(k-m) + √((k-m)² + σ²)]. Parameters: a = ATM vol, b = slope, ρ = skew, m = shift, σ = curvature.

**Skew regimes — put premium vs. call premium**

Put skew (25Δ put IV - ATM IV) is the driver of regimes in equity vol. Normal skew (put > call): expensive protection. Inverted skew (call > put): short squeeze in progress.

**Volatility surface PCA**

PC1 ≈ general level (~80% variance), PC2 ≈ slope/skew (~10%), PC3 ≈ curvature (~5%). A 2σ move in PC2 without a move in PC1 indicates a change in options regime without a crack in the underlying.`,
            codeExamples: [
              {
                language: "python",
                title: "Calculate option skew",
                code: `def calculate_25_delta_skew(iv_surface):
    """
    Calcula el skew como 25D Put IV - ATM IV
    iv_surface: dict con strikes e IVs
    """
    # ATM IV (strike closest to spot)
    atm_strike = min(iv_surface.keys(), 
                    key=lambda k: abs(k - spot))
    atm_iv = iv_surface[atm_strike]
    
    # 25 Delta Put
    put_25_strike = find_delta_strike(iv_surface, delta=0.25, put=True)
    put_25_iv = iv_surface[put_25_strike]
    
    # Skew
    skew = put_25_iv - atm_iv
    
    return skew

# Interpretation
if skew > 5:
    print("Normal skew: defensive market, expensive protection")
elif skew < -2:
    print("Inverted skew: short squeeze, calls demand")
else:
    print("Flat skew: transition or two-way uncertainty")`,
                annotations: [
                  "A high positive skew indicates fear premium",
                  "Inverted skew can precede rallies",
                  "Track the 25Δ risk reversal for regime changes"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "05",
        title: "Microstructure & Order Flow Regimes",
        subtitle: "Regimes at the level of trades and DOM",
        topics: [
          {
            id: "05-01",
            title: "PIN and VPIN — Probability of Informed Trading",
            tag: "quant",
            content: `The EKOP model (Easley et al. 1996) defines PIN as the fraction of the order flow that comes from informed traders.

**EKOP Model**

With probability α there is an information event (good with probability 1-δ, bad with probability δ). PIN = αμ/(αμ+2ε). Estimation by MLE is difficult — use the Yan & Zhang (2012) factorization.

**VPIN — Volume-Synchronized PIN**

VPIN uses volume as a clock: it divides volume into buckets of τ units. VPIN_n = (Σᵢ |Vᵢ^B - Vᵢ^S|) / (n·τ). VPIN > 0.5 precedes high volatility episodes like the 2010 Flash Crash.`,
            formulas: [
              {
                label: "VPIN with L buckets",
                content: "VPIN_n = \\frac{1}{L} \\sum_{i=n-L+1}^{n} \\frac{|V_i^B - V_i^S|}{V_{bucket}}"
              }
            ],
            codeExamples: [
              {
                language: "python",
                title: "Calculate VPIN on NQ",
                code: `import numpy as np

def calculate_vpin(trades_df, bucket_size=50):
    """
    trades_df: DataFrame with columns ['volume', 'buy_sell']
               buy_sell = 1 for buy, -1 for sell
    bucket_size: number of contracts per bucket
    """
    # Classify trades by bulk volume classification
    n_buckets = int(trades_df['volume'].sum() / bucket_size)
    
    vpin_history = []
    for i in range(n_buckets - 50, n_buckets):
        start = i * bucket_size
        end = (i + 1) * bucket_size
        
        bucket = trades_df.iloc[start:end]
        
        # Volume initiated by buyers
        v_b = bucket[bucket['buy_sell'] == 1]['volume'].sum()
        v_s = bucket[bucket['buy_sell'] == -1]['volume'].sum()
        
        # VPIN of the bucket
        vpin = abs(v_b - v_s) / bucket_size
        vpin_history.append(vpin)
    
    # Average VPIN of the last 50 buckets
    return np.mean(vpin_history[-50:])

# Interpretation
vpin = calculate_vpin(nq_trades)
if vpin > 0.5:
    print("Toxic order flow: higher momentum, lower reversion")
    print("Risk of fast and unidirectional moves")`,
                annotations: [
                  "Bucket size of 50 contracts is standard for NQ",
                  "Use bulk volume classification to classify trades",
                  "High VPIN indicates unfavorable regime for market-making"
                ]
              }
            ]
          },
          {
            id: "05-02",
            title: "AMT and DOM Regimes — absorption, exhaustion, POC shifting",
            tag: "advanced",
            content: `From Auction Market Theory, regimes are defined by the state of the auction: is the market facilitating or rejecting prices?

**Balance vs. Imbalance**

Balance: delta ≈ 0, balanced DOM, price at VPOC ± 1σ. Imbalance: sustained buying/selling pressure, cumulative delta with bias. The balance→imbalance transition is the most powerful setup.

**DOM Absorption vs. Exhaustion**

Absorption: executed volume / initial size of bid/ask ratio > 2. Exhaustion: correlation between Δprice and Δdelta drops from 0.8 to 0.3.

**POC shifting regimes**

POC migrates consistently = value rotation regime. POC migrates against the price = divergence, imminent rotation.`,
diagram: {
              type: "mermaid",
              title: "Auction Regimes",
              content: `stateDiagram-v2
    [*] --> Balance
    Balance --> ImbalanceBullish : Confirmed absorption
    Balance --> ImbalanceBearish : Selling pressure
    ImbalanceBullish --> Balance : Reversion
    ImbalanceBullish --> Breakout : Exhaustion
    ImbalanceBearish --> Balance : Covering
    ImbalanceBearish --> Breakdown : Exhaustion
    Breakout --> [*] : New range
    Breakdown --> [*] : New range`
            }
          },
          {
            id: "05-03",
            title: "Footprint Regimes — delta divergence, trapped traders, stacked imbalances",
            tag: "advanced",
            content: `**Delta Divergence as a regime signal**

If the price makes HH but the cumulative delta makes LH: active distribution regime — there is hidden selling absorbing the demand. Correlation < 0.3 with active trend = signal.

**Stacked Imbalances — regime zones**

3+ consecutive cells with imbalance ≥ 300%. These zones act as magnets. Probability of fill in 5 sessions: 60-75%.

**Trapped Traders — squeeze regime**

Bars with delta > +X followed by price falling below the low. Active squeeze when there are trapped traders in multiple timeframes simultaneously.`,
            callouts: [
              { type: "info", title: "Regime Dashboard", text: "Combines VPIN, POC migration velocity, delta divergence score, and stacked imbalance fill probability. More actionable than any statistical HMM." }
            ],
            exercise: {
              question: "Which is NOT an indicator of an active distribution regime (hidden selling)?",
              options: [
                "Price makes Higher High, delta makes Lower High",
                "VPIN > historical 60th percentile",
                "POC migrating consistently upward with price",
                "Stacked sell imbalance at resistance"
              ],
              correctAnswer: 2,
              explanation: "POC migrating upward with price indicates accumulation (hidden buying), not distribution. Distribution implies price rising but delta diverging negatively."
            }
          }
        ]
      },
      {
        id: "06",
        title: "Correlation & Cross-Asset Regimes",
        subtitle: "When everything moves together (or not)",
        topics: [
          {
            id: "06-01",
            title: "DCC-GARCH — Dynamic Conditional Correlation",
            tag: "advanced",
            content: `Engle (2002): DCC-GARCH models time-varying correlations without the parameter explosion of BEKK.

**Two-stage DCC specification**

Stage 1: univariate GARCH for each asset. Stage 2: model dynamic correlation: Qₜ = (1-α-β)Q̄ + α·ẑₜ₋₁ẑ'ₜ₋₁ + β·Qₜ₋₁.

**Correlation regimes from DCC**

Once DCC is estimated, apply HMM to the dynamic correlation series ρₜ. Regime 1 (low correlation): diversification works. Regime 2 (high correlation): risk-off, everything falls together.

**Asymmetric DCC (ADCC)**

Correlations rise faster in downturns. Qₜ = (1-α-β-γ/2)Q̄ + α·ẑₜ₋₁ẑ'ₜ₋₁ + γ·ñₜ₋₁ñ'ₜ₋₁ + β·Qₜ₋₁.`,
            comparisonData: {
              headers: ["Model", "Parameters", "Advantage", "Disadvantage"],
              rows: [
                ["DCC-GARCH", "O(m)", "Scalable", "Assumes symmetry"],
                ["BEKK", "O(m²)", "Complete", "Many parameters"],
                ["ADCC", "O(m)", "Asymmetric", "More complex"]
              ]
            },
            resources: [
              { name: "rmgarch (R)", type: "library" },
              { name: "arch (Python)", type: "library" },
              { name: "Engle 2002 JBES", type: "paper" }
            ]
          },
          {
            id: "06-02",
            title: "Copulas for extreme dependence regimes",
            tag: "quant",
            content: `**Sklar's Theorem**

F(x,y) = C(F_X(x), F_Y(y)) where C is a copula. Copulas separate dependence from marginals. For NQ-ES: Gumbel copula (upper tail) for rallies; Clayton copula (lower tail) for crashes.

**Mixture copulas for regimes**

C(u,v) = p·C₁(u,v) + (1-p)·C₂(u,v). C₁ = Clayton (crash), C₂ = Gumbel (rally), C₃ = Gaussian (normal). The weight p depends on market conditions.

**Contagion vs. Interdependence**

Forbes & Rigobon (2002): if the volatility-adjusted correlation does not change, it is normal interdependence; if it changes significantly, it is true contagion.`,
            codeExamples: [
              {
                language: "python",
                title: "Copula mixture with scipy",
                code: `from scipy import stats
import numpy as np

def mixture_copula(u, v, weights, copulas):
    """
    Copula mixture
    u, v: uniforms (transforms of marginals)
    weights: [w1, w2, ...] sum=1
    copulas: [copula1, copula2, ...]
    """
    c = 0
    for w, cop in zip(weights, copulas):
        c += w * cop.cdf(u, v)
    return c

# Archimedean Copulas
clayton = stats.archimedean.copula('clayton', theta=2)
gumbel = stats.archimedean.copula('gumbel', theta=2)
gaussian = stats.multivariate_normal(cov=[[1, 0.5], [0.5, 1]])

# Mixture: 40% Clayton (crash), 30% Gumbel (rally), 30% Gaussian
mixture = lambda u, v: (
    0.4 * clayton.cdf(u, v) +
    0.3 * gumbel.cdf(u, v) +
    0.3 * gaussian.cdf(u, v)
)`,
                annotations: [
                  "Clayton captures dependence in lower tails (crashes)",
                  "Gumbel captures dependence in upper tails (rallies)",
                  "The mixture allows the dependence to change with the regime"
                ]
              }
            ]
          },
          {
            id: "06-03",
            title: "Risk-On / Risk-Off — quantification and leading indicators",
            tag: "core",
            content: `**PCA-based RORO scoring**

Construct RORO score: (1) Select risk/haven pairs: NQ/treasuries, HY/IG spreads, Cu/Au, AUD/JPY, EM/DM. (2) Normalize to z-score with a 252-day rolling window. (3) PCA: PC1 ≈ RORO factor (>60% variance). (4) PC1 > +1σ: risk-on; < -1σ: risk-off.

**Cross-asset regime confirmation**

To validate a regime in equities, search for confirmation in: credit spreads, vol curve, currency carry, commodity-equity relation. When 3+ dimensions agree: strong signal.`,
            formulas: [{
              label: "Composite RORO Score (5 factors)",
              content: "RORO_t = \\frac{1}{5} \\sum_i z\\_score(factor_i, t, window=252)"
            }],
            callouts: [
              { type: "info", title: "RORO Factors", text: "Cu/Au, AUD/JPY, HY spread, VIX term slope, NQ/TLT. Track PC1 daily as a regime indicator." }
            ]
          }
        ]
      },
      {
        id: "07",
        title: "Machine Learning for Regimes",
        subtitle: "Beyond parametric models",
        topics: [
          {
            id: "07-01",
            title: "Unsupervised clustering — GMM, K-means, DBSCAN on returns",
            tag: "advanced",
            content: `**GMM — Gaussian Mixture Models**

Special case of HMM where the sequence of states is independent. K=3-4 GMM on features (r, |r|, vol, skew) gives differentiated regimes. Then: estimate the empirical transition matrix — if it is more ordered than random, it has a Markov structure.

**K-means — limitations**

Assumes spherical clusters (equal covariances). The problem: it can assign temporally discontinuous points to the same "regime". Solution: include temporal momentum features.

**DBSCAN for anomalies**

Identifies outliers (points not assigned to any cluster) = anomalous bars = potential indicators of regime change. ε = 90th percentile of distances.`,
            codeExamples: [
              {
                language: "python",
                title: "GMM clustering for regimes",
                code: `from sklearn.mixture import GaussianMixture
import numpy as np

def cluster_regimes(features, k_range=range(2, 6)):
    """
    Clustering of features for regimes
    features: (n_samples, n_features)
    """
    bic_scores = []
    models = {}
    
    for k in k_range:
        gmm = GaussianMixture(
            n_components=k,
            covariance_type='full',
            n_init=20,
            random_state=42
        )
        gmm.fit(features)
        
        # BIC for K selection
        bic = gmm.bic(features)
        bic_scores.append(bic)
        models[k] = gmm
    
    best_k = k_range[np.argmin(bic_scores)]
    
    # Assign regimes
    regime_probs = models[best_k].predict_proba(features)
    regimes = models[best_k].predict(features)
    
    return regimes, regime_probs, best_k

# Features for NQ
features = np.column_stack([
    returns,
    abs(returns),
    realized_vol,
    rolling_skew(returns, 20)
])

regimes, probs, k = cluster_regimes(features)`,
                annotations: [
                  "Run with n_init=20 to avoid local maxima",
                  "Minimized BIC = best complexity/fit trade-off",
                  "predict_proba gives probabilities of belonging to each regime"
                ]
              }
            ]
          },
          {
            id: "07-02",
            title: "BOCPD — Bayesian Online Changepoint Detection in real time",
            tag: "quant",
            content: `Adams & MacKay (2007): the most elegant framework for real-time regime detection. rₜ = "run length" = time since the last changepoint.

**BOCPD Architecture**

At each new data point xₜ, it maintains P(rₜ | x₁:ₜ). Hazard function: h(r) = 1/λ where λ = expected duration of the regime. Use λ = 63 (quarter) for daily regimes.

**BOCPD with conjugate models**

Gaussian with unknown variance → Normal-Inverse-Gamma prior. The posterior is updated recursively. Predictive probability is Student-t. This makes BOCPD O(n) per bar — implementable in real time.

**Truncated BOCPD**

Truncate to the L most probable (e.g. L=50). Pruning when P(rₜ = r) < 10⁻⁶.`,
            formulas: [
              {
                label: "Hazard function",
                content: "h(r_t) = P(changepoint | r_{t-1}) = \\frac{1}{\\lambda}"
              },
              {
                label: "Update equations",
                content: "P(r_t=0 | x_{1:t}) \\propto \\sum_r P(x_t|r_{t-1}=r) \\cdot \\frac{1}{\\lambda} \\cdot P(r_{t-1}=r|x_{1:t-1})"
              }
            ],
            codeExamples: [
              {
                language: "python",
                title: "BOCPD with bayesian_changepoint_detection",
                code: `from bayesian_changepoint_detection.online_changepoint_detection import OnlineChangepointDetection
from bayesian_changepoint_detection.priors import const_prior
import numpy as np

# Conjugate model: Normal-Inverse-Gamma
hazard = lambda r: 1/63  # λ = 63 days
prior = const_prior(lambda t: t)

ocd = OnlineChangepointDetection(hazard, prior)

# Run length distribution at each new data point
def update_bocpd(new_observation):
    global ocd
    ocd.add_observation(new_observation)
    return ocd.run_length_probabilities[-1]

# Detect regime change
run_length = update_bocpd(new_data_point)
max_run_length = np.argmax(run_length)  # most probable run length
prob_changepoint = run_length[0]  # P(r_t = 0)

if prob_changepoint > 0.5:
    print("Regime change detected!")
    print(f"Most probable run length: {max_run_length} bars")`,
                annotations: [
                  "λ = 63 means expected duration of 63 days per regime",
                  "run_length[0] is the probability that the change is NOW",
                  "When run_length[0] > 0.5, the regime has probably changed"
                ]
              }
            ]
          },
          {
            id: "07-03",
            title: "Deep Learning — LSTM regimes, autoencoders, attention",
            tag: "advanced",
            content: `**LSTM for regime classification**

Architecture: LSTM(128) → Dropout(0.3) → LSTM(64) → Dense(K, softmax). Input: window of T feature bars. Output: regime probabilities. The problem is label generation — use GMM or HMM for pseudo-labels.

**Variational Autoencoder for latent regimes**

VAE compresses xₜ into a latent space z of dimension 2-4. The latent space is organized into clusters = empirical regimes. Advantage: does not assume a specific emission distribution.

**Transformer-based regime detection**

Self-attention captures long dependencies. Temporal Fusion Transformer (TFT) with static covariates (VIX, time-of-year) and time-varying inputs (returns, order flow). The attention map reveals historical periods similar to the present.`,
            callouts: [
              { type: "warning", title: "Data regime drift", text: "Regimes of the past (2008-2015) are qualitatively different from current ones (2020-2025). An LSTM trained on 2010-2018 may be useless for 2024. Use expanding window cross-validation." }
            ],
            exercise: {
              question: "What is the main problem of deep learning for regime detection in trading?",
              options: [
                "Overfitting",
                "Data regime drift",
                "Computational cost",
                "Lack of labels"
              ],
              correctAnswer: 1,
              explanation: "Regimes of the past are qualitatively different from current ones. A model trained on historical data may not generalize to the current regime. Expanding window CV and constant OOS monitoring are essential."
            }
          }
        ]
      },
      {
        id: "08",
        title: "Options Market Regimes",
        subtitle: "The options market as a regime indicator",
        topics: [
          {
            id: "08-01",
            title: "GEX and DEX Regimes — the physics of the options market",
            tag: "advanced",
            content: `Gamma Exposure (GEX) captures how much delta hedging options dealers need to do — this directly affects the price dynamics of the underlying.

**GEX Regimes**

Positive GEX (dealer long gamma): buyers on drops, sellers on rallies — they act as buffers. Negative GEX (dealer short gamma): sellers on drops, buyers on rallies — they amplify movements. The GEX+ → GEX- transition is one of the most actionable regime changes.

**Quantifying GEX**

GEX = Σ_options [Open_Interest × Gamma × 100 × Spot²]. GEX > +$1B: volatility suppressed, mean-reversion. GEX < -$1B: volatility elevated, momentum. GEX ≈ 0: unstable zone.

**Charm, Vanna, Volga — second-order effects**

Charm = dDelta/dt: decay of delta over time. Vanna = dDelta/dVol: when VIX spikes, OTM puts become more ITM, forcing dealers to sell.`,
diagram: {
              type: "mermaid",
              title: "Gamma flow in dealers",
              content: `flowchart LR
    A["Price rises"] --> B["Dealers long calls sell"]
    A --> C["Dealers short puts buy"]
    B --> D["selling pressure"]
    C --> E["buying pressure"]
    D --> F{"Positive GEX?"}
    E --> F
    F -->|Yes| G["Buffer - low vol"]
    F -->|No| H["Amplifier - high vol"]`
            }
          }
        ]
      },
      {
        id: "09",
        title: "Real-Time Regime Detection",
        subtitle: "Online detection without look-ahead bias",
        topics: [
          {
            id: "09-01",
            title: "Modern SPRT and CUSUM — sequential detection",
            tag: "quant",
            content: `**Sequential Probability Ratio Test (SPRT)**

Wald (1945): optimal sequential test (minimax Average Sample Number). Calculates Λₙ = Σᵢ log[f₁(xᵢ)/f₀(xᵢ)]. If Λₙ ≥ log(B): reject H₀. If Λₙ ≤ log(A): accept H₀. If in between: continue observing.

**Generalized CUSUM — online GLRT**

Modernized Page's CUSUM: Gₙ = max_{0≤k≤n} [Sₙ - Sₖ] where Sₙ = Σᵢ log[f₁(xᵢ)/f₀(xᵢ)]. The GLRT version does not know θ₁ and estimates: Gₙ = max_{0≤k≤n} max_{θ} Σᵢ₌ₖ₊₁^n log[f(xᵢ;θ)/f(xᵢ;θ₀)].

**Average Run Length (ARL)**

ARL₀ = E[time to alarm | no change]. ARL₁ = E[time to detection | change]. Fundamental trade-off: you cannot improve both simultaneously.`,
            formulas: [
              {
                label: "CUSUM bilateral",
                content: "S^{+}_n = \\max(0, S^{+}_{n-1} + \\Lambda_n - k)"
              },
              {
                label: "ARL control",
                content: "k = \\frac{\\sigma}{2}, \\quad h = ARL_0 \\text{ control}"
              }
            ],
            codeExamples: [
              {
                language: "python",
                title: "CUSUM for regime detection",
                code: `import numpy as np

def cusum_detector(data, threshold=5, drift=0.5):
    """
    CUSUM for regime change detection
    data: return array
    threshold: h (generates alarm)
    drift: k (slack to absorb noise)
    """
    s_pos = 0  # Positive CUSUM
    s_neg = 0  # Negative CUSUM
    alarms = []
    
    for i, x in enumerate(data):
        # Update CUSUM
        s_pos = max(0, s_pos + x - drift)
        s_neg = min(0, s_neg + x + drift)
        
        # Detect change
        if s_pos > threshold:
            alarms.append(('bull', i))
            s_pos = 0  # Reset
        elif s_neg < -threshold:
            alarms.append(('bear', i))
            s_neg = 0  # Reset
    
    return alarms

# Use with NQ returns
alarms = cusum_detector(nq_returns, threshold=5, drift=0.5)
for regime, idx in alarms:
    print(f"{regime.upper()} regime detected at bar {idx}")`,
                annotations: [
                  "threshold controls ARL₀ (false alarms)",
                  "drift absorbs normal market noise",
                  "Adjust according to asset volatility"
                ]
              }
            ]
          },
          {
            id: "09-02",
            title: "Particle Filters — real-time non-linear Bayesian estimation",
            tag: "quant",
            content: `**Sequential Monte Carlo (SMC) / Particle Filter**

The particle filter approximates P(Sₜ | y₁:ₜ) using N particles {s^(i)_t, w^(i)_t}. Algorithm: (1) Predict: propagate each particle according to the regime dynamics. (2) Update: update weights according to likelihood. (3) Resample: eliminate low-weight particles.

**Particle filter for MS-GARCH**

MS-GARCH has no exact analytical filter — the particle filter is the solution. Each particle represents (Sₜ, hₜ): the regime AND the conditional variance. N = 500-2000 particles is usually sufficient.

**SMC with Parameter Learning — Liu & West (2001)**

Each particle carries {s^(i)_t, θ^(i)_t}. The prior on θ is perturbed at each step (jittering) to prevent collapse. This allows the model to "learn" new regimes in real time.`,
diagram: {
              type: "mermaid",
              title: "Particle Filter for regimes",
              content: `flowchart TD
    A["N particles"] --> B{"Predict"}
    B --> C["Propagate according to dynamics"]
    C --> D["Update weights"]
    D --> E{"Low weight?"}
    E -->|Yes| F["Resample"]
    E -->|No| G["Retain"]
    F --> H["Duplicate high weight particles"]
    H --> I["Estimate P(regime)"]
    G --> I
    I --> A`
            }
          },
          {
            id: "09-03",
            title: "Kalman Extensions — Regime-Switching Kalman Filter",
            tag: "advanced",
            content: `**Switching State Space Models (Kim 1994)**

Kim's model combines Kalman filter (continuous state) with Hamilton filter (discrete state). State: xₜ ~ linear Gaussian given Sₜ; Sₜ ~ Markov chain. Kim's approximation collapses the mixture at each step to maintain O(K) components.

**Interacting Multiple Model (IMM)**

IMM (Blom & Bar-Shalom 1988): at each step, mixes K Kalman models with weights that evolve according to the likelihood. More efficient than particle filter but less flexible. Useful for trend tracking with three models: "uptrend", "downtrend", "lateral".`,
            exercise: {
              question: "What is the main advantage of IMM over the particle filter?",
              options: [
                "More precise for non-linearities",
                "More computationally efficient",
                "Fewer parameters to adjust",
                "Better for asymmetric regimes"
              ],
              correctAnswer: 1,
              explanation: "IMM is more computationally efficient than the particle filter and converges faster. However, it is less flexible for non-linearities."
            }
          }
        ]
      },
      {
        id: "10",
        title: "Regime-Conditional Trading",
        subtitle: "From theory to real application",
        topics: [
          {
            id: "10-01",
            title: "Position Sizing under regime uncertainty",
            tag: "advanced",
            content: `**Regime-conditioned Kelly fraction**

Kelly with regimes: f*(t) = Σₖ P(Sₜ=k) · f*_k where f*_k = μₖ/σ²ₖ is the Kelly of regime k. This automatically gives larger sizing in regimes with better Sharpe ratios and smaller sizing when there is uncertainty.

**Regime-aware stop sizing**

The ATR changes radically between regimes. In high vol: ATR can be 3-5× that of low vol. Stop = k × ATR_regime. For NQ in high vol: k=2-3 ATR; in low vol: k=1-1.5 ATR.

**Regime transition costs**

If the detection lag is L bars and the new regime has a different Sharpe ratio: E[gain] vs. cost = bid-ask × (2 × position). The breakeven detection lag must be calculated for each setup.`,
            formulas: [
              {
                label: "Conditioned Kelly",
                content: "f^*(t) = \\sum_k P(S_t=k) \\cdot f^*_k = \\sum_k P(S_t=k) \\cdot \\frac{\\mu_k}{\\sigma_k^2}"
              },
              {
                label: "Sizing based on entropy",
                content: "w(t) = w_{max} \\times \\left[1 - \\frac{H(t)}{\\log_2(K)}\\right]"
              }
            ],
            codeExamples: [
              {
                language: "python",
                title: "Regime-conditional Kelly",
                code: `def regime_kelly_fractions(returns_by_regime, probabilities):
    """
    Calculates Kelly fractions conditioned on regime probabilities
    returns_by_regime: dict {regime: returns_array}
    probabilities: array of P(S_t=k)
    """
    kelly_fractions = {}
    
    for regime, returns in returns_by_regime.items():
        # Regime Kelly
        mu = np.mean(returns)
        sigma = np.std(returns)
        kelly_fractions[regime] = mu / (sigma ** 2)
    
    # Kelly weighted by regime probability
    weighted_kelly = sum(
        p * kelly_fractions[r]
        for r, p in enumerate(probabilities)
    )
    
    return weighted_kelly, kelly_fractions

# Example
probs = filtered_probabilities_from_hmm  # [0.3, 0.5, 0.2]
kelly, fracs = regime_kelly_fractions(
    {0: bull_returns, 1: neutral_returns, 2: bear_returns},
    probs
)
print(f"Recommended Kelly: {kelly:.2%}")`,
                annotations: [
                  "Use filtered probabilities from the HMM/BOCPD to weight",
                  "When probabilities are diffuse, weighted_kelly → 0",
                  "Adjust by Kelly factor (use half-Kelly)"
                ]
              }
            ]
          },
          {
            id: "10-02",
            title: "Strategy Switching — mean reversion vs momentum by regime",
            tag: "advanced",
            content: `**Autocorrelation as a regime classifier**

ρ₁ > 0 = momentum regime. ρ₁ < 0 = mean-reversion regime. ρ₁ ≈ 0 = random walk. Calculate rolling over a 20-bar window. Threshold: ρ₁ > +0.15 → momentum, ρ₁ < -0.15 → reversal.

**Hurst exponent by regime**

H > 0.5: trending (favorable for momentum). H < 0.5: anti-persistence (favorable for fade). H ≈ 0.5: random walk.

**Meta-strategy: regime-weighted ensemble**

Signal = Σₖ P(Sₜ=k) × Signal_k. This smooths transitions and prevents over-trading in transition regimes.`,
            regimeMatrixData: [
              { label: "ρ₁ > 0.15", title: "Momentum", description: "Follow trend", color: "#22c55e" },
              { label: "ρ₁ < -0.15", title: "Mean Reversion", description: "Fade movements", color: "#ef4444" },
              { label: "H > 0.6", title: "Strong trending", description: "Aggressive", color: "#f59e0b" },
              { label: "H < 0.4", title: "Anti-persistent", description: "Reversal", color: "#a78bfa" }
            ],
            callouts: [
              { type: "info", title: "Empirical observation", text: "The regime with the greatest edge is not the one with maximum trend, but rather the range expansion (vol expansion from compression). Historical Sharpe superior to the average." }
            ]
          },
          {
            id: "10-03",
            title: "Factor Exposure Management and Regime Portfolio Construction",
            tag: "quant",
            content: `**Regime-conditioned factor loadings**

rₜ = α(Sₜ) + β(Sₜ)'Fₜ + εₜ. In risk-on: high beta, positive size and momentum. In risk-off: defensive beta, positive quality, negative momentum.

**Regime-conditional portfolio optimization**

max_{w} Σₖ P(Sₜ=k) [w'μₖ - (λ/2)w'Σₖw]. When uncertainty is high, it approximates the minimum variance portfolio. When there is certainty about the regime, it converges to the optimum of the specific regime.

**Tail risk in regime transitions**

The greatest risk is not within a regime but in the transitions. Mitigation: (1) options to hedge transition risk, (2) reduce exposure when filtered probabilities show increasing uncertainty, (3) track "regime entropy" H = -Σₖ P(Sₜ=k)·log(P(Sₜ=k)).`,
            formulas: [
              {
                label: "Regime Entropy",
                content: "H(t) = -\\sum_k P(S_t=k | y_{1:t}) \\cdot \\log_2[P(S_t=k)]"
              },
              {
                label: "Sizing rule",
                content: "w(t) = w_{max} \\times [1 - H(t)/\\log_2(K)]"
              }
            ],
            callouts: [
              { type: "warning", title: "The most costly error", text: "Switching strategies too fast (over-fitting) or too slow (excessive lag). The ARL₁ of the detector must be less than the average duration of the regimes." }
            ],
            exercise: {
              question: "What does high regime entropy (H close to log₂(K)) indicate?",
              options: [
                "The market is in a defined regime",
                "The market is in transition",
                "Dealers have a lot of gamma",
                "VIX is very high"
              ],
              correctAnswer: 1,
              explanation: "H = 0 means total certainty (one regime dominates). H = log₂(K) means maximum uncertainty (all regimes equally likely) = regime transition. When H grows, reduce sizing."
            }
          }
        ]
      }
    ]
  }
};

export const moduleList = [
  { id: "00", title: "Study plan" },
  { id: "01", title: "Statistical foundations" },
  { id: "02", title: "Markov Switching" },
  { id: "03", title: "Hidden Markov Models" },
  { id: "04", title: "Volatility Regimes" },
  { id: "05", title: "Microstructure" },
  { id: "06", title: "Correlations" },
  { id: "07", title: "Machine Learning" },
  { id: "08", title: "Options Regimes" },
  { id: "09", title: "Real-Time Detection" },
  { id: "10", title: "Trading Applications" },
];
