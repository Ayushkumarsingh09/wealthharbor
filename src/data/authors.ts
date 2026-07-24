export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  credentials: string[];
  experience: string;
  expertise: string[];
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    email: string;
  };
}

export const authors: Author[] = [
  {
    slug: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Founder & Chief Editor',
    bio: 'Sarah Mitchell founded WealthHarbor with a mission to make financial education accessible to everyone. With over 15 years in financial journalism and a background in economics from the University of Chicago, she leads our editorial team in producing accurate, unbiased educational content. Sarah previously served as a senior editor at a major financial publication and holds the Certified Financial Education Instructor (CFEI) designation.',
    shortBio: 'Founder with 15+ years in financial journalism and economics education.',
    credentials: ['CFEI', 'B.A. Economics, University of Chicago', 'Former Senior Financial Editor'],
    experience: '15+ years',
    expertise: ['Personal Finance', 'Editorial Standards', 'Financial Literacy'],
    image: '/images/authors/sarah-mitchell.svg',
    social: {
      email: 'sarah@wealthharbor.com',
    },
  },
  {
    slug: 'james-chen',
    name: 'James Chen',
    role: 'Senior Finance Editor',
    bio: 'James Chen brings deep expertise in personal finance and consumer banking to WealthHarbor. He spent 12 years as a financial planner before transitioning to financial education writing. James holds an MBA from NYU Stern and the Certified Financial Planner (CFP) certification. He specializes in making complex financial topics understandable for everyday readers.',
    shortBio: 'CFP-certified editor with 12 years of financial planning experience.',
    credentials: ['CFP', 'MBA, NYU Stern', 'Former Financial Planner'],
    experience: '12+ years',
    expertise: ['Budgeting', 'Debt Management', 'Financial Planning'],
    image: '/images/authors/james-chen.svg',
    social: {
      email: 'james@wealthharbor.com',
    },
  },
  {
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Investment Analyst',
    bio: 'Priya Sharma is WealthHarbor\'s lead investment analyst, covering equities, ETFs, mutual funds, and derivatives. She earned her CFA charter in 2018 and holds a Master\'s in Quantitative Finance from Columbia University. Before joining WealthHarbor, Priya worked as an equity research associate at a global asset management firm, analyzing technology and healthcare sectors.',
    shortBio: 'CFA charterholder specializing in equities, ETFs, and derivatives education.',
    credentials: ['CFA Charterholder', 'M.S. Quantitative Finance, Columbia', 'Former Equity Research Associate'],
    experience: '10+ years',
    expertise: ['Stock Analysis', 'ETFs', 'Options Trading', 'Quantitative Finance'],
    image: '/images/authors/priya-sharma.svg',
    social: {
      email: 'priya@wealthharbor.com',
    },
  },
  {
    slug: 'michael-torres',
    name: 'Michael Torres',
    role: 'Content Reviewer & Fact-Checker',
    bio: 'Michael Torres ensures every WealthHarbor article meets our rigorous accuracy standards. With a background in accounting (CPA) and financial regulation compliance, he reviews content for factual accuracy, proper sourcing, and regulatory compliance. Michael spent 8 years in audit and compliance roles at Big Four accounting firms before joining our editorial team.',
    shortBio: 'CPA and compliance specialist ensuring factual accuracy across all content.',
    credentials: ['CPA', 'B.S. Accounting, UT Austin', 'Former Big Four Auditor'],
    experience: '8+ years',
    expertise: ['Fact-Checking', 'Compliance', 'Tax Basics', 'Regulatory Standards'],
    image: '/images/authors/michael-torres.svg',
    social: {
      email: 'michael@wealthharbor.com',
    },
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
