/**
 * Article metadata — exactly 100 articles across 17 categories.
 */
export const ARTICLES = [
  // personal-finance (7)
  { title: 'Understanding Personal Finance Fundamentals', category: 'personal-finance', tags: ['personal finance', 'money basics', 'financial literacy'], featured: true },
  { title: 'Build Wealth in Your 20s: A Complete Guide', category: 'personal-finance', tags: ['wealth building', '20s', 'young adults'], popular: true },
  { title: 'Managing Money as a Couple', category: 'personal-finance', tags: ['couples', 'joint finances', 'communication'] },
  { title: 'Financial Habits of Highly Effective Savers', category: 'personal-finance', tags: ['habits', 'saving', 'discipline'] },
  { title: 'Net Worth: How to Calculate and Track It', category: 'personal-finance', tags: ['net worth', 'tracking', 'assets'] },
  { title: 'Emergency Fund: Why Every Household Needs One', category: 'personal-finance', tags: ['emergency fund', 'safety net', 'savings'], featured: true, popular: true },
  { title: 'Understanding Your Credit Score and Credit Reports', category: 'personal-finance', tags: ['credit score', 'credit report', 'borrowing'] },
  // budgeting (6)
  { title: 'Zero-Based Budgeting Explained', category: 'budgeting', tags: ['zero-based budget', 'budgeting methods', 'planning'] },
  { title: 'The 50/30/20 Budget Rule', category: 'budgeting', tags: ['50/30/20', 'budget rule', 'spending'] },
  { title: 'Envelope Budgeting for the Digital Age', category: 'budgeting', tags: ['envelope method', 'cashless budgeting', 'categories'] },
  { title: 'How to Create a Monthly Budget That Works', category: 'budgeting', tags: ['monthly budget', 'expenses', 'income'] },
  { title: 'Budgeting with Irregular Income', category: 'budgeting', tags: ['irregular income', 'freelance', 'variable pay'] },
  // saving-money (6)
  { title: 'Frugal Living Without Feeling Deprived', category: 'saving-money', tags: ['frugal living', 'lifestyle', 'saving'] },
  { title: 'How to Cut Monthly Bills and Subscriptions', category: 'saving-money', tags: ['bills', 'subscriptions', 'cutting costs'] },
  { title: 'Smart Grocery Shopping on a Budget', category: 'saving-money', tags: ['groceries', 'food budget', 'shopping'] },
  { title: 'Saving Money on Housing Costs', category: 'saving-money', tags: ['housing', 'rent', 'mortgage savings'] },
  { title: 'The Power of Automatic Savings', category: 'saving-money', tags: ['automation', 'savings rate', 'direct deposit'] },
  { title: 'High-Yield Savings Accounts Explained', category: 'saving-money', tags: ['HYSA', 'savings accounts', 'interest rates'] },
  // investing-basics (8)
  { title: 'What Is Investing? A Beginner\'s Guide', category: 'investing-basics', tags: ['investing', 'beginners', 'getting started'], featured: true, popular: true },
  { title: 'What Is Compound Interest and Why It Matters', category: 'investing-basics', tags: ['compound interest', 'growth', 'time value'], popular: true },
  { title: 'Dollar Cost Averaging Explained', category: 'investing-basics', tags: ['DCA', 'investing strategy', 'consistency'] },
  { title: 'Understanding Investment Risk and Return', category: 'investing-basics', tags: ['risk', 'return', 'trade-offs'] },
  { title: 'Asset Allocation for Beginners', category: 'investing-basics', tags: ['asset allocation', 'diversification', 'portfolio'] },
  { title: 'Stocks vs Bonds: Key Differences', category: 'investing-basics', tags: ['stocks', 'bonds', 'asset classes'] },
  { title: 'How to Start Investing with Little Money', category: 'investing-basics', tags: ['small amounts', 'micro investing', 'beginners'] },
  { title: 'Investment Time Horizon: Why Patience Pays', category: 'investing-basics', tags: ['time horizon', 'long-term', 'patience'] },
  // mutual-funds (6)
  { title: 'How Mutual Funds Work', category: 'mutual-funds', tags: ['mutual funds', 'pooled investing', 'NAV'] },
  { title: 'How SIP Works in Mutual Funds', category: 'mutual-funds', tags: ['SIP', 'systematic investment', 'India'], popular: true },
  { title: 'Active vs Passive Mutual Funds', category: 'mutual-funds', tags: ['active funds', 'passive funds', 'management style'] },
  { title: 'Mutual Fund Expense Ratios Explained', category: 'mutual-funds', tags: ['expense ratio', 'fees', 'costs'] },
  { title: 'Index Funds vs Actively Managed Funds', category: 'mutual-funds', tags: ['index funds', 'active management', 'performance'] },
  { title: 'How to Choose a Mutual Fund', category: 'mutual-funds', tags: ['fund selection', 'due diligence', 'screening'] },
  // etfs (6)
  { title: 'ETF Investing: A Complete Guide', category: 'etfs', tags: ['ETF', 'exchange-traded funds', 'investing'], featured: true },
  { title: 'ETF vs Mutual Fund: Which Is Right for You?', category: 'etfs', tags: ['ETF vs mutual fund', 'comparison', 'vehicles'], popular: true },
  { title: 'How ETFs Are Created and Traded', category: 'etfs', tags: ['ETF creation', 'AP', 'liquidity'] },
  { title: 'Bond ETFs vs Stock ETFs', category: 'etfs', tags: ['bond ETF', 'stock ETF', 'fixed income'] },
  { title: 'Sector ETFs and Thematic Investing', category: 'etfs', tags: ['sector ETF', 'thematic', 'concentration'] },
  { title: 'Tax Efficiency of ETFs', category: 'etfs', tags: ['tax efficiency', 'capital gains', 'ETF structure'] },
  // stock-market (7)
  { title: 'How the Stock Market Works', category: 'stock-market', tags: ['stock market', 'equities', 'market mechanics'] },
  { title: 'Understanding Stock Exchanges and Indices', category: 'stock-market', tags: ['exchanges', 'indices', 'S&P 500'] },
  { title: 'Value Investing: Principles and Practice', category: 'stock-market', tags: ['value investing', 'intrinsic value', 'margin of safety'], popular: true },
  { title: 'Growth Investing: Finding Tomorrow\'s Winners', category: 'stock-market', tags: ['growth investing', 'earnings growth', 'innovation'] },
  { title: 'Dividend Investing for Income', category: 'stock-market', tags: ['dividends', 'income investing', 'yield'] },
  { title: 'Initial Public Offerings (IPOs) Explained', category: 'stock-market', tags: ['IPO', 'public offering', 'listing'] },
  { title: 'Market Orders vs Limit Orders', category: 'stock-market', tags: ['market order', 'limit order', 'execution'] },
  // technical-analysis (6)
  { title: 'Introduction to Technical Analysis', category: 'technical-analysis', tags: ['technical analysis', 'charts', 'price action'] },
  { title: 'Reading Candlestick Charts', category: 'technical-analysis', tags: ['candlesticks', 'chart patterns', 'OHLC'] },
  { title: 'Moving Averages: SMA vs EMA', category: 'technical-analysis', tags: ['moving averages', 'SMA', 'EMA'] },
  { title: 'RSI and Momentum Indicators', category: 'technical-analysis', tags: ['RSI', 'momentum', 'overbought'] },
  { title: 'Support and Resistance Levels', category: 'technical-analysis', tags: ['support', 'resistance', 'levels'] },
  { title: 'Volume Analysis Basics', category: 'technical-analysis', tags: ['volume', 'confirmation', 'liquidity'] },
  // fundamental-analysis (6)
  { title: 'Introduction to Fundamental Analysis', category: 'fundamental-analysis', tags: ['fundamental analysis', 'valuation', 'financials'] },
  { title: 'Reading Income Statements', category: 'fundamental-analysis', tags: ['income statement', 'revenue', 'earnings'] },
  { title: 'Understanding Balance Sheets', category: 'fundamental-analysis', tags: ['balance sheet', 'assets', 'liabilities'] },
  { title: 'Cash Flow Statement Analysis', category: 'fundamental-analysis', tags: ['cash flow', 'FCF', 'operating cash'] },
  { title: 'P/E Ratio and Valuation Metrics', category: 'fundamental-analysis', tags: ['P/E ratio', 'valuation multiples', 'metrics'] },
  { title: 'Discounted Cash Flow (DCF) Valuation', category: 'fundamental-analysis', tags: ['DCF', 'intrinsic value', 'discount rate'] },
  // futures-trading (5)
  { title: 'Futures Contracts Explained', category: 'futures-trading', tags: ['futures', 'derivatives', 'contracts'], featured: true },
  { title: 'How Futures Markets Work', category: 'futures-trading', tags: ['futures markets', 'clearing', 'settlement'] },
  { title: 'Hedging with Futures', category: 'futures-trading', tags: ['hedging', 'risk management', 'producers'] },
  { title: 'Futures Margin and Leverage', category: 'futures-trading', tags: ['margin', 'leverage', 'initial margin'] },
  { title: 'Commodity Futures for Beginners', category: 'futures-trading', tags: ['commodities', 'oil', 'agriculture'] },
  // options-trading (8)
  { title: 'Introduction to Options Trading', category: 'options-trading', tags: ['options', 'derivatives', 'contracts'] },
  { title: 'Calls and Puts Explained', category: 'options-trading', tags: ['calls', 'puts', 'options basics'] },
  { title: 'Options Greeks: A Complete Guide', category: 'options-trading', tags: ['options greeks', 'delta', 'gamma'], popular: true },
  { title: 'Understanding Delta in Options', category: 'options-trading', tags: ['delta', 'hedge ratio', 'directional risk'] },
  { title: 'Gamma: The Rate of Change of Delta', category: 'options-trading', tags: ['gamma', 'convexity', 'delta sensitivity'] },
  { title: 'Theta: Time Decay in Options', category: 'options-trading', tags: ['theta', 'time decay', 'expiration'] },
  { title: 'Options Strategies for Beginners', category: 'options-trading', tags: ['options strategies', 'spreads', 'covered calls'] },
  { title: 'Implied Volatility Explained', category: 'options-trading', tags: ['implied volatility', 'IV', 'option pricing'] },
  // quantitative-finance (7)
  { title: 'CAPM: Capital Asset Pricing Model', category: 'quantitative-finance', tags: ['CAPM', 'beta', 'expected return'], popular: true },
  { title: 'Sharpe Ratio Explained', category: 'quantitative-finance', tags: ['Sharpe ratio', 'risk-adjusted return', 'performance'] },
  { title: 'Risk Management in Portfolio Construction', category: 'quantitative-finance', tags: ['risk management', 'portfolio', 'drawdown'] },
  { title: 'Black-Litterman Model Overview', category: 'quantitative-finance', tags: ['Black-Litterman', 'portfolio optimization', 'views'] },
  { title: 'Modern Portfolio Theory Basics', category: 'quantitative-finance', tags: ['MPT', 'efficient frontier', 'diversification'] },
  { title: 'Value at Risk (VaR) Explained', category: 'quantitative-finance', tags: ['VaR', 'tail risk', 'risk metrics'] },
  { title: 'Beta and Systematic Risk', category: 'quantitative-finance', tags: ['beta', 'systematic risk', 'market sensitivity'] },
  // financial-planning (6)
  { title: 'Financial Planning: Getting Started', category: 'financial-planning', tags: ['financial planning', 'goals', 'roadmap'] },
  { title: 'Setting SMART Financial Goals', category: 'financial-planning', tags: ['SMART goals', 'planning', 'milestones'] },
  { title: 'Financial Independence: The Complete Guide', category: 'financial-planning', tags: ['FIRE', 'financial independence', 'freedom'], featured: true, popular: true },
  { title: 'Estate Planning Basics', category: 'financial-planning', tags: ['estate planning', 'wills', 'beneficiaries'] },
  { title: 'Insurance in Financial Planning', category: 'financial-planning', tags: ['insurance', 'risk transfer', 'protection'] },
  { title: 'Tax-Advantaged Account Strategy', category: 'financial-planning', tags: ['tax-advantaged', '401k', 'IRA'] },
  // retirement-planning (5)
  { title: '401(k) Basics for Employees', category: 'retirement-planning', tags: ['401k', 'employer plan', 'retirement'] },
  { title: 'Traditional IRA vs Roth IRA', category: 'retirement-planning', tags: ['traditional IRA', 'Roth IRA', 'tax treatment'] },
  { title: 'How Much Do You Need to Retire?', category: 'retirement-planning', tags: ['retirement number', 'nest egg', 'planning'] },
  { title: 'Social Security Planning', category: 'retirement-planning', tags: ['social security', 'benefits', 'claiming'] },
  { title: 'Withdrawal Strategies in Retirement', category: 'retirement-planning', tags: ['withdrawals', 'sequence risk', 'income'] },
  // passive-income (5)
  { title: 'Building Passive Income Streams', category: 'passive-income', tags: ['passive income', 'income streams', 'wealth'] },
  { title: 'Dividend Passive Income Strategies', category: 'passive-income', tags: ['dividend income', 'yield', 'diversification'] },
  { title: 'REITs for Passive Real Estate Income', category: 'passive-income', tags: ['REITs', 'real estate', 'income'] },
  // financial-calculators (5)
  { title: 'Using a Compound Interest Calculator', category: 'financial-calculators', tags: ['compound interest calculator', 'projection', 'planning'] },
  { title: 'Mortgage Calculator Guide', category: 'financial-calculators', tags: ['mortgage calculator', 'PITI', 'affordability'] },
  { title: 'Retirement Calculator Planning', category: 'financial-calculators', tags: ['retirement calculator', 'projection', 'savings'] },
  { title: 'Investment Return Calculator Guide', category: 'financial-calculators', tags: ['return calculator', 'CAGR', 'performance'] },
  // finance-careers (5)
  { title: 'Careers in Investment Banking', category: 'finance-careers', tags: ['investment banking', 'careers', 'Wall Street'] },
  { title: 'How to Become a Financial Analyst', category: 'finance-careers', tags: ['financial analyst', 'career path', 'skills'] },
  { title: 'CFA vs CFP: Which Certification?', category: 'finance-careers', tags: ['CFA', 'CFP', 'certifications'] },
  { title: 'Breaking into Quantitative Finance', category: 'finance-careers', tags: ['quant finance', 'careers', 'programming'] },
  { title: 'Skills Every Finance Professional Needs', category: 'finance-careers', tags: ['finance skills', 'career development', 'competencies'] },
];

export function enrichArticles(slugify) {
  return ARTICLES.map((a, i) => {
    const slug = slugify(a.title);
    const description = `Learn ${a.title.toLowerCase()} with clear explanations, practical examples, and actionable steps for smarter financial decisions.`;
    return {
      ...a,
      slug,
      description,
      imageAlt: `Educational illustration about ${a.title}`,
      faqs: buildFaqs(a.title),
      references: buildReferences(a.category),
      index: i,
    };
  });
}

function buildFaqs(title) {
  return [
    { question: `What is the most important thing to know about ${title.toLowerCase()}?`, answer: `Focus on the underlying principles rather than shortcuts. ${title} becomes useful when you connect concepts to your own goals, time horizon, and risk tolerance.` },
    { question: `How long does it take to apply these ideas?`, answer: `You can begin implementing basics within a week, but mastery develops over months as you track outcomes and refine your approach based on real data.` },
    { question: `Do I need professional help?`, answer: `Many concepts can be self-taught for education purposes. Complex tax, legal, or portfolio situations may warrant consultation with licensed professionals.` },
  ];
}

function buildReferences(category) {
  const refs = {
    'investing-basics': [
      { title: 'Investor.gov — Introduction to Investing', url: 'https://www.investor.gov/introduction-investing' },
      { title: 'SEC — Saving and Investing', url: 'https://www.sec.gov/investor/pubs/sec-guide-to-savings-and-investing.pdf' },
    ],
    default: [
      { title: 'CFPB — Consumer Financial Protection', url: 'https://www.consumerfinance.gov/' },
      { title: 'Federal Reserve — Economic Education', url: 'https://www.federalreserve.gov/aboutthefed/educational-tools/default.htm' },
    ],
  };
  return refs[category] || refs.default;
}
