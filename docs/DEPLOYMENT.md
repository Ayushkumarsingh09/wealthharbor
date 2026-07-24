# WealthHarbor Deployment Guide

## Prerequisites

- Node.js 20+ installed locally
- Hostinger shared hosting account with a domain
- FTP/SFTP access or Hostinger File Manager

---

## 1. Local Build

```bash
# Install dependencies
npm install

# Generate article images (if not already done)
node scripts/generate-images.mjs

# Build static site
npm run build
```

The output will be in the `dist/` folder — this is what you upload to Hostinger.

---

## 2. Hostinger Deployment

### Option A: File Manager (Recommended for first deploy)

1. Log in to **Hostinger hPanel**
2. Go to **Files → File Manager**
3. Navigate to `public_html/` (or your domain's root folder)
4. Delete default `index.html` if present
5. Upload **all contents** of the `dist/` folder (not the folder itself)
6. Upload `public/.htaccess` to the root (if not already in dist)

### Option B: FTP/SFTP

1. Get FTP credentials from hPanel → **Files → FTP Accounts**
2. Connect with FileZilla or similar
3. Upload `dist/*` to `public_html/`
4. Ensure `.htaccess` is uploaded (enable "Show hidden files")

### Option C: Git Deploy (if available on your plan)

1. Push code to GitHub
2. In hPanel, connect repository
3. Set build command: `npm install && npm run build`
4. Set output directory: `dist`

---

## 3. Domain Setup

1. In hPanel → **Domains**, point your domain to Hostinger nameservers
2. Nameservers: `ns1.dns-parking.com` and `ns2.dns-parking.com` (or Hostinger's assigned NS)
3. Wait 24–48 hours for DNS propagation
4. Enable **Free SSL** in hPanel → **Security → SSL**
5. The `.htaccess` file forces HTTPS automatically

### www vs non-www

The `.htaccess` redirects www to non-www. To reverse this, edit the rewrite rules in `public/.htaccess`.

---

## 4. Environment Configuration

Create a `.env` file locally before building (values are baked in at build time):

```env
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_SITE_NAME=WealthHarbor
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_GTM_ID=GTM-XXXXXXX
PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
NEWSLETTER_PROVIDER=mailchimp
MAILCHIMP_API_KEY=your_key
MAILCHIMP_LIST_ID=your_list_id
MAILCHIMP_SERVER_PREFIX=us21
```

Rebuild after changing environment variables.

---

## 5. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://yourdomain.com`
3. Verify via DNS TXT record (recommended) or HTML file upload
4. Submit sitemap: `https://yourdomain.com/sitemap-index.xml`
5. Request indexing for homepage and key pages

---

## 6. Google Analytics Setup

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Add to `.env` as `PUBLIC_GA_MEASUREMENT_ID`
4. Rebuild and redeploy
5. Verify data in GA4 Realtime report

---

## 7. Google Tag Manager

1. Create container at [tagmanager.google.com](https://tagmanager.google.com)
2. Copy GTM ID (GTM-XXXXXXX)
3. Add to `.env` as `PUBLIC_GTM_ID`
4. In GTM, create tags for GA4, AdSense (after approval)
5. Rebuild and redeploy

---

## 8. Google AdSense Application

### Before Applying

- [ ] Site is live with custom domain and SSL
- [ ] At least 20–30 articles published (you have 100)
- [ ] All legal pages accessible (Privacy, Terms, Disclaimer, etc.)
- [ ] About and Contact pages with real information
- [ ] No placeholder or lorem ipsum content
- [ ] Mobile-responsive design
- [ ] Fast loading (Lighthouse 90+)

### Application Steps

1. Go to [adsense.google.com](https://adsense.google.com)
2. Sign in and click **Get Started**
3. Enter your site URL
4. Connect AdSense to your Google account
5. Add the AdSense verification code to your site (temporarily in `BaseLayout.astro` head)
6. Wait for review (typically 1–4 weeks)

### After Approval

Replace `AdPlaceholder` components with real ad units:

```html
<!-- Example: replace AdPlaceholder with -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

Ad placeholder locations are marked with `data-adsense-slot` attributes:
- `banner` — Header leaderboard (728×90)
- `sidebar` — Sidebar rectangle (300×250)
- `inline` — In-content responsive

---

## 9. Newsletter Integration

### Mailchimp

1. Create audience at mailchimp.com
2. Get API key and List ID from Audience settings
3. Add to `.env` and rebuild
4. Or use Mailchimp embedded form: replace newsletter form action with your Mailchimp form URL

### ConvertKit

1. Create form at convertkit.com
2. Get API key and Form ID
3. Set `NEWSLETTER_PROVIDER=convertkit` in `.env`

---

## 10. Contact Form

For static hosting, use a third-party form service:

### Formspree (Recommended)
1. Create form at formspree.io
2. Set `PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxx`
3. Rebuild

### Web3Forms
1. Get access key at web3forms.com
2. Configure in contact form component

---

## 11. Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] All 100 articles accessible
- [ ] All 16 calculators functional
- [ ] Legal pages accessible from footer
- [ ] Contact form submits successfully
- [ ] Newsletter signup works
- [ ] Search returns results
- [ ] RSS feed at `/rss.xml`
- [ ] Sitemap at `/sitemap-index.xml`
- [ ] SSL certificate active
- [ ] Mobile responsive on phone
- [ ] 404 page displays for bad URLs
- [ ] Google Search Console verified
- [ ] Analytics tracking confirmed

---

## Updating Content

```bash
# Edit articles in src/content/articles/
# Or regenerate: node scripts/generate-articles.mjs

# Rebuild
npm run build

# Re-upload dist/ contents to Hostinger
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 on article pages | Ensure `.htaccess` is uploaded; check `ErrorDocument 404` rule |
| CSS not loading | Verify all `dist/_astro/` files uploaded |
| Slow loading | Enable Hostinger LiteSpeed Cache in hPanel |
| SSL errors | Enable free SSL in hPanel → Security |
| Contact form fails | Check `PUBLIC_CONTACT_ENDPOINT` is set and CORS allows your domain |

---

*WealthHarbor Deployment Guide v1.0*
