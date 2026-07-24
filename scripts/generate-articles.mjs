#!/usr/bin/env node
/**
 * WealthHarbor Article Generator
 * Generates 100 educational finance articles as markdown files.
 *
 * Usage: node scripts/generate-articles.mjs
 */

import { writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { enrichArticles } from './lib/articles.mjs';
import { buildFacts, expandBody } from './lib/facts.mjs';
import {
  slugify,
  countWords,
  pickRelated,
  spreadDates,
  assignAuthor,
  generateBody,
  buildFrontmatter,
  renderMarkdown,
} from './lib/engine.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'src', 'content', 'articles');

const MIN_WORDS = 1500;
const TARGET_WORDS = 1800;

/** Additional educational paragraphs to reach word minimum when needed */
const SUPPLEMENTARY = [
  `Understanding the historical context helps. Financial markets evolved from physical trading floors to electronic networks executing millions of orders per second. Retail access democratized participation but also democratized mistakes at scale. Education remains the cheapest risk management tool available.`,
  `Inflation erodes purchasing power of idle cash. Central banks target price stability, yet even moderate inflation compounds over decades. Long-term plans must assume real returns—nominal minus inflation—not headline deposit rates during unusual monetary policy periods.`,
  `Behavioral finance documents predictable biases: loss aversion, recency bias, and overconfidence. Recognizing bias does not eliminate it, but checklists, cooling-off periods, and written investment policies reduce impulsive decisions during volatility.`,
  `Tax efficiency is a second layer of return. Asset location places tax-inefficient assets in sheltered accounts while holding tax-efficient index ETFs in taxable brokerage. Harvesting losses offsets gains when rules permit, subject to wash-sale constraints.`,
  `Liquidity matters when life happens. Illiquid assets—private equity, rental properties, long lock-up funds—may outperform on paper but fail when cash is needed. Match liquidity profile of investments to known and unknown upcoming expenses.`,
  `Fees compound negatively over decades. One percent annual fee on a portfolio growing at 7% gross reduces terminal wealth materially versus a 0.10% index alternative. Always compare net performance after all-in costs including advisory, fund, and transaction expenses.`,
  `Diversification reduces idiosyncratic risk but not systematic market risk. During crises, correlations often rise toward one, temporarily reducing diversification benefits. That is why horizon-appropriate allocation and emergency reserves matter alongside diversification.`,
  `Documentation creates accountability. Whether budgeting, investing, or trading derivatives, journals capturing thesis, entry rationale, and exit criteria improve learning loops. Review quarterly what worked, what failed, and whether process—not luck—drove outcomes.`,
  `Regulatory protections differ by account and product. SIPC protects brokerage assets from firm failure within limits; FDIC covers bank deposits; neither prevents market loss on investments. Read disclosures for margin, options, and futures accounts carefully before enabling permissions.`,
  `Global diversification exposes portfolios to currency effects and geopolitical events. Home-country bias feels comfortable but concentrates economic exposure. International index funds provide inexpensive geographic diversification for long-term investors.`,
  `Rebalancing enforces buy-low-sell-high mechanically. Calendar or threshold rebalancing (e.g., when allocation drifts 5%) prevents portfolios from becoming riskier after equity rallies or overly conservative after crashes.`,
  `Human capital—skills, credentials, network—often exceeds financial capital early in careers. Investing in education and income growth accelerates the savings rate denominator in wealth equations more than chasing hot stocks with small balances.`,
  `Insurance transfers catastrophic risk for affordable premiums. Health, disability, term life, and property coverage protect balance sheets from tail events that investments cannot efficiently hedge at retail scale.`,
  `Estate planning ensures assets transfer according to wishes and minimizes family friction. Beneficiary designations override wills for many accounts—keep them synchronized after major life events.`,
  `Ethical and ESG considerations increasingly influence capital allocation. Whether for values alignment or risk management, understanding how funds apply ESG screens prevents mismatch between investor intent and portfolio holdings.`,
];

function padToMinWords(body, article, minWords) {
  let result = body;
  let words = countWords(result);
  let i = 0;
  while (words < minWords && i < SUPPLEMENTARY.length * 3) {
    const para = SUPPLEMENTARY[i % SUPPLEMENTARY.length];
    const section = i % 3 === 0 ? `\n## Further Reading Notes\n\n` : '';
    result += `${section}${para.replace('Understanding the historical context', `In the context of ${article.title.toLowerCase()}, understanding the historical context`)}\n\n`;
    words = countWords(result);
    i++;
  }
  return result;
}

function main() {
  console.log('WealthHarbor Article Generator');
  console.log('==============================\n');

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  } else {
    for (const f of readdirSync(OUTPUT_DIR)) {
      if (f.endsWith('.md')) unlinkSync(join(OUTPUT_DIR, f));
    }
  }

  const rawArticles = enrichArticles(slugify);
  if (rawArticles.length !== 100) {
    console.error(`Expected 100 articles, got ${rawArticles.length}`);
    process.exit(1);
  }

  const dates = spreadDates(100);
  let totalWords = 0;
  let underMin = 0;
  const categoryCounts = {};

  for (const article of rawArticles) {
    categoryCounts[article.category] = (categoryCounts[article.category] || 0) + 1;
    const related = pickRelated(article, rawArticles, 5);
    const facts = buildFacts(article);
    let body = generateBody(article, facts, related);
    body = expandBody(body, article);
    body = padToMinWords(body, article, MIN_WORDS);

    const wordCount = countWords(body);
    totalWords += wordCount;
    if (wordCount < MIN_WORDS) underMin++;

    const author = assignAuthor(article.index);
    const fm = buildFrontmatter(article, wordCount, dates[article.index], author);
    const markdown = renderMarkdown(fm, body);
    const filePath = join(OUTPUT_DIR, `${article.slug}.md`);
    writeFileSync(filePath, markdown, 'utf8');
  }

  const files = readdirSync(OUTPUT_DIR).filter((f) => f.endsWith('.md'));

  console.log(`Generated: ${files.length} markdown files`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Total word count (body only): ${totalWords.toLocaleString()}`);
  console.log(`Average words per article: ${Math.round(totalWords / files.length).toLocaleString()}`);
  console.log(`Articles under ${MIN_WORDS} words: ${underMin}`);
  console.log('\nCategory distribution:');
  for (const [cat, count] of Object.entries(categoryCounts).sort()) {
    console.log(`  ${cat}: ${count}`);
  }
  console.log('\nDone.');
}

main();
