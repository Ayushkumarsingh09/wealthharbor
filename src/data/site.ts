export const siteConfig = {
  name: 'WealthHarbor',
  tagline: 'Navigate Your Financial Future with Confidence',
  description:
    'WealthHarbor provides free, expert-reviewed educational content on personal finance, investing, budgeting, and wealth building. Learn at your own pace with calculators, guides, and in-depth articles.',
  url: 'https://wealthharbor.com',
  email: 'contact@wealthharbor.com',
  founded: '2024',
  locale: 'en-US',
  // Add social profile URLs here when accounts are created
  social: {} as Record<string, string>,
  newsletter: {
    provider: 'mailchimp' as 'mailchimp' | 'convertkit',
    title: 'Weekly Finance Insights',
    description:
      'Join 25,000+ readers receiving practical money lessons, investing fundamentals, and calculator tips every Tuesday.',
  },
} as const;

export const trustSignals = [
  { label: '100+ Expert Guides', icon: 'book' },
  { label: '16 Free Calculators', icon: 'calculator' },
  { label: 'Fact-Checked Content', icon: 'shield' },
  { label: 'Updated Monthly', icon: 'refresh' },
] as const;

export const learningRoadmap = [
  {
    step: 1,
    title: 'Build Your Foundation',
    description: 'Master budgeting, emergency funds, and debt management before investing.',
    categories: ['personal-finance', 'budgeting', 'saving-money'],
  },
  {
    step: 2,
    title: 'Start Investing',
    description: 'Learn stocks, ETFs, mutual funds, and portfolio diversification basics.',
    categories: ['investing-basics', 'etfs', 'mutual-funds', 'stock-market'],
  },
  {
    step: 3,
    title: 'Advance Your Strategy',
    description: 'Explore technical analysis, options, futures, and quantitative methods.',
    categories: ['technical-analysis', 'options-trading', 'quantitative-finance'],
  },
  {
    step: 4,
    title: 'Plan for the Future',
    description: 'Retirement planning, passive income, and long-term wealth strategies.',
    categories: ['financial-planning', 'retirement-planning', 'passive-income'],
  },
] as const;
