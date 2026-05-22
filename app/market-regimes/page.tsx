"use client";

import {
  HeroSection,
  ModuleSection,
  TopicCard,
  Subtopic,
  FormulaBox,
  Callout,
  ResourcePills,
  Timeline,
} from "@/components/MarketRegimesVisualComponents";

const timelineItems = [
  { period: "Weeks 1-2", title: "Statistical Foundations and Change Point Detection", description: "Stationarity under regimes, Chow and Bai-Perron tests, classic CUSUM, information criteria (AIC/BIC/HQ). Without this, everything else is a black box.", color: "#f59e0b" },
  { period: "Weeks 3-4", title: "Hamilton Markov Switching and the MS Family", description: "The original model of Hamilton (1989), EM estimation, Hamilton filter, MS-VAR, MS-GARCH. Implement from scratch in Python.", color: "#a78bfa" },
  { period: "Weeks 5-6", title: "Hidden Markov Models", description: "Baum-Welch (EM for HMM), Viterbi, forward-backward. Gaussian HMM vs. GMM-HMM. hmmlearn in Python. Multivariate HMM applied to ES/NQ.", color: "#22d3ee" },
  { period: "Weeks 7-8", title: "Volatility and Correlation Regimes", description: "RS-GARCH, HAR-RV, VIX term structure, DCC-GARCH, copulas, contagion vs. interdependence. Distinguish volatility regimes from directional regimes.", color: "#ef4444" },
  { period: "Weeks 9-10", title: "Microstructure and Order Flow", description: "PIN/VPIN, order flow toxicity, AMT regimes, DOM absorption/exhaustion, footprint regimes, delta divergence. Direct application to NQ/ES.", color: "#22c55e" },
  { period: "Weeks 11-12", title: "Advanced Machine Learning", description: "GMM clustering of returns, BOCPD (Bayesian Online Changepoint Detection), autoencoders for anomaly-based shifts, LSTM regime classification.", color: "#f472b6" },
  { period: "Weeks 13-14", title: "Options Regimes and Real-Time Detection", description: "GEX/DEX regimes, vol surface regime classification, 0DTE flow, SPRT, particle filters, Kalman extensions for real-time detection.", color: "#fb923c" },
  { period: "Weeks 15-16", title: "Trading Applications", description: "Regime-conditional position sizing, strategy switching, factor exposure management, portfolio construction under regime uncertainty.", color: "#34d399" },
];

export default function MarketRegimesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-midnight-void)]">
      <div className="max-w-5xl mx-auto px-8 pb-20">
        
        <HeroSection
          title="Master Class"
          subtitle="From statistical detection of structural changes to the application of HMMs, Markov switching models, market microstructure, options, and deep learning. This guide covers all levels with a quantitative and practical focus."
          stats={[
            { num: "10", label: "Modules", color: "var(--color-cosmic-violet)" },
            { num: "30+", label: "Topics", color: "var(--color-quantum-teal)" },
            { num: "80+", label: "Subtopics", color: "var(--color-sunflare-yellow)" },
            { num: "Inf", label: "Depth", color: "var(--color-ghost-gray)" },
          ]}
        />

        {/* Recommended Study Plan */}
        <ModuleSection num="00" title="Recommended Study Plan" subtitle="optimal learning sequence">
          <Timeline items={timelineItems} />
        </ModuleSection>

        {/* Module 01 */}
        <ModuleSection num="01" title="Statistical Foundations of Regimes" subtitle="the mathematical language behind everything">
          <TopicCard title="Change Point Detection" tag="core" tagColor="core">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              The core problem: given a process, detect whether the parameters of the data-generating process change at some unknown point. There are three main families of methods with radically different philosophies.
            </p>
            <Subtopic title="PELT - Pruned Exact Linear Time">
              A dynamic programming algorithm that finds the optimal number of change points by minimizing a penalized criterion. Average complexity of O(n). Minimizes C(y_s:t) + beta for each segment. The beta penalty controls the trade-off between fit and parsimony.
            </Subtopic>
            <Subtopic title="Binary Segmentation and Wild Binary Segmentation">
              BS recursively applies a hypothesis test over the entire segment, splitting at the point with the highest test statistic. Wild BS (WBS) improves consistency by using random segments to prevent late changes from being masked by early ones.
            </Subtopic>
            <Subtopic title="Bayesian Online Changepoint Detection (BOCPD)">
              Adams & MacKay (2007). Instead of looking for change points in batch, it calculates P(r_t | x_1:t) in real time, where r_t is the "run length" (time since the last change point). Uses conjugate-exponential models so that the update is analytical.
            </Subtopic>
            <FormulaBox>
{`// Generalized CUSUM (two-sided)
S+_t = max(0, S+_t-1 + x_t - mu_0 - k)
S-_t = min(0, S-_t-1 + x_t - mu_0 + k)
Signal alarm when S+_t > h  or  |S-_t| > h

// Penalized criterion (PELT)
Q(tau_1...tau_k) = Sum_i [C(y_tau_i-1:tau_i) + beta]`}
            </FormulaBox>
            <ResourcePills items={["ruptures (Python)", "changepoint (R)", "bayesian_changepoint_detection"]} />
          </TopicCard>

          <TopicCard title="Structural Breaks - Formal Tests" tag="core" tagColor="core">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              Structural break tests distinguish changes in model parameters from the normal variability of the process. The philosophical difference with change point detection: here we assume a specific parametric model and test whether its parameters change.
            </p>
            <Subtopic title="Chow Test (1960)">
              The classic test for a known break point t: H0: beta1 = beta2 (coefficients are equal before and after t). F-statistic = [(RSS_R - RSS_U)/k] / [RSS_U/(n-2k)]. Critical limitation: requires t to be known a priori.
            </Subtopic>
            <Subtopic title="Bai-Perron (1998, 2003)">
              Allows multiple simultaneous unknown breaks. Uses the theory of supF statistics (Andrews 1993) and supF(l+1|l) to determine the number of breaks sequentially.
            </Subtopic>
            <Subtopic title="Andrews supF and QLR Test">
              For an unknown break point in a range. supF = max F(t). The QLR (Quasi-LR) of Andrews uses a HAC variance estimator for robustness against heteroscedasticity.
            </Subtopic>
            <Callout type="warning">
              Look-ahead bias in structural break detection is devastating. Always evaluate your detector out-of-sample and measure the average detection lag (ADL).
            </Callout>
          </TopicCard>
        </ModuleSection>

        {/* Module 02 */}
        <ModuleSection num="02" title="Classic Regime Switching Models" subtitle="Hamilton (1989) and his extended family">
          <TopicCard title="Hamilton Markov-Switching Model" tag="advanced" tagColor="advanced">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              Hamilton's (1989) paper on business cycles is the foundational model. The idea: the parameters of the AR process change depending on a latent Markov state that is not directly observable.
            </p>
            <Subtopic title="Complete MS-AR(p) Specification">
              y_t = mu(S_t) + phi_1(S_t)(y_t-1 - mu(S_t-1)) + ... + phi_p(S_t)(y_t-p - mu(S_t-p)) + sigma(S_t)*epsilon_t. The parameters that change can be: mean only (MSM), variance only (MSV), or both (MSMV).
            </Subtopic>
            <Subtopic title="Hamilton Filter">
              It is a filter analogous to the Kalman filter but for discrete states. It defines predicted and filtered probabilities. The update uses Bayes' rule.
            </Subtopic>
            <Subtopic title="Kim Smoother">
              The Hamilton filter gives filtered probabilities (using data up to t). Kim's smoother (1994) gives smoothed probabilities using the entire sample—more precise but requires a backward pass.
            </Subtopic>
            <FormulaBox>
{`// Transition matrix (K=2 regimes)
P = [[p_11  p_12],
     [p_21  p_22]]

// Expected duration in regime j
E[duration in regime j] = 1 / (1 - p_jj)`}
            </FormulaBox>
            <ResourcePills items={["statsmodels.tsa.regime_switching", "MSM (Python)", "MSwM (R)"]} />
          </TopicCard>

          <TopicCard title="Threshold Models" tag="advanced" tagColor="advanced">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              Threshold models are an alternative to Markov-switching: the regime is not hidden, but is instead determined by an observable variable crossing a threshold.
            </p>
            <Subtopic title="TAR - Threshold Autoregressive">
              y_t = (phi_10 + phi_11*y_t-1 + epsilon_t)*I(q_t-d &lt;= gamma) + (phi_20 + phi_21*y_t-1 + epsilon_t)*I(q_t-d &gt; gamma). The threshold variable can be the price itself or another variable.
            </Subtopic>
            <Subtopic title="LSTAR - Logistic Smooth Transition AR">
              Instead of the discontinuous indicator function, it uses a logistic transition. The transition between regimes is gradual—more realistic for markets where the regime never changes abruptly.
            </Subtopic>
            <Subtopic title="MTAR - Momentum Threshold AR">
              Especially relevant for asymmetric cointegration. The threshold is not the level but the difference (momentum). Useful for modeling asymmetric adjustments.
            </Subtopic>
          </TopicCard>
        </ModuleSection>

        {/* Module 03 */}
        <ModuleSection num="03" title="Hidden Markov Models" subtitle="the probabilistic framework for latent regimes">
          <TopicCard title="HMM Architecture" tag="core" tagColor="core">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              An HMM is defined by lambda = (A, B, pi) where A is the transition matrix, B are the emission distributions, and pi are the initial probabilities. Rabiner (1989) defined the three fundamental problems.
            </p>
            <Subtopic title="Problem 1: Evaluation">
              What is the probability of the observed sequence given the model? Solved with the forward algorithm: alpha_t(i) = P(o_1,...,o_t, S_t=i | lambda).
            </Subtopic>
            <Subtopic title="Problem 2: Decoding - Viterbi">
              What is the most probable sequence of latent states? Viterbi uses dynamic programming.
            </Subtopic>
            <Subtopic title="Problem 3: Learning - Baum-Welch">
              EM for HMM. E-step: computes gamma_t(i) and xi_t(i,j) using forward-backward. M-step: updates A, B, pi.
            </Subtopic>
            <FormulaBox>
{`// Forward-backward algorithm
alpha_t(j) = b_j(o_t) * Sum_i alpha_t-1(i)*a_ij      [forward]
beta_t(i) = Sum_j a_ij * b_j(o_t+1) * beta_t+1(j)    [backward]
gamma_t(i) = alpha_t(i)*beta_t(i) / Sum_j alpha_t(j)*beta_t(j)`}
            </FormulaBox>
          </TopicCard>

          <TopicCard title="HMM in Markets" tag="advanced" tagColor="advanced">
            <Subtopic title="Gaussian HMM vs GMM-HMM">
              Gaussian HMM: each state emits o_t ~ N(mu_i, Sigma_i). GMM-HMM: each state emits from a mixture of Gaussians—more flexible but has more parameters.
            </Subtopic>
            <Subtopic title="Student-t HMM for Fat Tails">
              Since NQ returns have high empirical kurtosis, the Student-t HMM is more appropriate.
            </Subtopic>
            <Subtopic title="Features for HMM in Markets">
              The choice of the observation vector is crucial. Options: returns only, returns + realized volatility, returns + vol + skew + volume.
            </Subtopic>
            <ResourcePills items={["hmmlearn (Python)", "pomegranate (Python)"]} />
          </TopicCard>
        </ModuleSection>

        {/* Module 04 */}
        <ModuleSection num="04" title="Volatility Regimes" subtitle="the most critical dimension for trading">
          <TopicCard title="RS-GARCH and Volatility Switching GARCH" tag="advanced" tagColor="advanced">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              GARCH models capture volatility clustering but assume dynamics are stationary. RS-GARCH models allow parameters to switch between regimes.
            </p>
            <Subtopic title="Haas-Mittnik-Paolella (2004)">
              Each regime k has its own independent GARCH process: h_k,t = omega_k + alpha_k*epsilon^2_t-1 + beta_k*h_k,t-1. This avoids the path dependence problem.
            </Subtopic>
            <Subtopic title="Realized Volatility Regimes - HAR-RV">
              The HAR-RV model captures the heterogeneous autoregressive structure of realized volatility.
            </Subtopic>
            <Subtopic title="Separating Volatility Regimes from Price Regimes">
              Common conceptual error: assuming high vol regime = bearish regime. These are orthogonal dimensions.
            </Subtopic>
            <FormulaBox>
{`// Volatility Ratio
VR(t) = RV_short(t) / RV_long(t)
VR > 1.5  -->  vol expansion (breakout/crisis)
VR < 0.7  -->  vol compression (coiling)`}
            </FormulaBox>
          </TopicCard>

          <TopicCard title="VIX Term Structure Regimes" tag="advanced" tagColor="advanced">
            <Subtopic title="The VIX Curve and its Regimes">
              The VIX futures curve defines 3 structural regimes: (1) Normal Contango: calm market. (2) Severe Backwardation: active crisis. (3) Kink structure: uncertainty concentrated in the short term.
            </Subtopic>
            <Subtopic title="Quantitative Term Structure Metrics">
              Roll yield: (VX2 - VX1) / VX1. Contango ratio: VX1/VX3 - if &lt; 0.85: severe backwardation.
            </Subtopic>
            <Subtopic title="VVIX">
              VVIX measures the implied volatility of options on the VIX. VVIX &gt; 130 typically precedes or coincides with VIX spikes.
            </Subtopic>
            <Callout type="info">
              For NQ/ES: the VIX term structure is one of the best leading indicators of regime.
            </Callout>
          </TopicCard>
        </ModuleSection>

        {/* Module 05 */}
        <ModuleSection num="05" title="Microstructure and Order Flow" subtitle="regimes at the trade and DOM level">
          <TopicCard title="PIN and VPIN" tag="quant" tagColor="quant">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              The EKOP model (Easley, Kiefer, O'Hara, Paperman 1996) defines PIN as the fraction of order flow coming from informed traders.
            </p>
            <Subtopic title="VPIN - Volume-Synchronized PIN">
              PIN requires classifying trades. VPIN uses volume as a clock: it divides total volume into buckets. High VPIN indicates toxic order flow.
            </Subtopic>
            <Subtopic title="Order Flow Toxicity">
              Order flow toxicity = elevated VPIN + spread widening + depth reduction. In NQ: during high-VPIN sessions, intraday moves have higher momentum.
            </Subtopic>
            <ResourcePills items={["VPIN calculation libraries"]} />
          </TopicCard>

          <TopicCard title="AMT and DOM Regimes" tag="advanced" tagColor="advanced">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              From the perspective of Auction Market Theory, regimes are defined by the state of the auction: is the market facilitating or rejecting prices?
            </p>
            <Subtopic title="Balance vs. Imbalance Regimes">
              Balance: the market is in a symmetric distribution around the POC. Imbalance: sustained buying or selling pressure.
            </Subtopic>
            <Subtopic title="DOM Absorption vs. Exhaustion">
              Absorption: price advances against a large bid/ask stack that is progressively consumed.
            </Subtopic>
            <Subtopic title="POC Shifting Regimes">
              The POC of the volume profile migrates during the day. A POC migrating consistently in one direction = value rotation regime.
            </Subtopic>
          </TopicCard>
        </ModuleSection>

        {/* Module 06 */}
        <ModuleSection num="06" title="Correlation and Cross-Asset Regimes" subtitle="when everything moves together (or not)">
          <TopicCard title="DCC-GARCH" tag="advanced" tagColor="advanced">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              Engle (2002): DCC-GARCH models time-varying correlations without the parameter explosion of BEKK.
            </p>
            <Subtopic title="DCC Specification">
              Stage 1: estimate a univariate GARCH for each asset. Stage 2: model the dynamic correlation with Q_t.
            </Subtopic>
            <Subtopic title="Correlation Regimes from DCC">
              Once DCC is estimated, apply an HMM on the dynamic correlation series to classify regimes.
            </Subtopic>
            <ResourcePills items={["rmgarch (R)", "arch (Python)"]} />
          </TopicCard>

          <TopicCard title="Copulas for Extreme Dependence Regimes" tag="quant" tagColor="quant">
            <Subtopic title="Sklar's Theorem and Copulas in Trading">
              Sklar (1959): any joint distribution F(x,y) = C(F_X(x), F_Y(y)) where C is a copula.
            </Subtopic>
            <Subtopic title="Mixture Copulas for Regimes">
              A mixture copula combines copulas from different regimes.
            </Subtopic>
          </TopicCard>
        </ModuleSection>

        {/* Module 07 */}
        <ModuleSection num="07" title="Machine Learning for Regimes" subtitle="beyond parametric models">
          <TopicCard title="Unsupervised Clustering" tag="advanced" tagColor="advanced">
            <Subtopic title="GMM - Gaussian Mixture Models">
              Special case of HMM where the temporal sequence of states is independent. GMM estimates K Gaussian distributions that best describe the feature distribution.
            </Subtopic>
            <Subtopic title="K-means on Returns">
              K-means assumes spherical clusters and does not handle temporal structure well.
            </Subtopic>
            <Subtopic title="DBSCAN for Anomaly Detection">
              DBSCAN does not require specifying K a priori and can identify unassigned points.
            </Subtopic>
          </TopicCard>

          <TopicCard title="BOCPD" tag="quant" tagColor="quant">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              Adams & MacKay (2007) is the most elegant framework for real-time regime detection. The key variable is r_t = "run length".
            </p>
            <Subtopic title="BOCPD Architecture">
              With each new data point x_t, the algorithm maintains the distribution P(r_t | x_1:t). The hazard function is a hyperparameter.
            </Subtopic>
            <ResourcePills items={["BOCPD libraries"]} />
          </TopicCard>
        </ModuleSection>

        {/* Module 08 */}
        <ModuleSection num="08" title="Options Market Regimes" subtitle="the options market as a regime indicator">
          <TopicCard title="GEX and DEX Regimes" tag="advanced" tagColor="advanced">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              Gamma Exposure (GEX) captures how much delta hedging option dealers need to do when the price moves.
            </p>
            <Subtopic title="GEX Regimes">
              Positive GEX (dealer long gamma): dealers act as market buffers. Negative GEX: dealers amplify price movements.
            </Subtopic>
            <Subtopic title="Quantifying GEX">
              GEX = Sum_options [Open_Interest * Gamma * 100 * Spot^2]. GEX &gt; +$1B in SPX: suppressed volatility regime. GEX &lt; -$1B: elevated volatility regime.
            </Subtopic>
            <ResourcePills items={["SpotGamma methodology", "Squeezemetrics GEX"]} />
          </TopicCard>

          <TopicCard title="0DTE Regimes" tag="advanced" tagColor="advanced">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              0DTE options on SPX have grown to represent more than 40% of option volume. This has fundamentally changed intraday regimes.
            </p>
            <Subtopic title="Intraday 0DTE Flow Regimes">
              Open: positioning, two-way flow. Midday: price gravitating toward the strike with the highest OI. Close: accelerated charm/delta decay.
            </Subtopic>
            <Subtopic title="Charm Flow Regimes">
              In 0DTE, charm is extreme: an ATM call loses 0.02-0.05 delta per hour.
            </Subtopic>
          </TopicCard>
        </ModuleSection>

        {/* Module 09 */}
        <ModuleSection num="09" title="Real-Time Regime Detection" subtitle="online detection without look-ahead bias">
          <TopicCard title="SPRT and Modern CUSUM" tag="quant" tagColor="quant">
            <Subtopic title="Sequential Probability Ratio Test (SPRT)">
              Wald (1945): the SPRT is the optimal sequential test. It calculates the cumulative log-likelihood ratio.
            </Subtopic>
            <Subtopic title="Generalized CUSUM">
              Page's (1954) modernized CUSUM uses the difference between log-likelihood ratios.
            </Subtopic>
            <Subtopic title="Average Run Length (ARL)">
              ARL_0 = E[alarm time | no change] - we want this to be large. ARL_1 = E[detection time | there is a change] - we want this to be small.
            </Subtopic>
          </TopicCard>

          <TopicCard title="Particle Filters" tag="quant" tagColor="quant">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              The particle filter approximates the posterior distribution P(S_t | y_1:t) using N particles.
            </p>
            <Subtopic title="Sequential Monte Carlo">
              Each particle is a hypothesis about the latent state with a weight proportional to likelihood.
            </Subtopic>
            <ResourcePills items={["filterpy (Python)", "pyzmq SMC"]} />
          </TopicCard>
        </ModuleSection>

        {/* Module 10 */}
        <ModuleSection num="10" title="Regime-Conditional Trading" subtitle="from theory to real-world application">
          <TopicCard title="Position Sizing Under Regime Uncertainty" tag="advanced" tagColor="advanced">
            <Subtopic title="Regime-Conditional Kelly Fraction">
              Kelly with regimes: f*(t) = Sum_k P(S_t=k) * f*_k where f*_k = mu_k / sigma^2_k is the Kelly of regime k.
            </Subtopic>
            <Subtopic title="Regime-Aware Stop Sizing">
              ATR changes radically between regimes. A fixed stop in ticks is too narrow in high vol and too wide in low vol.
            </Subtopic>
          </TopicCard>

          <TopicCard title="Strategy Switching" tag="advanced" tagColor="advanced">
            <p className="text-[15px] text-[var(--color-stardust-gray)] leading-relaxed mb-6">
              In regimes of high autocorrelation: momentum strategies work. In regimes of low autocorrelation: mean-reversion strategies work.
            </p>
            <Subtopic title="Regime-Based Strategy Selection">
              The autocorrelation of returns at different lags is a good regime classifier.
            </Subtopic>
            <Callout type="info">
              Design a "Regime Dashboard" that combines multiple indicators to give a composite reading of the day's regime.
            </Callout>
          </TopicCard>
        </ModuleSection>

      </div>
    </main>
  );
}