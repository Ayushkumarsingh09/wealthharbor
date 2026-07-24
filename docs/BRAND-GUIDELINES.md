# WealthHarbor Brand Guidelines

## Brand Overview

**WealthHarbor** is an educational personal finance and investing platform. The brand conveys trust, clarity, and forward momentum — guiding readers safely toward financial literacy like a harbor guides ships.

**Tagline:** Navigate Your Financial Future with Confidence

---

## Logo

### Primary Logo
- File: `public/images/brand/logo.svg`
- Combines the harbor mark (lighthouse + chart line) with wordmark
- "Wealth" in dark slate, "Harbor" in brand blue

### Logo Mark (Icon Only)
- File: `public/favicon.svg` and `public/images/brand/logo-mark.png`
- Use for favicons, app icons, social avatars
- Minimum size: 32×32px digital, 16×16px favicon

### Clear Space
Maintain padding equal to the height of the lighthouse icon on all sides.

### Don'ts
- Do not stretch or distort proportions
- Do not change logo colors outside brand palette
- Do not place on busy backgrounds without contrast overlay
- Do not add effects (shadows, gradients) to the logo

---

## Color System

### Primary — Brand Blue
| Token | Hex | Usage |
|-------|-----|-------|
| brand-50 | #f0f7ff | Light backgrounds, hover states |
| brand-100 | #e0effe | Subtle highlights |
| brand-500 | #0c8ce9 | Interactive elements |
| brand-600 | #006fc7 | Primary buttons, links |
| brand-700 | #0158a1 | Headers, logo accent |
| brand-800 | #064b85 | Dark sections |
| brand-900 | #0b3f6e | Footer, hero gradients |
| brand-950 | #072849 | Deep backgrounds |

### Secondary — Accent Green
| Token | Hex | Usage |
|-------|-----|-------|
| accent-400 | #4ade80 | Chart lines, success states |
| accent-500 | #22c55e | CTA buttons on dark backgrounds |
| accent-600 | #16a34a | Positive indicators |

### Neutral — Surface
| Token | Hex | Usage |
|-------|-----|-------|
| surface-50 | #f8fafc | Page background |
| surface-100 | #f1f5f9 | Section backgrounds |
| surface-200 | #e2e8f0 | Borders, dividers |
| surface-800 | #1e293b | Body text (dark mode) |
| surface-900 | #0f172a | Headings, primary text |

### Accessibility
- All text meets WCAG AA contrast (4.5:1 minimum)
- brand-600 on white: 4.7:1 ✓
- surface-900 on surface-50: 15.8:1 ✓

---

## Typography

### Display Font: Plus Jakarta Sans
- Usage: Headings (h1–h6), hero text, card titles
- Weights: 600 (semibold), 700 (bold), 800 (extrabold)
- Google Fonts: `family=Plus+Jakarta+Sans:wght@600;700;800`

### Body Font: Inter
- Usage: Body text, navigation, buttons, form inputs
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Google Fonts: `family=Inter:wght@400;500;600;700`

### Type Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5–3.75rem | 700 | 1.1 |
| H2 | 1.875–2.25rem | 700 | 1.2 |
| H3 | 1.25–1.5rem | 700 | 1.3 |
| Body | 1rem | 400 | 1.6 |
| Small | 0.875rem | 400 | 1.5 |
| Caption | 0.75rem | 500 | 1.4 |

---

## Imagery

### Article Images
- Format: SVG placeholders with gradient backgrounds
- Aspect ratio: 16:9 (800×450)
- Style: Abstract chart lines on brand gradient

### Author Photos
- Format: SVG with initials on colored circle
- Size: 96×96px, displayed at 48×48 in cards

### OG / Social Sharing
- File: `public/images/og/default.svg`
- Size: 1200×630px
- Dark brand background with logo and tagline

---

## Voice & Tone

- **Educational, not advisory** — "Learn how ETFs work" not "You should buy ETFs"
- **Clear and accessible** — Explain jargon, use plain language
- **Confident but humble** — Cite sources, acknowledge limitations
- **Inclusive** — Address diverse financial situations and experience levels

---

## UI Components

### Buttons
- Primary: `bg-brand-600` white text, rounded-lg
- Secondary: white bg, border, dark text

### Cards
- White background, `border-surface-200`, `shadow-card`
- Hover: `shadow-card-hover`

### Ad Placeholders
- Dashed border, surface-100 background
- Clearly labeled "Advertisement" for AdSense compliance

---

## Favicon & App Icons

| File | Size | Purpose |
|------|------|---------|
| favicon.svg | Scalable | Browser tab |
| logo-mark.png | 512×512 | Apple touch icon, PWA |

---

*WealthHarbor Brand Guidelines v1.0 — © 2024 WealthHarbor*
