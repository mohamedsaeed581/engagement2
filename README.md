# Mohamed & Rewan — Luxury Engagement Invitation

Premium black & gold engagement invitation built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Swiper.js**.

## Live Demo

- **GitHub Pages:** https://mohamedsaeed581.github.io/engagement/
- **Vercel:** Deploy your own instance (see below)

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | App Router, static export |
| TypeScript | Type safety |
| Tailwind CSS | Luxury styling |
| Framer Motion | Page transitions & UI animations |
| GSAP + ScrollTrigger | Scroll reveal animations |
| Swiper.js | Gallery carousel & lightbox |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
  layout.tsx          # Root layout & fonts
  page.tsx            # Home page
  globals.css         # Global styles
components/
  OpeningScreen.tsx   # Cinematic opening
  HeroSection.tsx     # Couple hero
  CountdownSection.tsx
  ChildhoodSection.tsx
  EventDetailsSection.tsx
  GallerySection.tsx
  LocationSection.tsx
  RSVPSection.tsx
  FooterSection.tsx
  GoldParticles.tsx
  MusicControl.tsx
  InvitationPage.tsx  # Main orchestrator
lib/
  constants.ts        # Event & couple data
  gsheet.ts           # RSVP submission
  gsap.ts             # Scroll animations
  utils.ts
public/
  images/             # Couple photos
  music/              # Background music
```

## RSVP (Google Sheets)

1. Create a Google Sheet with columns: `Timestamp | Name | Attendance | Guests | Message`
2. Go to **Extensions → Apps Script**
3. Paste code from `lib/google-apps-script.js`
4. Deploy as **Web App** (Execute as: Me, Access: Anyone)
5. Copy the URL to `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Deploy to Vercel

1. Push repo to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Framework: **Next.js** (auto-detected)
4. **Build Command:** `npm run build` (do **not** use `build:gh-pages`)
5. **Do not set** `NEXT_PUBLIC_BASE_PATH` on Vercel (that is only for GitHub Pages)
6. Deploy

Your live URL will look like:
`https://engagement-xxxx-mohamedsaeed581s-projects.vercel.app`

> **Note:** `engagement.vercel.app` belongs to a different project. Use the URL shown in your [Vercel dashboard](https://vercel.com/mohamedsaeed581s-projects/engagement).

```bash
npm run build    # Production build (exports to /out)
```

> Vercel runs `next build` automatically. Static export is configured in `next.config.ts`. `vercel.json` enforces the correct build command.

## Deploy to GitHub Pages

```bash
npm run build:gh-pages
```

This builds with `basePath: /engagement` for `username.github.io/engagement/`.

Then push the `out/` folder contents:

### Option A — GitHub Actions (recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build:gh-pages
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Enable **GitHub Pages → Source: GitHub Actions** in repo settings.

### Option B — Manual

```bash
npm run build:gh-pages
# Copy contents of out/ to gh-pages branch or push out/ manually
```

## Customize

Edit `lib/constants.ts` for couple info, date, venue, and gallery images.

Replace photos in `public/images/` and music in `public/music/music.mp3`.

## Performance

- Static export (no server required)
- `next/font` for optimized font loading
- Lazy-loaded maps iframe
- Image optimization via Next.js Image (unoptimized for static export)
- Reduced motion support

Target Lighthouse score: **90+**

## License

Private — Mohamed & Rewan Engagement Invitation
