/**
 * Builds unique 1500–3000 word article bodies from structured topic data.
 */

const CATEGORY_INTROS = {
  'personal-finance': (t) => `Personal finance is the foundation of every other money decision you will make. ${t} sits at the intersection of behavior, arithmetic, and long-term planning. Unlike investing headlines that change daily, the principles here compound quietly in the background of your life.`,
  'budgeting': (t) => `A budget is not a punishment—it is a plan that assigns every dollar a job before the month spends it for you. ${t} gives you a repeatable framework so spending aligns with values instead of impulse.`,
  'saving-money': (t) => `Saving money is not about deprivation; it is about redirecting dollars from low-value consumption toward goals that matter. ${t} shows where leaks hide and how small changes aggregate into meaningful balances.`,
  'investing-basics': (t) => `Investing transforms surplus cash into productive assets that can grow faster than inflation over time. ${t} explains the mechanics, risks, and habits beginners need before opening a brokerage account.`,
  'mutual-funds': (t) => `Mutual funds pool money from many investors to buy diversified portfolios managed by professionals or rules-based indexes. ${t} clarifies structure, costs, and how to evaluate funds on your own terms.`,
  'etfs': (t) => `Exchange-traded funds combine diversification with exchange liquidity and often lower costs. ${t} covers how ETFs fit portfolios, trade intraday, and differ from traditional mutual funds.`,
  'stock-market': (t) => `The stock market is a continuous auction where ownership in companies changes hands at prices driven by information, expectations, and liquidity. ${t} demystifies participation for long-term learners.`,
  'technical-analysis': (t) => `Technical analysis studies price, volume, and pattern behavior to infer supply-demand dynamics. ${t} is educational material—not a promise of profits—and should be paired with risk controls.`,
  'fundamental-analysis': (t) => `Fundamental analysis estimates what a business is worth based on economics, financial statements, and competitive position. ${t} teaches the vocabulary analysts use to separate narrative from numbers.`,
  'futures-trading': (t) => `Futures are standardized contracts to buy or sell an asset at a future date at a price agreed today. ${t} explains margin, leverage, and why hedgers and speculators use these markets.`,
  'options-trading': (t) => `Options convey rights—not obligations—to buy or sell underlying assets at specified prices before expiration. ${t} introduces pricing drivers including time, volatility, and the Greeks.`,
  'quantitative-finance': (t) => `Quantitative finance applies statistics and models to measure risk, expected return, and portfolio trade-offs. ${t} connects textbook formulas to decisions institutional investors actually debate.`,
  'financial-planning': (t) => `Financial planning integrates cash flow, insurance, investing, tax, and estate choices into one coherent roadmap. ${t} helps you sequence priorities instead of optimizing one area in isolation.`,
  'retirement-planning': (t) => `Retirement planning asks how today's savings become tomorrow's durable income. ${t} addresses accounts, withdrawal math, and the behavioral shift from accumulation to decumulation.`,
  'passive-income': (t) => `Passive income streams require upfront capital, time, or systems—but can reduce reliance on hourly wages later. ${t} compares realistic yields, risks, and the myth of effortless wealth.`,
  'financial-calculators': (t) => `Financial calculators translate assumptions into projections you can stress-test. ${t} shows which inputs matter most and how to avoid garbage-in-garbage-out planning.`,
  'finance-careers': (t) => `Finance careers span banking, analysis, planning, and quantitative research—each with distinct skill stacks and credential paths. ${t} maps entry routes and what employers actually screen for.`,
};

const SLUG_SEEDS = {
  'what-is-investing-a-beginners-guide': { focus: 'Investing means purchasing assets expected to generate return through price appreciation, income, or both.', metric: '7% average real equity return over long horizons (historical, not guaranteed)', example: 'Maya invests $200/month in a diversified index fund for 30 years' },
  'what-is-compound-interest-and-why-it-matters': { focus: 'Compound interest earns returns on both principal and accumulated interest.', metric: '$10,000 at 8% becomes $46,610 in 20 years without additions', example: 'Two siblings start 10 years apart—the early starter contributes less total but finishes ahead' },
  'how-sip-works-in-mutual-funds': { focus: 'A Systematic Investment Plan (SIP) automates fixed periodic purchases of mutual fund units.', metric: 'Rs 5,000/month SIP at 12% CAGR approximates Rs 50 lakh in 20 years (illustrative)', example: 'Ravi sets SIP date on salary day to avoid skipping months' },
  'etf-investing-a-complete-guide': { focus: 'ETFs track indexes or strategies and trade like stocks with bid-ask spreads.', metric: 'Equity ETF expense ratios often 0.03% to 0.20%', example: 'Portfolio holds total market plus bond ETF for balance' },
  'futures-contracts-explained': { focus: 'Futures obligate parties to transact at expiry unless offset.', metric: 'Crude oil futures control 1,000 barrels per CME contract', example: 'Airline hedges jet fuel costs with oil futures' },
  'options-greeks-a-complete-guide': { focus: 'Greeks measure sensitivity of option price to underlying, time, rates, and vol.', metric: 'Delta ranges 0 to 1 for calls; gamma peaks near at-the-money', example: 'Market maker delta-hedges by trading stock against option inventory' },
  'understanding-delta-in-options': { focus: 'Delta approximates option price change per $1 move in underlying.', metric: 'ATM call often ~0.50 delta; deep ITM approaches 1', example: 'Long 10 calls at 0.40 delta equals roughly 400 shares exposure' },
  'gamma-the-rate-of-change-of-delta': { focus: 'Gamma measures how delta changes as price moves.', metric: 'Short options have negative gamma—delta moves against you in trends', example: 'Straddle seller faces rising delta magnitude as stock rallies' },
  'theta-time-decay-in-options': { focus: 'Theta is daily time decay—options lose value as expiration nears.', metric: 'Extrinsic value collapses fastest in final weeks', example: 'Weekly options trader fights accelerating theta' },
  'capm-capital-asset-pricing-model': { focus: 'CAPM links expected return to beta and market premium: E(R)=Rf+beta(Rm-Rf).', metric: 'Beta 1.2 stock demands higher expected return than market', example: 'Analyst uses CAPM cost of equity in DCF' },
  'sharpe-ratio-explained': { focus: 'Sharpe = (Return - Risk-free) / Standard deviation—return per unit of total risk.', metric: 'Sharpe above 1 historically strong; below 0.5 weak risk-adjusted', example: 'Fund A beats Fund B on return but loses on Sharpe' },
  'risk-management-in-portfolio-construction': { focus: 'Risk management sizes positions, diversifies, and plans drawdown response.', metric: '20% drawdown requires 25% gain to recover; 50% needs 100%', example: 'Investor caps single stock at 5% of portfolio' },
  'black-litterman-model-overview': { focus: 'Black-Litterman blends market equilibrium returns with investor views.', metric: 'Reduces extreme weights from raw mean-variance optimization', example: 'PM tilts toward tech but keeps diversification vs pure view' },
  'build-wealth-in-your-20s-a-complete-guide': { focus: 'Your 20s maximize compounding runway and human capital growth.', metric: 'Saving $300/month from 22 vs 32 can double terminal wealth', example: 'Jordan prioritizes employer match, HYSA emergency fund, then Roth IRA' },
  'emergency-fund-why-every-household-needs-one': { focus: 'Emergency funds cover job loss, medical bills, and urgent repairs without debt.', metric: '3-6 months essential expenses in liquid savings', example: 'Couple with $4k/month needs keeps $15k in HYSA' },
  'financial-independence-the-complete-guide': { focus: 'Financial independence means assets cover living costs without mandatory work.', metric: '25x annual expenses approximates 4% rule starting point (debated)', example: 'Household spending $60k targets $1.5M invested portfolio' },
  'etf-vs-mutual-fund-which-is-right-for-you': { focus: 'ETFs trade intraday; mutual funds price once daily at NAV.', metric: 'Tax-aware investors often favor ETF structure in taxable accounts', example: '401(k) uses mutual funds; taxable account uses ETFs' },
  'dollar-cost-averaging-explained': { focus: 'DCA invests fixed amounts on schedule regardless of price.', metric: 'Reduces timing regret; may underperform lump sum statistically', example: 'Biweekly 401(k) contributions exemplify DCA' },
  'value-investing-principles-and-practice': { focus: 'Value investors seek securities trading below conservative intrinsic value.', metric: 'Margin of safety buffers estimation error', example: 'Investor buys stock at 0.7x estimated fair value' },
  'growth-investing-finding-tomorrows-winners': { focus: 'Growth investing prioritizes revenue/earnings expansion over current multiples.', metric: 'High P/E acceptable if growth sustains and reinvestment returns stay high', example: 'SaaS company reinvests 40% revenue into R&D' },
};

function getSeed(slug) {
  return SLUG_SEEDS[slug] || {
    focus: `This topic addresses practical aspects of the subject with emphasis on clarity and responsible decision-making.`,
    metric: 'Individual results vary widely based on timing, fees, taxes, and behavior',
    example: 'Consider a household applying these principles over a five-year horizon',
  };
}

function coreSections(article, seed) {
  const cat = article.category.replace(/-/g, ' ');
  return [
    { h3: 'Definitions and Scope', paragraphs: [
      `${seed.focus} In the context of ${article.title.toLowerCase()}, scope includes what the concept covers, what it excludes, and how it interacts with adjacent topics like taxes, inflation, and behavioral bias.`,
      `Regulators and educators emphasize disclosure and suitability because retail participants often underestimate complexity—especially in derivatives and leveraged products. Treat every formula as a simplified map, not the territory.`,
    ]},
    { h3: 'Why It Matters Now', paragraphs: [
      `Interest rates, inflation, and employment cycles change the relative attractiveness of strategies within ${cat}. What worked in a zero-rate decade may underperform when cash yields 4% or more. Revisit assumptions annually.`,
      `Digital platforms lowered barriers to entry, which helps access but increases overtrading risk. Education reduces churn: investors who understand ${article.title.toLowerCase()} are less likely to panic-sell at cycle lows.`,
    ]},
    { h3: 'Key Metrics and Benchmarks', paragraphs: [
      `A useful benchmark: ${seed.metric}. Compare any product, advisor, or strategy against appropriate passive alternatives and your personal required return—not neighbor anecdotes.`,
      `Track net-of-fee, after-tax outcomes. Gross returns mislead when expense ratios, spreads, and short-term capital gains taxes erode compounding. Document assumptions in writing before acting.`,
    ]},
  ];
}

function howParagraphs(article, seed) {
  return [
    `**Step 1 — Clarify the goal.** Write what success looks like in dollars and dates. For ${article.title.toLowerCase()}, tie the goal to a life event: retirement, home purchase, debt freedom, or skill certification.`,
    `**Step 2 — Gather baseline data.** Collect account balances, pay stubs, statements, or market data relevant to the topic. Incomplete data produces confident but wrong conclusions.`,
    `**Step 3 — Apply the framework.** Map inputs to the method described in this guide—allocation percentages, Greek exposures, budget categories, or valuation multiples. Use conservative assumptions first.`,
    `**Step 4 — Stress-test.** Model adverse scenarios: job loss, 30% market drop, rate hikes, or lower-than-expected business growth. Resilience matters more than optimizing the happy path.`,
    `**Step 5 — Automate and review.** Automate savings, bill pay, or rebalancing where possible. Schedule quarterly reviews to update ${seed.example} with actual numbers instead of projections.`,
  ];
}

function exampleParagraphs(article, seed) {
  return [
    `**Scenario:** ${seed.example}. They start with modest resources but consistent process discipline.`,
    `In year one they prioritize learning and small experiments over large bets. Fees stay below 0.50% where applicable; high-interest debt is addressed before speculative trades.`,
    `By year three, measurable progress appears: higher savings rate, clearer tracking, or improved risk-adjusted portfolio metrics. Setbacks—a market correction or unexpected expense—test the plan without abandoning it.`,
    `The lesson: process beats prediction. ${article.title} rewards repetition, documentation, and humility about unknowns.`,
  ];
}

function mistakeSections(article) {
  return [
    { h3: 'Chasing Shortcuts', paragraphs: [
      `Social media amplifies outliers—lottery winners in options, meme stocks, or guaranteed yield schemes. Most wealth builds through boring compounding, adequate savings rates, and low costs.`,
      `If ${article.title.toLowerCase()} promises effortless results, scrutinize incentives. Sellers may profit from volume and education products regardless of your outcomes.`,
    ]},
    { h3: 'Ignoring Taxes and Fees', paragraphs: [
      `A strategy that wins pre-tax may lose post-tax. Account type (taxable, IRA, Roth) changes optimal holding periods and asset location.`,
      `Expense ratios, advisory AUM fees, bid-ask spreads, and platform commissions compound negatively just as returns compound positively. Always calculate net figures.`,
    ]},
    { h3: 'Neglecting Personal Context', paragraphs: [
      `Copying an influencer portfolio ignores different time horizons, income stability, and risk capacity. A 25-year-old and a 58-year-old should not mirror identical allocations.`,
      `Revisit ${article.category.replace(/-/g, ' ')} decisions after major life events: marriage, children, relocation, or health changes.`,
    ]},
  ];
}

function advancedParagraphs(article, seed, category) {
  const extras = {
    'options-trading': `Portfolio margin, volatility skew, and assignment risk in American options add layers beyond introductory Greeks. Vol surfaces change around earnings and macro events—static models lag reality.`,
    'quantitative-finance': `Factor models (Fama-French), regime switching, and copulas address CAPM limitations. Backtests suffer from overfitting; out-of-sample validation and transaction costs separate research from marketing.`,
    'futures-trading': `Contango and backwardation in commodity curves affect roll yield of ETFs holding futures. Basis risk means hedges are rarely perfect.`,
    'fundamental-analysis': `Quality of earnings matters: non-recurring items, stock-based compensation, and channel stuffing distort headlines. Read footnotes and cash flow, not just EPS beats.`,
    'technical-analysis': `Multiple testing and data mining inflate backtested indicator success. Combine price action with liquidity events and macro catalysts; never size trades on a single indicator.`,
  };
  return [
    extras[category] || `Advanced practitioners integrate ${article.title.toLowerCase()} with scenario analysis, Monte Carlo simulation, and governance policies for committees or families.`,
    `Institutional investors document investment policy statements (IPS) specifying rebalancing bands, leverage limits, and prohibited securities. Retail investors benefit from mini-IPS—even one page.`,
    `${seed.metric} should be re-estimated when structural regimes shift. The 2010s tech dominance, 2022 rate shock, and AI capex boom each changed factor premiums and correlation matrices.`,
  ];
}

function extraSection(article, category) {
  const map = {
    'investing-basics': { heading: 'Connecting Concepts to Portfolio Design', h3: 'From Theory to Allocation', paragraphs: [
      `Beginners often ask what to buy before defining why they invest. Time horizon and risk tolerance drive stock/bond mix. Short goals (under 3 years) belong in cash or short-duration bonds, not volatile equities.`,
      `Use one total-market equity fund plus one aggregate bond fund before adding sector bets. Complexity without edge increases mistakes.`,
    ]},
    'options-trading': { heading: 'Risk Controls for Options Learners', h3: 'Position Sizing and Assignment', paragraphs: [
      `Cap options exposure to a small fraction of portfolio until you have closed full cycles including losers. Naked short options carry theoretically unlimited risk.`,
      `Understand early assignment on American calls when deep ITM before ex-dividend dates. Cash-settled index options differ from equity options.`,
    ]},
    'quantitative-finance': { heading: 'Model Limitations', h3: 'When Formulas Break', paragraphs: [
      `CAPM assumes single-period, mean-variance investors and frictionless markets. Real markets exhibit fat tails, liquidity crises, and behavioral cascades.`,
      `Use models as bounds and sanity checks, not oracle outputs. Stress correlations toward 1.0 in crisis scenarios when estimating portfolio risk.`,
    ]},
    'budgeting': { heading: 'Budgeting Tools and Rituals', h3: 'Weekly Money Meetings', paragraphs: [
      `Fifteen-minute weekly reviews beat annual resolutions. Compare actual vs planned categories; adjust next week instead of abandoning the system.`,
      `Apps like YNAB, Monarch, or spreadsheets all work—the best tool is one you open consistently.`,
    ]},
  };
  return map[category] || null;
}

function takeaways(article, seed) {
  return [
    `${seed.focus.split('.')[0]}.`,
    `Use ${seed.metric} as a sanity check, not a promise.`,
    `Process—automation, reviews, written goals—outperforms prediction.`,
    `Taxes and fees materially change net outcomes; calculate accordingly.`,
    `Consult professionals for personalized advice beyond education.`,
  ];
}

export function buildFacts(article) {
  const seed = getSeed(article.slug);
  const introFn = CATEGORY_INTROS[article.category] || CATEGORY_INTROS['personal-finance'];
  return {
    intro: introFn(article.title),
    coreHeading: 'Core Concepts You Need to Understand',
    coreSections: coreSections(article, seed),
    howHeading: 'How to Apply This Framework',
    howH3: 'Five-Step Implementation',
    howParagraphs: howParagraphs(article, seed),
    exampleH3: 'Worked Example',
    exampleParagraphs: exampleParagraphs(article, seed),
    mistakeSections: mistakeSections(article),
    advancedHeading: 'Advanced Topics and Institutional Context',
    advancedH3: 'Beyond the Basics',
    advancedParagraphs: advancedParagraphs(article, seed, article.category),
    extraSection: extraSection(article, article.category),
    takeaways: takeaways(article, seed),
  };
}

const DEEP_DIVES = {
  'personal-finance': [
    `Cash-flow positive households still fail financially when insurance gaps, co-signed loans, or undocumented partners create hidden liabilities. Annual net-worth statements surface these risks.`,
    `Behavioral research shows mental accounting helps if deliberate: label accounts for emergencies, travel, and investing rather than one undifferentiated pile that feels spendable.`,
    `Credit utilization below 30% on revolving lines supports scores, but paying in full avoids interest entirely—utilization is not an excuse to carry balances.`,
  ],
  'budgeting': [
    `Sinking funds smooth irregular expenses—annual insurance premiums, holiday gifts, car registration—by monthly accrual instead of credit-card spikes.`,
    `Zero-based budgeting forces trade-offs visible: raising dining out requires cutting elsewhere, preventing silent overspend in aggregate.`,
    `Income volatility workers should budget from baseline monthly minimum, allocating surplus in good months to buffer and goals.`,
  ],
  'saving-money': [
    `Price matching and annual subscription audits recover hundreds yearly. Set calendar reminders before free trials convert.`,
    `Energy-efficient upgrades and insurance bundling reviews reduce housing cost drift without moving.`,
    `Generic brands in commodities preserve quality where brand premium adds little value.`,
  ],
  'investing-basics': [
    `Sequence-of-returns risk hurts most near retirement or large purchases; reduce equity exposure as goal date approaches using glide paths.`,
    `Rebalancing sells winners and buys laggards—psychologically hard but mechanically sound for maintaining risk targets.`,
    `International diversification reduces home-country bias; currency adds volatility but improves long-term diversification benefits.`,
  ],
  'mutual-funds': [
    `Turnover in active funds generates taxable distributions in brokerage accounts—check turnover ratio and distribution history.`,
    `SIP rupee-cost averaging in India aligns with salary cycles; US investors mirror via 401(k) or automatic brokerage transfers.`,
    `Compare funds using same category benchmarks; large-cap value vs small-cap growth comparisons mislead.`,
  ],
  'etfs': [
    `Premium/discount to NAV occurs when ETF price diverges from intraday NAV—arbitrage usually closes gaps but flash events happen.`,
    `Synthetic vs physical replication matters for commodities and esoteric indexes—read prospectus replication method.`,
    `Securities lending income offsets expenses in some ETFs—net cost can beat headline expense ratio.`,
  ],
  'stock-market': [
    `Market makers provide liquidity; spreads widen in fast markets—limit orders protect execution price but may not fill.`,
    `Dividend capture strategies rarely work after taxes and price adjustment on ex-dates.`,
    `Index inclusion/exclusion events move prices temporarily; long-term investors need not trade these flows.`,
  ],
  'technical-analysis': [
    `Higher timeframes filter noise—daily trends may contradict hourly signals; define primary timeframe before indicators.`,
    `Backtested patterns fail forward when crowded; edge decays as participation increases.`,
    `Volume confirmation separates breakouts from head-fakes—low-volume breakouts mean revert often.`,
  ],
  'fundamental-analysis': [
    `Working capital changes distort earnings—rising receivables can inflate revenue quality concerns.`,
    `Adjusted EBITDA adds back stock comp but it is a real economic cost to shareholders—treat skeptically.`,
    `Comparables analysis requires truly comparable growth, margin, and leverage profiles—peer selection biases results.`,
  ],
  'futures-trading': [
    `Mark-to-market daily moves cash between accounts—understand variation margin calls before position sizing.`,
    `Roll strategies in passive commodity exposure affect long-term returns via contango drag.`,
    `Micro contracts democratize access but leverage still magnifies losses proportionally.`,
  ],
  'options-trading': [
    `IV rank vs IV percentile differs—know your platform definition before selling premium.`,
    `Earnings announcements crush extrinsic value post-event—straddles face IV crush even if direction guessed correctly.`,
    `Portfolio margin reduces capital for hedged books but increases tail complexity for retail traders.`,
  ],
  'quantitative-finance': [
    `Sharpe ratios are not comparable across frequencies—annualize consistently when ranking strategies.`,
    `VaR ignores magnitude beyond threshold—Expected Shortfall (CVaR) complements tail analysis.`,
    `Black-Litterman tau parameter controls confidence in views—small tau anchors closer to equilibrium.`,
  ],
  'financial-planning': [
    `Estate documents need beneficiary alignment with account TOD/POD designations.`,
    `Umbrella liability insurance cheaply extends protection once auto/home limits exhausted.`,
    `Roth conversions fill lower tax brackets in gap years between retirement and Social Security.`,
  ],
  'retirement-planning': [
    `Healthcare before Medicare remains largest wildcard—model HSA accumulation and COBRA gaps.`,
    `Social Security claiming at 70 maximizes monthly benefit but breakeven age often mid-80s.`,
    `RMD rules force taxable withdrawals—plan asset location to minimize bracket spikes.`,
  ],
  'passive-income': [
    `Dividend cuts happen in recessions—diversify across sectors and geographies; avoid yield traps.`,
    `REITs correlate with rates—rising rates pressure valuations even when occupancy stable.`,
    `Digital products require marketing maintenance—passive still needs periodic updates and support.`,
  ],
  'financial-calculators': [
    `Sensitivity tables beat single outputs—vary return plus or minus 2% and inflation plus or minus 1%.`,
    `Mortgage calculators ignoring PMI, HOA, and maintenance understate housing cost 15-30%.`,
    `Retirement calculators assuming constant returns miss sequence risk—run Monte Carlo when available.`,
  ],
  'finance-careers': [
    `Investment banking hours remain intense—evaluate lifestyle fit honestly.`,
    `CFA depth complements equity research; CFP fits planning roles—credentials signal commitment, not guarantee.`,
    `Quant hiring emphasizes Python, statistics, and market microstructure projects in portfolios.`,
  ],
  default: [
    `Document decisions in an investment journal—entries improve feedback loops and reduce hindsight bias.`,
    `Align financial choices with values to sustain discipline when markets stress emotions.`,
    `Regulatory landscapes evolve—subscribe to official investor education sources for updates.`,
  ],
};

const SLUG_DEEP = {
  'what-is-investing-a-beginners-guide': [
    `### What Investing Is Not\n\nInvesting is not gambling on short-term price moves, not timing the market based on headlines, and not concentrating in employer stock without limits.`,
    `### First Accounts to Consider\n\nEmployer retirement plans with match, Roth or traditional IRA, and taxable brokerage for goals beyond retirement.`,
  ],
  'what-is-compound-interest-and-why-it-matters': [
    `### The Rule of 72\n\nDivide 72 by annual rate to estimate years to double: at 8%, money doubles in about 9 years.`,
    `### Negative Compounding\n\nCredit card APRs compound against you—18% debt outpaces most investment returns.`,
  ],
  'how-sip-works-in-mutual-funds': [
    `### SIP vs Lump Sum\n\nLump sum wins more often statistically, but SIP reduces behavioral regret and fits salaried cash flow.`,
    `### Step-Up SIP\n\nIncreasing SIP amount 5-10% annually aligns contributions with raises.`,
  ],
  'options-greeks-a-complete-guide': [
    `### The Primary Greeks\n\nDelta, Gamma, Theta, Vega, and Rho each measure a different risk dimension of option positions.`,
    `### Managing Greek Exposure\n\nSpreads offset vega and theta compared to naked long options.`,
  ],
  'capm-capital-asset-pricing-model': [
    `### Security Market Line\n\nPlots expected return vs beta. Stocks above SML may offer alpha—or hidden risk CAPM misses.`,
    `### Using CAPM in Practice\n\nAnalysts estimate beta from regression, choose equity risk premium, and add risk-free rate.`,
  ],
  'black-litterman-model-overview': [
    `### Equilibrium Starting Point\n\nReverse-optimize market-cap weights implied returns before blending investor views.`,
    `### View Example\n\nA modest tech outperformance view tilts allocation without extreme corner solutions.`,
  ],
  'financial-independence-the-complete-guide': [
    `### FIRE Variants\n\nLean FIRE, Fat FIRE, and Barista FIRE each trade spending level against timeline and work flexibility.`,
    `### Safe Withdrawal Nuances\n\nThe 4% rule originated from US historical data—flexible spending rules are alternatives.`,
  ],
  'etf-vs-mutual-fund-which-is-right-for-you': [
    `### Trading and Minimums\n\nETFs have no minimum beyond share price; mutual funds often have fund minimums.`,
    `### Tax Efficiency\n\nETF in-kind redemption reduces capital gains distributions in taxable accounts.`,
  ],
  'dollar-cost-averaging-explained': [
    `### Behavioral Advantage\n\nDCA automates discipline during volatility without requiring perfect timing courage.`,
    `### When Lump Sum Wins\n\nLong idle cash while waiting to DCA sacrifices expected return.`,
  ],
  'value-investing-principles-and-practice': [
    `### Margin of Safety\n\nBuy below intrinsic value estimate to absorb errors in analysis.`,
    `### Value Cycles\n\nValue can underperform growth for years before mean reversion.`,
  ],
  'growth-investing-finding-tomorrows-winners': [
    `### Reinvestment Runway\n\nEvaluate TAM, unit economics, and whether reinvested capital earns high returns.`,
    `### Drawdown Tolerance\n\nGrowth stocks de-rate sharply when rates rise or growth disappoints.`,
  ],
};

export function expandBody(body, article) {
  const deepDives = DEEP_DIVES[article.category] || DEEP_DIVES.default;
  const slugBits = SLUG_DEEP[article.slug] || [];
  const insertBefore = '## Key Takeaways';
  const idx = body.indexOf(insertBefore);
  const extra = `\n## Deep Dive: Practical Nuances\n\n${deepDives.map((p, i) => `### Consideration ${i + 1}\n\n${p}`).join('\n\n')}\n\n${slugBits.length ? `## Topic-Specific Insights\n\n${slugBits.join('\n\n')}\n\n` : ''}`;
  if (idx === -1) return body + extra;
  return body.slice(0, idx) + extra + body.slice(idx);
}
