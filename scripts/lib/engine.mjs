/**
 * Content expansion engine — turns structured topic facts into 1500–3000 word articles.
 */

const AUTHORS = ['sarah-mitchell', 'james-chen', 'priya-sharma'];
const REVIEWER = 'michael-torres';

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

export function pickRelated(article, allArticles, count = 4) {
  const same = allArticles.filter(
    (a) => a.slug !== article.slug && a.category === article.category
  );
  const other = allArticles.filter(
    (a) => a.slug !== article.slug && a.category !== article.category
  );
  const picked = [...same.slice(0, 2), ...other.slice(0, 2)];
  let i = 0;
  while (picked.length < count && i < allArticles.length) {
    const c = allArticles[i++];
    if (c.slug !== article.slug && !picked.find((p) => p.slug === c.slug)) picked.push(c);
  }
  return picked.slice(0, count);
}

export function spreadDates(count) {
  const start = new Date('2024-01-10');
  const end = new Date('2025-06-20');
  const step = (end - start) / (count - 1);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start.getTime() + step * i);
    return d.toISOString().split('T')[0];
  });
}

export function assignAuthor(index) {
  return AUTHORS[index % AUTHORS.length];
}

export function expandPoint(point, ctx) {
  const { title, category } = ctx;
  if (typeof point === 'string') {
    return `${point} When applied to ${title.toLowerCase()}, this principle helps readers in the ${category.replace(/-/g, ' ')} space make clearer decisions rather than reacting to headlines or social-media tips. Understanding the reasoning behind the rule matters more than memorizing a single number or formula.`;
  }
  return point.text + (point.detail ? ` ${point.detail}` : '');
}

export function buildSection(h2, subsections, ctx) {
  let md = `## ${h2}\n\n`;
  for (const sub of subsections) {
    if (sub.h3) {
      md += `### ${sub.h3}\n\n`;
    }
    for (const para of sub.paragraphs) {
      md += para + '\n\n';
    }
  }
  return md;
}

export function buildDisclaimer() {
  return `## Educational Disclaimer

This article is published by WealthHarbor for **general educational purposes only**. It does not constitute personalized financial, investment, tax, or legal advice. Past performance, historical averages, and hypothetical examples are not guarantees of future results. Every reader's situation differs; consult a qualified professional before making decisions about investments, debt, insurance, or retirement planning. WealthHarbor authors are educators and analysts, not your fiduciaries, unless a separate advisory agreement exists.`;
}

export function buildRelatedReading(related) {
  let md = `## Related Reading\n\n`;
  for (const r of related) {
    md += `- [${r.title}](/articles/${r.slug})\n`;
  }
  md += '\n';
  return md;
}

export function buildTakeaways(bullets) {
  let md = `## Key Takeaways\n\n`;
  for (const b of bullets) {
    md += `- ${b}\n`;
  }
  md += '\n';
  return md;
}

export function generateBody(article, facts, related) {
  const ctx = { title: article.title, category: article.category, slug: article.slug };
  const sections = [];

  sections.push(buildSection('Introduction', [{
    paragraphs: [
      facts.intro,
      `Throughout this guide we explain ${article.title.toLowerCase()} in plain language, with examples, common pitfalls, and practical next steps. Whether you are just starting out or revisiting fundamentals, the goal is the same: build durable understanding you can apply to your own goals—not copy someone else's portfolio or budget verbatim.`,
      `We also link to related WealthHarbor guides so you can explore adjacent topics without losing context. No single article replaces a full financial plan, but strong literacy in ${article.category.replace(/-/g, ' ')} reduces costly mistakes and emotional decision-making.`,
    ],
  }], ctx));

  sections.push(buildSection(facts.coreHeading || 'Core Concepts', facts.coreSections.map((s) => ({
    h3: s.h3,
    paragraphs: s.paragraphs,
  })), ctx));

  sections.push(buildSection(facts.howHeading || 'How It Works in Practice', [{
    h3: facts.howH3 || 'Step-by-Step Framework',
    paragraphs: facts.howParagraphs,
  }], ctx));

  sections.push(buildSection('Real-World Example', [{
    h3: facts.exampleH3 || 'Illustrative Scenario',
    paragraphs: facts.exampleParagraphs,
  }], ctx));

  sections.push(buildSection('Common Mistakes to Avoid', facts.mistakeSections.map((s) => ({
    h3: s.h3,
    paragraphs: s.paragraphs,
  })), ctx));

  sections.push(buildSection(facts.advancedHeading || 'Advanced Considerations', [{
    h3: facts.advancedH3 || 'Going Deeper',
    paragraphs: facts.advancedParagraphs,
  }], ctx));

  if (facts.extraSection) {
    sections.push(buildSection(facts.extraSection.heading, [{
      h3: facts.extraSection.h3,
      paragraphs: facts.extraSection.paragraphs,
    }], ctx));
  }

  sections.push(buildTakeaways(facts.takeaways));
  sections.push(buildRelatedReading(related));
  sections.push(buildDisclaimer());

  return sections.join('\n');
}

export function buildFrontmatter(article, wordCount, date, author) {
  const readingTime = Math.max(8, Math.ceil(wordCount / 200));
  const fm = {
    title: article.title,
    description: article.description,
    category: article.category,
    tags: article.tags,
    author,
    reviewer: REVIEWER,
    publishedAt: date,
    updatedAt: date,
    featured: article.featured ?? false,
    popular: article.popular ?? false,
    readingTime,
    image: `/images/articles/${article.slug}.svg`,
    imageAlt: article.imageAlt || `Illustration for ${article.title}`,
    faqs: article.faqs,
    references: article.references,
  };
  return fm;
}

export function toYaml(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  let out = '';
  for (const [key, val] of Object.entries(obj)) {
    if (val === null || val === undefined) continue;
    if (Array.isArray(val)) {
      out += `${pad}${key}:\n`;
      if (val.length && typeof val[0] === 'object') {
        for (const item of val) {
          out += `${pad}  -\n`;
          for (const [k, v] of Object.entries(item)) {
            out += `${pad}    ${k}: ${yamlScalar(v)}\n`;
          }
        }
      } else {
        for (const item of val) {
          out += `${pad}  - ${yamlScalar(item)}\n`;
        }
      }
    } else if (typeof val === 'object') {
      out += `${pad}${key}:\n${toYaml(val, indent + 1)}`;
    } else {
      out += `${pad}${key}: ${yamlScalar(val)}\n`;
    }
  }
  return out;
}

function yamlScalar(v) {
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  const s = String(v);
  if (s.includes(':') || s.includes('#') || s.includes('\n') || s.startsWith('[')) {
    return `"${s.replace(/"/g, '\\"')}"`;
  }
  return s.includes(' ') || s.includes('&') ? `"${s.replace(/"/g, '\\"')}"` : s;
}

export function renderMarkdown(fm, body) {
  return `---\n${toYaml(fm)}---\n\n${body}`;
}
