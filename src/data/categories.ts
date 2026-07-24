export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    slug: 'personal-finance',
    name: 'Personal Finance',
    description: 'Core money management skills for everyday financial decisions.',
    icon: 'wallet',
    color: 'brand',
  },
  {
    slug: 'budgeting',
    name: 'Budgeting',
    description: 'Practical frameworks for tracking income, expenses, and savings goals.',
    icon: 'chart-pie',
    color: 'accent',
  },
  {
    slug: 'saving-money',
    name: 'Saving Money',
    description: 'Strategies to reduce expenses and grow your savings faster.',
    icon: 'piggy-bank',
    color: 'brand',
  },
  {
    slug: 'investing-basics',
    name: 'Investing Basics',
    description: 'Foundational concepts every new investor should understand.',
    icon: 'trending-up',
    color: 'accent',
  },
  {
    slug: 'mutual-funds',
    name: 'Mutual Funds',
    description: 'How pooled investment vehicles work, their types, and evaluation methods.',
    icon: 'layers',
    color: 'brand',
  },
  {
    slug: 'etfs',
    name: 'ETFs',
    description: 'Exchange-traded funds explained — structure, costs, and portfolio use.',
    icon: 'bar-chart',
    color: 'accent',
  },
  {
    slug: 'stock-market',
    name: 'Stock Market',
    description: 'How markets function, order types, indices, and equity investing.',
    icon: 'activity',
    color: 'brand',
  },
  {
    slug: 'technical-analysis',
    name: 'Technical Analysis',
    description: 'Chart patterns, indicators, and price-action based market analysis.',
    icon: 'line-chart',
    color: 'accent',
  },
  {
    slug: 'fundamental-analysis',
    name: 'Fundamental Analysis',
    description: 'Evaluating companies through financial statements and valuation metrics.',
    icon: 'file-text',
    color: 'brand',
  },
  {
    slug: 'futures-trading',
    name: 'Futures Trading',
    description: 'Futures contracts, margin, hedging, and speculative applications.',
    icon: 'clock',
    color: 'accent',
  },
  {
    slug: 'options-trading',
    name: 'Options Trading',
    description: 'Calls, puts, Greeks, and options strategies for educational study.',
    icon: 'git-branch',
    color: 'brand',
  },
  {
    slug: 'quantitative-finance',
    name: 'Quantitative Finance',
    description: 'Mathematical models, risk metrics, and algorithmic investing concepts.',
    icon: 'cpu',
    color: 'accent',
  },
  {
    slug: 'financial-planning',
    name: 'Financial Planning',
    description: 'Holistic planning for goals, insurance, taxes, and estate matters.',
    icon: 'compass',
    color: 'brand',
  },
  {
    slug: 'retirement-planning',
    name: 'Retirement Planning',
    description: '401(k), IRA, pension strategies, and retirement income planning.',
    icon: 'sunset',
    color: 'accent',
  },
  {
    slug: 'passive-income',
    name: 'Passive Income',
    description: 'Income streams beyond active employment — dividends, REITs, and more.',
    icon: 'dollar-sign',
    color: 'brand',
  },
  {
    slug: 'financial-calculators',
    name: 'Financial Calculators',
    description: 'Guides for using financial calculators effectively in planning.',
    icon: 'calculator',
    color: 'accent',
  },
  {
    slug: 'finance-careers',
    name: 'Finance Careers',
    description: 'Career paths, certifications, and skills for finance professionals.',
    icon: 'briefcase',
    color: 'brand',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
