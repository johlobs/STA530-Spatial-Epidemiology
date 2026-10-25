// practice-exam.js
// The instructor's 40 practice questions (STA530_practice_questions_2026HT_student.pdf, Canvas Session 9),
// copied verbatim, with the app's UNOFFICIAL answer key and per-option explanations.
// Fields: n = question number, q = stem, table = optional context table, o = options A-D,
// c = correct letters, e = explanation per option (verdict is added automatically),
// t = related topic ids (sessionN.html#tN-M), confirm = note on items to check at the review session.
(function () {
  'use strict';

  var SECTIONS = {
    1: "1. Fundamentals of Spatial Epidemiology",
    7: "2. Exploratory Spatial Data Analysis",
    15: "3. Spatial Regression",
    23: "4. Bayesian Disease Mapping",
    33: "5. Additional Methods and Applications",
    38: "6. Integrated Public Health Applications"
  };

  var TOPIC_TITLES = {
    "t1-10": "1.10 MAUP", "t1-11": "1.11 Ecological fallacy", "t1-12": "1.12 Dependence and heterogeneity",
    "t2-4": "2.4 Variance instability", "t2-5": "2.5 SMR", "t2-6": "2.6 EB smoothing",
    "t2-7": "2.7 Spatial autocorrelation", "t2-8": "2.8 Contiguity weights", "t2-11": "2.11 Global Moran’s I",
    "t2-13": "2.13 LISA",
    "t3-1": "3.1 OLS with spatial data", "t3-3": "3.3 Spatial lag Wy", "t3-4": "3.4 SAR and ρ",
    "t3-5": "3.5 Direct, indirect, total impacts", "t3-7": "3.7 SEM and λ", "t3-8": "3.8 SAR vs SEM",
    "t3-9": "3.9 Residual Moran’s I",
    "t4-1": "4.1 Same SMR, different information", "t4-2": "4.2 Likelihood", "t4-3": "4.3 Expected counts",
    "t4-5": "4.5 Bayesian idea", "t4-6": "4.6 Partial pooling", "t4-11": "4.11 BYM", "t4-12": "4.12 BYM2",
    "t4-13": "4.13 Priors", "t4-16": "4.16 Posterior summaries", "t4-17": "4.17 RR vs evidence",
    "t4-18": "4.18 Raw → smoothed", "t4-19": "4.19 Cautions", "t4-22": "4.22 Not causal",
    "t6-5": "6.5 Spatial heterogeneity", "t6-7": "6.7 Brushing slopes", "t6-9": "6.9 Access",
    "t6-12": "6.12 Proximity methods", "t6-13": "6.13 2SFCA", "t6-16": "6.16 PCA", "t6-18": "6.18 K-means",
    "t6-22": "6.22 Dependence, confounding, interference", "t6-24": "6.24 Lag ≠ causal spillover",
    "t6-27": "6.27 Neighbour as control", "t7-1": "7.1 Cancer detection", "t7-3": "7.3 Targeted interventions"
  };

  var Q = [
    // ---------- 1. Fundamentals ----------
    { n: 1, q: "A researcher maps the prevalence of diabetes across neighborhoods in a city. The map suggests that neighborhoods with high prevalence tend to be located near other neighborhoods with high prevalence. Which statements are correct?",
      o: ["This pattern is consistent with positive spatial autocorrelation.",
          "Positive spatial autocorrelation means that diabetes prevalence is identical across neighboring neighborhoods.",
          "Positive spatial autocorrelation suggests that nearby areas tend to have more similar values than expected under spatial randomness.",
          "The observed pattern demonstrates that diabetes spreads directly between neighboring areas."],
      c: "AC",
      e: ["High values next to high values is exactly what positive spatial autocorrelation looks like.",
          "Similar, not identical. Autocorrelation is a tendency compared with spatial randomness.",
          "This is the definition: more similarity among neighbours than spatial randomness would produce.",
          "A pattern says nothing about mechanism. Shared exposures, composition or confounding can create the same map; diabetes is not contagious."],
      t: ["t2-7", "t1-12"] },

    { n: 2, q: "Which statements correctly describe spatial dependence and spatial heterogeneity?",
      o: ["Spatial dependence occurs when observations at different geographic locations are statistically related, with the strength of this relationship depending on their spatial proximity or connectivity.",
          "Spatial heterogeneity may refer to geographic variation in characteristics of a process, such as differences in the deprivation–health association across regions.",
          "Spatial heterogeneity and spatial dependence are interchangeable terms.",
          "Spatial dependence and spatial heterogeneity can both be present in the same dataset."],
      c: "ABD",
      e: ["Dependence = observations are related, and the relation depends on proximity or connectivity (Tobler’s first law).",
          "Heterogeneity = the process itself (mean, variance, or a coefficient such as the deprivation slope) varies over space.",
          "They are different ideas: dependence is about values being related to their neighbours, heterogeneity is about the process differing by location.",
          "They often occur together, and can even be hard to tell apart in one cross-sectional dataset."],
      t: ["t1-12", "t6-5"] },

    { n: 3, q: "A researcher constructs a spatial weights matrix using queen contiguity for neighborhood polygons. Which statements are correct?",
      o: ["Two areas are considered neighbors if they share a boundary segment or a vertex.",
          "Two areas are considered neighbors only if they share a boundary segment.",
          "Row standardization makes the weights assigned to an area’s neighbors sum to one, provided that the area has at least one neighbor.",
          "A spatial weights matrix must always be based on geographic distance."],
      c: "AC",
      e: ["Queen contiguity: a shared edge or a shared corner (vertex) is enough.",
          "That is rook contiguity, not queen.",
          "Each weight is divided by the row sum, so the row sums to 1. An island (no neighbours) has a zero row and cannot be standardised.",
          "Contiguity, k-nearest neighbours, distance bands, or even non-geographic connectivity (e.g. travel or social ties) are all possible."],
      t: ["t2-8"] },

    { n: 4, q: "A study finds that neighborhoods with higher average income tend to have lower cardiovascular mortality rates. Which conclusion is most appropriate?",
      o: ["Individuals with higher incomes necessarily have lower cardiovascular mortality.",
          "The observed neighborhood-level association demonstrates that income causes cardiovascular mortality.",
          "The association at the neighborhood level does not necessarily represent the association at the individual level.",
          "The study demonstrates that neighborhood characteristics cannot influence individual health."],
      c: "C",
      e: ["Inferring an individual-level relationship from area-level data is the ecological fallacy.",
          "An observational association, at any level, is not by itself causal evidence.",
          "This is the correct warning against the ecological fallacy.",
          "Nothing in an area-level association rules out contextual effects; if anything, it is consistent with them."],
      t: ["t1-11"] },

    { n: 5, q: "Researchers investigate the geographic distribution of obesity using neighborhood-level data. They repeat their analysis using larger administrative districts. Which statements are correct?",
      o: ["Estimated associations between neighborhood characteristics and obesity may change when geographic boundaries change.",
          "Aggregating smaller geographic areas into larger units may either increase or decrease the observed degree of spatial autocorrelation.",
          "Different geographic aggregation schemes may produce different spatial patterns.",
          "MAUP can be completely eliminated by choosing the smallest available geographic units."],
      c: "ABC",
      e: ["The scale and zoning effects of the MAUP: results depend on the units used.",
          "The direction of the change is not fixed; it depends on how the zones relate to the underlying process. Correlations often grow with aggregation, but not always.",
          "The zoning effect: the same data grouped differently can look different on a map.",
          "Small units reduce some problems but not the MAUP: they still impose a particular zoning and bring unstable rates from small counts."],
      t: ["t1-10"],
      confirm: "B: the app treats “may either increase or decrease” as correct (the direction is not guaranteed)." },

    { n: 6, q: "A map shows that areas with high unemployment rates tend to be geographically clustered. Which statements are justified based on this map alone?",
      o: ["Unemployment appears to exhibit a spatial pattern.",
          "The geographic clustering necessarily indicates statistically significant spatial autocorrelation.",
          "Geographic clustering may motivate further investigation of spatial processes.",
          "The observed pattern proves that unemployment in one neighborhood causes unemployment in neighboring neighborhoods."],
      c: "AC",
      e: ["A visual description is justified, worded cautiously (“appears”).",
          "Eyeballing a map is not a test; maps can mislead (classification, area sizes). Significance needs e.g. Moran’s I with a permutation test.",
          "That is exactly what exploratory mapping is for: generating questions.",
          "A map cannot prove a causal mechanism."],
      t: ["t2-7", "t2-11"] },

    // ---------- 2. ESDA ----------
    { n: 7, q: "In a neighborhood, 24 deaths were observed, while 16 deaths were expected based on the reference population’s mortality rates. What is the SMR?",
      o: ["0.67", "1.00", "1.50", "8.00"],
      c: "C",
      e: ["This is E/O = 16/24, the ratio upside down.",
          "That would require O = E.",
          "SMR = O/E = 24/16 = 1.50: 50% more deaths than expected.",
          "This is O − E = 8, an excess count, not a ratio."],
      t: ["t2-5"] },

    { n: 8, q: "Two neighborhoods have the following mortality data. Which statements are correct?",
      table: [["Neighborhood", "Observed deaths", "Expected deaths", "SMR"], ["A", "3", "1", "3.0"], ["B", "300", "100", "3.0"]],
      o: ["Both neighborhoods have the same estimated relative risk based on their SMRs.",
          "The SMR for Neighborhood A is generally more uncertain because it is based on fewer expected deaths.",
          "The SMR for Neighborhood B must be closer to the true relative risk because its population is larger.",
          "Smoothing methods may be particularly useful for stabilizing estimates in Neighborhood A."],
      c: "ABD",
      e: ["Both SMRs are 3.0, so the point estimates of relative risk are equal.",
          "Var(SMR) ≈ O/E², so the precision grows with E. With E = 1, a single extra death moves the SMR by 1.",
          "“Must” is too strong: B is more precise and will usually be closer, but any single estimate can still miss the truth.",
          "Small-count areas benefit most from shrinkage (EB or Bayesian smoothing)."],
      t: ["t2-4", "t4-1", "t2-6"] },

    { n: 9, q: "A researcher calculates Global Moran’s I for neighborhood obesity prevalence: Moran’s I = 0.42 and permutation-test p-value = 0.001. Which interpretation is most appropriate?",
      o: ["There is statistically significant positive spatial autocorrelation.",
          "Obesity prevalence is identical across neighboring areas.",
          "The results demonstrate that obesity in one neighborhood causes obesity in neighboring neighborhoods.",
          "There is statistically significant negative spatial autocorrelation."],
      c: "A",
      e: ["I > E[I] ≈ −1/(n−1) and p = 0.001: strong evidence against spatial randomness, in the positive direction.",
          "Positive autocorrelation means similar, not identical.",
          "Moran’s I describes a pattern, not a causal mechanism.",
          "Negative autocorrelation would give I below its expectation (dissimilar neighbours)."],
      t: ["t2-11"] },

    { n: 10, q: "A LISA analysis identifies several statistically significant High–High (HH) and Low–High (LH) areas. Which statements are correct?",
      o: ["An HH area has a relatively high value and is surrounded by neighbors with relatively high values.",
          "An LH area has a relatively low value and is surrounded by neighbors with relatively high values.",
          "Every HH area must have the highest value in the entire study region.",
          "LISA can help identify local spatial clusters and spatial outliers."],
      c: "ABD",
      e: ["HH = above the mean, with a spatial lag above the mean (a hot spot).",
          "LH = below the mean while the neighbours are above it (a spatial outlier).",
          "“High” is relative to the mean (standardised z), not the maximum.",
          "HH and LL are clusters; HL and LH are spatial outliers."],
      t: ["t2-13"] },

    { n: 11, q: "A researcher performs Local Moran’s I tests for 200 neighborhoods using a significance threshold of 0.05. Which statements are correct?",
      o: ["Some neighborhoods may be classified as statistically significant simply by chance.",
          "Conducting many local significance tests raises concerns about multiple testing.",
          "A statistically significant HH cluster necessarily represents an area with elevated disease risk after accounting for uncertainty in the underlying disease counts.",
          "LISA results should be interpreted alongside maps, contextual information, and the characteristics of the data."],
      c: "ABD",
      e: ["Even under spatial randomness, around 5% (≈ 10 of 200) would be flagged.",
          "200 tests, which are also correlated because neighbourhoods overlap: Bonferroni or FDR, or at least caution, is needed.",
          "LISA on raw rates ignores count uncertainty (small-number instability), so an HH cluster is not necessarily elevated risk. That is what Bayesian disease mapping addresses.",
          "LISA is exploratory and is read in context."],
      t: ["t2-13"] },

    { n: 12, q: "A researcher maps disease incidence using both raw rates and empirical Bayes (EB) smoothed rates. Which statements are correct?",
      o: ["Raw rates in areas with small populations may be highly unstable.",
          "EB smoothing generally pulls unstable estimates toward a reference mean.",
          "EB smoothing guarantees that all true local disease clusters will become easier to identify.",
          "Smoothing may reduce extreme values that arise from random variation."],
      c: "ABD",
      e: ["Variance instability: Var(rate) ∝ 1/population.",
          "EB shrinks each rate toward the global (or local) mean, more so the smaller the population.",
          "Smoothing can also hide real, small, sharp clusters (oversmoothing). Nothing is guaranteed.",
          "That is the purpose: remove noise-driven extremes."],
      t: ["t2-6"] },

    { n: 13, q: "Global Moran’s I is not statistically significant, but LISA identifies several statistically significant local clusters. Which statements are correct?",
      o: ["This combination of results is impossible.",
          "Global Moran’s I summarizes overall spatial autocorrelation, whereas LISA examines local spatial patterns.",
          "Local spatial patterns may exist even when the global statistic does not provide strong evidence of overall spatial autocorrelation.",
          "The significant LISA clusters prove that the global Moran’s I calculation is incorrect."],
      c: "BC",
      e: ["It is common: local clusters can be averaged away globally (or be chance findings among many tests).",
          "Global I is (proportional to) the average of the local Moran’s Iᵢ.",
          "A few local pockets, or positive and negative patterns cancelling out, can leave the global statistic non-significant.",
          "The two answer different questions; neither invalidates the other."],
      t: ["t2-11", "t2-13"] },

    { n: 14, q: "A researcher wants to identify neighborhoods where underlying disease risk is likely to be elevated. Data include observed counts, expected counts, SMRs, and Bayesian posterior relative-risk estimates. Which statements are correct?",
      o: ["Mapping raw disease counts alone may be misleading because neighborhoods differ in population size.",
          "SMRs account for differences in expected counts but may produce unstable estimates when expected counts are small.",
          "Mapping posterior mean relative risks can provide smoothed estimates of underlying disease risk.",
          "Areas with the highest SMRs necessarily have the highest posterior probabilities that relative risks exceed 1."],
      c: "ABC",
      e: ["Counts mostly map population size.",
          "SMR = O/E adjusts for size and age structure, but is noisy when E is small.",
          "Posterior means borrow strength and are smoothed.",
          "A high SMR in a tiny area may be shrunk heavily and have a modest exceedance probability, while a large area with a moderate SMR can have P(RR > 1) near 1."],
      t: ["t2-4", "t4-16", "t4-17"] },

    // ---------- 3. Spatial regression ----------
    { n: 15, q: "An OLS model of neighborhood mortality has residuals with significant positive Moran’s I. Which statements are correct?",
      o: ["The model residuals exhibit remaining spatial structure.",
          "The model has necessarily identified a causal effect.",
          "Ignoring residual spatial dependence can make conventional inference unreliable.",
          "It may be useful to investigate a spatial regression specification."],
      c: "ACD",
      e: ["Residual Moran’s I measures exactly that: spatial pattern the covariates did not explain.",
          "Residual autocorrelation, if anything, hints at omitted spatial factors, which is the opposite of a clean causal estimate.",
          "Independence fails, so standard errors are typically too small and p-values too optimistic (and estimates can be biased if a lag process is ignored).",
          "Next step in the workflow: LM tests, then SAR or SEM (or rethinking omitted variables)."],
      t: ["t3-9", "t3-1"] },

    { n: 16, q: "Which statements distinguish SAR and SEM models?",
      o: ["A SAR model includes a spatially lagged outcome among its predictors.",
          "A SEM model represents spatial dependence through an error process.",
          "SAR and SEM necessarily imply identical substantive interpretations.",
          "The choice between them should reflect the hypothesized spatial process and the research question."],
      c: "ABD",
      e: ["SAR: y = ρWy + Xβ + ε.",
          "SEM: y = Xβ + u, with u = λWu + ε.",
          "SAR = outcome dependence and spillover feedback; SEM = spatially structured omitted factors (nuisance). Different stories.",
          "Theory first; LM tests and fit statistics support but do not replace the substantive reasoning."],
      t: ["t3-8"] },

    { n: 17, q: "A fitted SAR model has a positive spatial autoregressive parameter ρ. Which interpretations are appropriate?",
      o: ["The fitted model represents positive outcome dependence through the spatial lag term, conditional on its other components.",
          "A positive ρ proves that health outcomes spread causally across neighborhood boundaries.",
          "The model’s spatial multiplier can create feedback across connected areas.",
          "The sign of ρ alone establishes that the model is correctly specified."],
      c: "AC",
      e: ["ρ > 0: an area’s outcome is positively related to its neighbours’ outcomes (Wy), given X.",
          "A lag term can also absorb omitted spatial confounders or a mis-specified W; it is not proof of a causal spillover.",
          "y = (I − ρW)⁻¹(Xβ + ε): the multiplier spreads a change through neighbours, neighbours’ neighbours, and back.",
          "The sign says nothing about specification; check residuals, compare with SEM, and reason substantively."],
      t: ["t3-4", "t3-5", "t6-24"] },

    { n: 18, q: "A researcher compares the following models: OLS, SAR, and SEM. Which statements are correct?",
      o: ["SAR includes a spatial lag of the outcome.",
          "SEM accounts for spatial dependence through the regression error term.",
          "SAR and SEM represent different mechanisms of spatial dependence, but often can account for spatial autocorrelation in the data.",
          "OLS automatically accounts for spatial dependence by including an intercept."],
      c: "ABC",
      e: ["The Wy term.",
          "The λWu term in the error.",
          "The “same symptom, different story” point: both often remove residual autocorrelation, so good fit alone cannot tell you the mechanism.",
          "An intercept shifts the mean; it does nothing about correlation between neighbouring observations."],
      t: ["t3-8"],
      confirm: "C: read as “both can often remove the residual autocorrelation” (lecture 3, SAR vs SEM)." },

    { n: 19, q: "In a SAR model, the coefficient of deprivation is positive. Which statements are correct?",
      o: ["The coefficient is not necessarily equal to the average total impact of deprivation.",
          "Changes in one area’s deprivation can be associated with changes elsewhere through modeled spatial feedback.",
          "Direct and indirect impacts can help summarize the model’s implied effects.",
          "A positive coefficient proves that deprivation causes mortality."],
      c: "ABC",
      e: ["In SAR, β is not the marginal effect. The total impact is roughly β/(1 − ρ) with row-standardised W.",
          "Through (I − ρW)⁻¹, a change in xⱼ affects y in other areas.",
          "Direct = own-area effect (including feedback); indirect = spillover to others; total = the sum.",
          "Still an observational association under model assumptions."],
      t: ["t3-5"] },

    { n: 20, q: "A study finds a statistically significant positive association between neighborhood deprivation and mortality using a spatial regression model. Which statements are justified?",
      o: ["The model provides evidence of an association under its assumptions.",
          "Accounting for a specified spatial process automatically removes all possible confounding.",
          "The result alone does not establish a causal effect.",
          "The appropriateness of the model depends partly on the substantive research question."],
      c: "ACD",
      e: ["This is the appropriately cautious reading.",
          "Spatial terms handle dependence; they do not remove confounding (spatially structured confounding can even remain or be distorted).",
          "Causal claims need a design and assumptions beyond the model.",
          "The choice of model (lag vs error, which W) should follow the question and hypothesised process."],
      t: ["t6-22", "t4-22"] },

    { n: 21, q: "A researcher defines a row-standardized spatial weights matrix W for areas with at least one neighbor. Which statements about the spatial lag WX are correct?",
      o: ["For such an area, WX is a weighted average of its neighbors’ X values.",
          "WX must be identical to X for every area.",
          "The value of WX depends on how neighbors are defined.",
          "Changing W can change the resulting spatially lagged variable."],
      c: "ACD",
      e: ["With row sums of 1, (WX)ᵢ = Σⱼ wᵢⱼxⱼ is a weighted average (an equal-weight mean under binary contiguity).",
          "WX is the neighbours’ average, not the area’s own value (wᵢᵢ = 0).",
          "Queen vs rook vs k-NN give different neighbour sets and so different lags.",
          "Same point as C: the lag is defined by W."],
      t: ["t3-3"] },

    { n: 22, q: "A spatial error model yields a positive estimate of λ. Which statements are correct?",
      o: ["The model represents spatial dependence in the disturbance term.",
          "The parameter λ is the coefficient of the spatially lagged outcome WY.",
          "Positive λ is consistent with positive dependence in the modeled error process.",
          "A positive λ proves a particular unmeasured factor caused the spatial dependence."],
      c: "AC",
      e: ["u = λWu + ε.",
          "That is ρ in the SAR model. λ multiplies Wu (the error lag).",
          "λ > 0: neighbouring disturbances tend to be similar.",
          "λ is consistent with spatially structured omitted factors, but cannot identify which one."],
      t: ["t3-7"] },

    // ---------- 4. Bayesian disease mapping ----------
    { n: 23, q: "For area i, a disease mapping model uses observed cases Yᵢ, expected cases Eᵢ, and relative risk θᵢ. Which statements are correct?",
      o: ["A common likelihood is Yᵢ ~ Poisson(Eᵢ θᵢ).",
          "Eᵢ may be calculated using reference rates and the area’s population structure.",
          "The expected count Eᵢ must equal the observed count Yᵢ.",
          "θᵢ = 1 corresponds to risk equal to that expected under the reference rates."],
      c: "ABD",
      e: ["The standard count likelihood for disease mapping.",
          "Indirect standardisation: Eᵢ = Σ (reference rate in age/sex group) × (population in that group in area i).",
          "E is what we would expect under reference rates; Y differs from it, which is the whole point.",
          "θ = 1 means no excess risk relative to the reference."],
      t: ["t4-2", "t4-3"] },

    { n: 24, q: "Which statements correctly describe a Bayesian hierarchical disease mapping model?",
      o: ["The likelihood links observed counts to latent risk parameters.",
          "Priors encode assumptions about unknown parameters before observing the current data.",
          "Hyperpriors can be assigned to parameters governing random-effect distributions.",
          "The posterior distribution is identical to the prior distribution regardless of the observed data."],
      c: "ABC",
      e: ["Y | θ ~ Poisson(Eθ) connects data to the latent θ.",
          "Priors describe plausible values before the current data.",
          "E.g. a prior on the variance or precision (τ) of the random effects: the hierarchical level.",
          "Posterior ∝ likelihood × prior; the data update the prior."],
      t: ["t4-5", "t4-13"] },

    { n: 25, q: "Two areas have the same SMR but very different expected counts. Which statements about Bayesian smoothing are correct?",
      o: ["The area with less information will often experience more shrinkage.",
          "Partial pooling allows area estimates to borrow information from a broader model.",
          "Smoothing always preserves the exact ranking of raw SMRs.",
          "Smoothing can reduce instability due to small counts."],
      c: "ABD",
      e: ["Small E means a weak likelihood, so the prior (the overall or neighbourhood mean) dominates.",
          "Borrowing strength from the overall distribution or from neighbours.",
          "Differential shrinkage can reorder areas: a small area with a high SMR can drop below a large area with a moderate SMR.",
          "That is the main motivation."],
      t: ["t4-6", "t4-1"] },

    { n: 26, q: "Consider a BYM2 disease mapping model with structured and unstructured random effects. Which statements are correct?",
      o: ["The structured component can represent similarity between neighboring areas.",
          "The unstructured component can represent area-specific variation not explicitly spatially correlated.",
          "Both components must be identical in every area.",
          "The model can combine spatially structured and unstructured heterogeneity."],
      c: "ABD",
      e: ["The ICAR component uᵢ: centred on the neighbours’ mean.",
          "The iid component vᵢ: independent area-level noise.",
          "They are separate random effects with different values per area.",
          "The point of BYM/BYM2: both kinds of heterogeneity in one random effect."],
      t: ["t4-11", "t4-12"] },

    { n: 27, q: "In the usual BYM2 parameterization, ϕ is the mixing parameter and τ controls the overall random-effect precision. Which statements are correct?",
      o: ["Larger ϕ corresponds to a greater share of the modeled random-effect variance being spatially structured.",
          "Larger τ corresponds to smaller overall random-effect variance, all else equal.",
          "ϕ = 0 means that the spatially structured component contributes none of the random-effect variance.",
          "ϕ = 1 means there is no between-area variation at all."],
      c: "ABC",
      e: ["bᵢ = (1/√τ)(√ϕ·u*ᵢ + √(1−ϕ)·vᵢ): ϕ is the structured share.",
          "Precision = 1/variance; slides: “Larger τ: less residual variability.”",
          "ϕ = 0 gives a purely unstructured (iid) random effect.",
          "ϕ = 1 means all the variation is spatially structured, not that there is none. The amount of variation is set by τ."],
      t: ["t4-12"],
      confirm: "Notation: the Session 4 slides call the mixing parameter ρ; the practice questions call it ϕ. Same parameter." },

    { n: 28, q: "A posterior mean relative risk is 1.30 for an area. Which interpretation is most appropriate?",
      o: ["The posterior mean estimated risk is 30% higher than the reference risk.",
          "The probability that risk is elevated is exactly 0.30.",
          "The area has exactly 30% more observed cases than expected.",
          "The result proves that the area’s true relative risk equals 1.30."],
      c: "A",
      e: ["RR 1.30 = 30% above the reference, as a posterior mean.",
          "Mixes up a risk ratio with an exceedance probability P(RR > 1).",
          "That would be SMR = 1.30. The posterior mean is smoothed and need not equal O/E.",
          "It is a summary of a posterior distribution, with uncertainty around it."],
      t: ["t4-16"] },

    { n: 29, q: "A model reports P(θᵢ > 1 | data) = 0.96 for an area. Which statements are correct?",
      o: ["Under the fitted model, there is a 96% posterior probability that the area’s relative risk exceeds 1.",
          "The posterior probability summarizes uncertainty about whether risk exceeds the chosen threshold.",
          "The probability means that 96% of the area’s residents will develop the disease.",
          "Changing the exceedance threshold could change the reported probability."],
      c: "ABD",
      e: ["The direct Bayesian reading, conditional on the model.",
          "An exceedance probability is a statement about evidence for elevated risk.",
          "It concerns the area’s relative risk, not individual disease probability.",
          "P(θ > 1.2 | data) would be lower than P(θ > 1 | data), for example."],
      t: ["t4-16"] },

    { n: 30, q: "Area A has posterior mean RR = 1.7 and P(RR > 1 | data) = 0.75; Area B has posterior mean RR = 1.4 and P(RR > 1 | data) = 0.98. Which statements are correct?",
      o: ["Area A has the larger posterior mean RR.",
          "Area B has stronger posterior probability evidence that RR exceeds 1.",
          "The area with the larger posterior mean RR must also have the larger exceedance probability.",
          "The two summaries describe different aspects of the posterior distribution."],
      c: "ABD",
      e: ["1.7 > 1.4.",
          "0.98 > 0.75.",
          "This pair is the counterexample: A has the higher mean but a wider posterior (less data).",
          "The mean is location (magnitude); the exceedance probability reflects location and spread together (evidence)."],
      t: ["t4-17"] },

    { n: 31, q: "Which statements distinguish a posterior draw of the latent relative-risk surface from a posterior predictive draw of future observed counts?",
      o: ["A posterior draw represents uncertainty about latent model quantities conditional on the data.",
          "A posterior predictive draw also includes observation-level variability for a new outcome.",
          "Posterior predictive draws must equal posterior means.",
          "Predictive counts may vary even if the latent risk is held fixed."],
      c: "ABD",
      e: ["A draw of θ from p(θ | data).",
          "Draw θ, then draw Y_new ~ Poisson(Eθ): both sources of uncertainty.",
          "Draws vary around the mean; they are not the mean.",
          "Poisson sampling noise: a fixed θ still gives varying counts."],
      t: ["t4-16"] },

    { n: 32, q: "A Bayesian map shows a 95% credible interval for an area’s RR of (0.92, 1.65). Which statements are correct?",
      o: ["The interval includes RR = 1.",
          "The interval alone does not establish that the posterior probability RR > 1 is at least 0.95.",
          "The interval guarantees the true RR is within the range in repeated samples.",
          "The interval describes uncertainty in RR under the fitted model."],
      c: "ABD",
      e: ["0.92 < 1 < 1.65.",
          "Since 1 is inside the interval, P(RR > 1) is below 0.975, and the interval alone cannot tell whether it is above 0.95. You need the exceedance probability itself.",
          "That is a frequentist coverage statement, not what a credible interval means (and “guarantees” is wrong for either).",
          "Given the model and data, RR lies in the interval with 95% posterior probability."],
      t: ["t4-16"],
      confirm: "B: double negative. The interval does not let you conclude P(RR > 1) ≥ 0.95, so the statement is correct." },

    // ---------- 5. Additional methods ----------
    { n: 33, q: "A researcher evaluates access to primary care across neighborhoods. Which statements are correct?",
      o: ["Distance to the nearest clinic captures one aspect of spatial accessibility.",
          "The number of clinics alone fully measures access for every resident.",
          "Travel time can provide information different from straight-line distance.",
          "Access can also depend on capacity, affordability, and other nongeographic barriers."],
      c: "ACD",
      e: ["A proximity measure: one dimension.",
          "Container counts ignore demand, capacity, distance and edge effects.",
          "Roads, transit and barriers make travel time differ from Euclidean distance.",
          "Access is multidimensional (availability, accessibility, affordability, acceptability, accommodation)."],
      t: ["t6-9", "t6-12", "t6-13"] },

    { n: 34, q: "A dataset contains many correlated neighborhood socioeconomic indicators. Which statements about PCA are correct?",
      o: ["PCA can summarize variation in correlated indicators using fewer components.",
          "Principal components are constructed from combinations of the original variables.",
          "PCA automatically identifies causal determinants of disease.",
          "Interpretation of a component requires examining how variables contribute to it."],
      c: "ABD",
      e: ["Dimension reduction: the first few components capture most of the variance.",
          "Each component is a linear combination (the loadings) of the standardised variables.",
          "PCA is unsupervised and does not even use the outcome.",
          "Read the loadings to name a component (e.g. “socioeconomic disadvantage”)."],
      t: ["t6-16"] },

    { n: 35, q: "A researcher groups neighborhoods using several socioeconomic indicators. Which statements about clustering are correct?",
      o: ["Clustering aims to group observations with similar characteristics.",
          "Cluster assignments can depend on the variables and distance measure selected.",
          "Clusters necessarily correspond to statistically significant disease hotspots.",
          "Clustering and PCA answer different questions."],
      c: "ABD",
      e: ["Minimise within-cluster dissimilarity.",
          "Also on K, scaling and starting values for K-means.",
          "Attribute clusters are profiles of neighbourhood types, not tested disease hotspots (unlike LISA).",
          "PCA reduces variables (columns); clustering groups observations (rows)."],
      t: ["t6-18"] },

    { n: 36, q: "A city introduces a public health policy in selected neighborhoods. Residents frequently cross neighborhood boundaries. Which statements are correct?",
      o: ["Outcomes in untreated neighborhoods could be influenced by nearby treated neighborhoods.",
          "Geographic spillovers can complicate interpretation of treated-versus-untreated comparisons.",
          "Administrative boundaries guarantee that the policy has no effect outside treated areas.",
          "The possibility of spillovers should be considered when defining exposure."],
      c: "ABD",
      e: ["Interference: SUTVA (no interference between units) fails.",
          "Contaminated controls bias the comparison (often toward zero).",
          "People and effects cross boundaries; that is the premise of the question.",
          "E.g. exposure lags (WD) or buffer zones in the design."],
      t: ["t6-22", "t6-27"] },

    { n: 37, q: "An area-level association between green-space access and health varies across regions. Which statements are correct?",
      o: ["The variation may motivate investigation of spatially varying associations.",
          "Different associations across regions automatically establish that green space causes health outcomes.",
          "Differences in measurement, population composition, or contextual factors could contribute to the variation.",
          "A single global coefficient may hide geographic variation in associations."],
      c: "ACD",
      e: ["Spatial heterogeneity in a relationship (e.g. brushing the scatter plot, or GWR).",
          "Varying associations are still associations.",
          "Alternative explanations to a genuinely varying effect.",
          "A global β averages over regions."],
      t: ["t6-5", "t6-7"] },

    // ---------- 6. Integrated public health ----------
    { n: 38, q: "A map shows lower participation in cancer screening in certain neighborhoods. Which statements are justified?",
      o: ["The map can help identify geographic inequalities in participation.",
          "Lower screening participation necessarily means that cancer incidence is higher in those neighborhoods.",
          "Differences in participation may motivate investigation of access and other contextual barriers.",
          "Participation, cancer detection, and subsequent outcomes are distinct measures."],
      c: "ACD",
      e: ["The “identify” step of the describe–associate–intervene logic.",
          "Lower screening can even lower detected incidence in the short run; participation is not incidence.",
          "Access, information, language, trust and so on.",
          "Guest lecture point: separate participation, detection (stage, interval cancers) and outcomes."],
      t: ["t7-1", "t7-3"] },

    { n: 39, q: "A public health team wants to study neighborhood disease patterns and their uncertainty. Which statements about method choice are correct?",
      o: ["Global Moran’s I can summarize overall spatial autocorrelation.",
          "LISA can help explore localized clusters and outliers.",
          "A Bayesian disease mapping model can estimate smoothed relative risks and posterior uncertainty.",
          "A statistically significant LISA cluster alone proves a causal neighborhood effect."],
      c: "ABC",
      e: ["One number for the whole map.",
          "Local view: HH, LL, HL, LH.",
          "Posterior means, credible intervals, exceedance probabilities.",
          "Exploratory pattern, not causal proof."],
      t: ["t2-11", "t2-13", "t4-16"] },

    { n: 40, q: "A researcher reports a high raw SMR in one small neighborhood and a lower posterior mean RR after spatial smoothing. Which statements are correct?",
      o: ["The difference may reflect shrinkage of an unstable raw estimate.",
          "The smoothed estimate is necessarily incorrect because it differs from the SMR.",
          "The posterior distribution can help quantify uncertainty about elevated risk.",
          "Smoothing may trade some local detail for greater stability."],
      c: "ACD",
      e: ["Small E, so a weak likelihood and strong shrinkage toward the neighbours.",
          "The raw SMR is not the truth either; it is the noisier estimate.",
          "E.g. the credible interval and P(RR > 1 | data).",
          "The bias–variance trade-off; smoothing can blur a real sharp boundary."],
      t: ["t4-18", "t4-19"] }
  ];

  var L = ["A", "B", "C", "D"];
  var STORE = "sta530_pexam_v1";

  function load() { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(STORE, JSON.stringify(s)); } catch (e) {} }
  var state = load();
  state.sel = state.sel || {};
  state.mode = state.mode || "practice";
  state.checked = state.checked || {};

  // Assumed penalty rule (the real rule is not published): each correct option ticked +1/k,
  // each incorrect option ticked −1/(4−k), floored at 0 per question. Max 1 point per question.
  function score(q, sel) {
    var k = q.c.length, s = 0;
    sel.forEach(function (l) { s += q.c.indexOf(l) >= 0 ? 1 / k : -1 / (4 - k); });
    return Math.max(0, s);
  }

  function el(tag, cls, html) {
    var x = document.createElement(tag);
    if (cls) x.className = cls;
    if (html != null) x.innerHTML = html;
    return x;
  }

  function topicLink(id) {
    var s = id.split("-")[0].slice(1);
    return '<a href="session' + s + '.html#' + id + '">' + (TOPIC_TITLES[id] || id) + "</a>";
  }

  function render() {
    var root = document.getElementById("pexam");
    if (!root) return;
    root.innerHTML = "";

    var bar = el("div", "pexam-bar");
    bar.appendChild(el("span", "pexam-bar-label", "Mode:"));
    [["practice", "Practice: check each question"], ["exam", "Exam simulation: submit all"]].forEach(function (m) {
      var b = el("button", "pexam-mode" + (state.mode === m[0] ? " active" : ""), m[1]);
      b.onclick = function () { state.mode = m[0]; save(state); render(); };
      bar.appendChild(b);
    });
    var reset = el("button", "pexam-reset", "Clear all answers");
    reset.onclick = function () {
      if (!confirm("Clear all selected answers?")) return;
      state.sel = {}; state.checked = {}; state.submitted = false; save(state); render();
    };
    bar.appendChild(reset);
    root.appendChild(bar);

    var exam = state.mode === "exam";
    var reveal = function (n) { return exam ? !!state.submitted : !!state.checked[n]; };

    if (exam && state.submitted) root.appendChild(summary());

    Q.forEach(function (q) {
      if (SECTIONS[q.n]) root.appendChild(el("h2", "pexam-sec", SECTIONS[q.n]));
      var sel = state.sel[q.n] || [];
      var shown = reveal(q.n);
      var card = el("div", "pexam-card");
      card.id = "pq" + q.n;
      card.appendChild(el("div", "pexam-qn", "Question " + q.n));
      card.appendChild(el("p", "pexam-stem", q.q));

      if (q.table) {
        var t = el("table", "pexam-table");
        q.table.forEach(function (row, i) {
          var tr = el("tr");
          row.forEach(function (c) { tr.appendChild(el(i === 0 ? "th" : "td", null, c)); });
          t.appendChild(tr);
        });
        card.appendChild(t);
      }

      q.o.forEach(function (txt, i) {
        var l = L[i], on = sel.indexOf(l) >= 0, ok = q.c.indexOf(l) >= 0;
        var row = el("label", "pexam-opt");
        if (shown) row.className += ok ? " is-correct" : (on ? " is-wrong" : "");
        var cb = el("input");
        cb.type = "checkbox"; cb.checked = on; cb.disabled = shown;
        cb.onchange = function () {
          var s = (state.sel[q.n] || []).filter(function (x) { return x !== l; });
          if (cb.checked) s.push(l);
          s.sort(); state.sel[q.n] = s; save(state);
        };
        row.appendChild(cb);
        row.appendChild(el("span", "pexam-letter", l + "."));
        row.appendChild(el("span", "pexam-text", txt));
        card.appendChild(row);
        if (shown) {
          card.appendChild(el("div", "pexam-exp" + (ok ? " ok" : " no"),
            "<strong>" + l + ": " + (ok ? "Correct." : "Incorrect.") + "</strong> " + q.e[i]));
        }
      });

      if (shown) {
        var pts = score(q, sel);
        var foot = el("div", "pexam-foot",
          "<strong>Key (unofficial): " + q.c.split("").join(", ") + "</strong> · your answer: " +
          (sel.length ? sel.join(", ") : "none") + " · points: " + pts.toFixed(2) + " / 1" +
          "<br>Review: " + q.t.map(topicLink).join(" · "));
        card.appendChild(foot);
        if (q.confirm) card.appendChild(el("div", "pexam-confirm", "<strong>Confirm at the review (Oct 27):</strong> " + q.confirm));
      }

      if (!exam) {
        var btn = el("button", "pexam-check", shown ? "Try again" : "Check");
        btn.onclick = function () {
          if (shown) { delete state.checked[q.n]; state.sel[q.n] = []; }
          else state.checked[q.n] = true;
          save(state); render();
          document.getElementById("pq" + q.n).scrollIntoView({ block: "nearest" });
        };
        card.appendChild(btn);
      }
      root.appendChild(card);
    });

    if (exam) {
      var sub = el("button", "pexam-submit", state.submitted ? "Start a new attempt" : "Submit all 40 answers");
      sub.onclick = function () {
        if (state.submitted) { state.sel = {}; state.submitted = false; }
        else {
          var blank = Q.filter(function (q) { return !(state.sel[q.n] || []).length; }).length;
          if (blank && !confirm(blank + " question(s) have no options selected. Submit anyway?")) return;
          state.submitted = true;
        }
        save(state); render(); window.scrollTo(0, document.getElementById("pexam").offsetTop - 80);
      };
      root.appendChild(sub);
    }
  }

  function summary() {
    var tot = 0, full = 0, rows = "";
    var secs = Object.keys(SECTIONS).map(Number);
    var bySec = {};
    Q.forEach(function (q) {
      var sel = state.sel[q.n] || [], p = score(q, sel);
      tot += p;
      if (sel.join("") === q.c) full++;
      var s = secs.filter(function (x) { return x <= q.n; }).pop();
      bySec[s] = bySec[s] || [0, 0];
      bySec[s][0] += p; bySec[s][1]++;
    });
    secs.forEach(function (s) {
      rows += "<tr><td>" + SECTIONS[s] + "</td><td>" + bySec[s][0].toFixed(1) + " / " + bySec[s][1] + "</td></tr>";
    });
    return el("div", "pexam-summary",
      "<h3>Result: " + tot.toFixed(1) + " / 40 points (" + Math.round(100 * tot / 40) + "%)</h3>" +
      "<p>" + full + " of 40 questions exactly right. Scored with the assumed penalty rule, against the unofficial key.</p>" +
      "<table class='pexam-table'>" + rows + "</table>");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
