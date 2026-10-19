# Victor Burbano — CV & portfolio

Static, bilingual CV and portfolio for **Victor Daniel Burbano Rincón**, Full-Stack Developer
(Java / Spring Boot / Angular / React / PHP / Node) based in Cali, Colombia.

Live site: **https://victorburbano.com/**
Spanish version: **https://victorburbano.com/es/**

## What is in this repository

```text
.
├── index.html                  English CV / portfolio (root, canonical)
├── es/index.html               Spanish CV / portfolio (/es/)
├── 404.html                    GitHub Pages custom 404
├── assets/
│   ├── estilos.css             Shared design system, responsive + print styles
│   ├── profile-*.webp|jpg      Optimized profile photos
│   ├── og-image-en.jpg         Social card (1200×630)
│   ├── og-image-es.jpg         Social card in Spanish (1200×630)
│   ├── favicon.*, icon-*.png   Favicons and PWA icons
│   ├── site.webmanifest        PWA manifest
│   ├── cv-en.pdf               Downloadable CV (English)
│   ├── cv.pdf                  Downloadable CV (Spanish)
│   └── appTesis/               CubeLearn screenshots + Android APK
├── js/app.js                   Progressive enhancements only (scrollspy, lightbox)
├── scripts/build-assets.py     Regenerates photos, social cards, icons and WebP screenshots
├── sitemap.xml                 Language URLs, CV PDFs + hreflang
├── robots.txt                  Crawl rules, AI crawler note + sitemap
├── llms.txt                    Concise LLM-readable profile
├── llms-full.txt               Full plain-text profile for AI assistants
└── CNAME                       victorburbano.com
```

Also included:

- `cv-en.html`, `cv-es.html` — printable CV sources used to generate the PDFs.
- `scripts/serve.py` — local preview server with `charset=utf-8`.
- `scripts/build-assets.py` — image and social-card pipeline.
- `scripts/build-cv.py` — regenerates the CV PDFs from the printable HTML.
- `scripts/check-site.py` — static SEO/HTML sanity checks.
- `scripts/fix-encoding.py` — one-time repair utility for UTF-8 files mangled by PowerShell.

## Local preview

No build step is required for the site itself.

```powershell
python scripts/serve.py
# open http://localhost:8090/
# Spanish: http://localhost:8090/es/
```

Use `scripts/serve.py` instead of `python -m http.server`: it sends `charset=utf-8`, so accents
render correctly in local preview. You can also open `index.html` directly, but a local server gives
more realistic behavior for downloads, the lightbox and `sitemap.xml`.

## Regenerate images

The image pipeline only needs Python and Pillow:

```powershell
python scripts/build-assets.py
```

It creates:

- `profile-400.webp`, `profile-800.webp`, JPEG fallbacks
- `og-image-en.jpg`, `og-image-es.jpg` (1200×630)
- favicons and PWA icons
- WebP versions of the CubeLearn screenshots

Source image: `assets/profileNew.png` (keep the original for future crops).

## Regenerate the CV PDFs

The downloadable CVs are generated from two printable, ATS-friendly HTML pages:

```powershell
python scripts/build-cv.py
```

The script finds Chrome or Edge and writes:

- `assets/cv-en.pdf` from `cv-en.html` (English, 2 pages)
- `assets/cv.pdf` from `cv-es.html` (Spanish, 2 pages)

Edit `cv-en.html` and `cv-es.html` when your experience changes, then run the script and commit
both the HTML sources and the PDFs.

## SEO architecture

The site is intentionally static and crawlable:

- **English at `/`**, **Spanish at `/es/`** — both fully rendered in HTML, no runtime translation.
- Canonical URL on each page and `hreflang` alternates (`en`, `es`, `x-default`).
- Unique `<title>` and meta description per language.
- Open Graph and Twitter cards per language with 1200×630 images.
- JSON-LD: `Person`, `ProfilePage`, `WebSite` and `FAQPage`.
- `sitemap.xml` with both language URLs, the CV PDFs and language alternates.
- `robots.txt` allows crawling and points to the sitemap; it also documents that search and AI crawlers (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended) are welcome.
- `llms.txt` (concise) and `llms-full.txt` (full profile) expose the CV in plain text for AI assistants; both pages link to `llms.txt` with `rel="alternate" type="text/plain"`.
- One `<h1>` per page, descriptive headings, semantic sections and accessible alt text.
- Images use WebP with fallbacks, explicit dimensions, lazy loading and `fetchpriority` for the hero.
- All content works with JavaScript disabled.

### After deployment

1. Submit `https://victorburbano.com/sitemap.xml` in Google Search Console.
2. Request indexing for `/` and `/es/`.
3. Validate structured data with the Rich Results Test.
4. Check the social cards with the LinkedIn Post Inspector and Facebook Sharing Debugger.
5. Validate the AI files at `https://victorburbano.com/llms.txt` and `https://victorburbano.com/llms-full.txt`.
6. Keep the `lastmod` date in `sitemap.xml` current when content changes.

## Updating content

The site has no CMS: edit the HTML directly.

- English site: `index.html`
- Spanish site: `es/index.html`
- English CV: `cv-en.html` (then run `python scripts/build-cv.py`)
- Spanish CV: `cv-es.html` (then run `python scripts/build-cv.py`)
- AI summary: `llms.txt` (concise) and `llms-full.txt` (full profile)

Keep both language versions in sync. Each site page has its own metadata block at the top; do not
copy the English canonical URL into the Spanish page.

If you add a new page, add it to `sitemap.xml` and link it from the navigation.

## Deploy

The repository is published with **GitHub Pages** and the custom domain in `CNAME`.

```powershell
git add .
git commit -m "Improve SEO, portfolio and bilingual CV"
git push origin main
```

GitHub Pages will serve the updated site at `https://victorburbano.com/`.

## Content accuracy note

The portfolio is deliberately explicit about roles:

- **CodeVam** projects are products designed and built by Victor, including **VamCore** (VamStock / VamAsset / VamTrack), CodeVam Fiscal, VamPOS, Vecindad and FruverCopilot.
- **Herpo / GCS / Movi / Qubilo / Q-Extreme** entries describe his specific contribution.
- **GCS Soluciones** is also listed as an ongoing collaboration (2026) for maintenance and module work.
- **Coopcarvajal — Elecciones & Entregax** is presented as maintenance, database support, CI/CD and module work on pre-existing systems — not as original authorship.
- **References** are “available upon request”; third-party phone numbers and emails are not published.

This keeps the CV defensible in interviews and avoids overstating ownership of client codebases.

## Contact

- Email: victordburbano@gmail.com
- LinkedIn: https://www.linkedin.com/in/victor-daniel-burbano-rincon-93b882168
- GitHub: https://github.com/sekeiryuutei
- Studio: https://codevam.dev/
