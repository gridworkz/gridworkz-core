# gridworkz.com

Marketing site + docs for Gridworkz. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). Docs pages come from the repo-root [`docs/`](../docs) folder and are served at `/docs`.

## Run it

Requires Node 24 (see `.nvmrc`).

```bash
cd website
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

**Deploy:** Netlify picks up `netlify.toml` at the repo root automatically. On Vercel, set the project's Root Directory to `website` (settings in `website/vercel.json`) and Node.js to 24.x.

## Where things live

| Path | What |
|---|---|
| `src/site.ts` | Repo URL, version, contact email (used site-wide), feature flags |
| `src/styles/tokens.css` | Brand colours and fonts |
| `src/pages/` | Home, Technology, Labs, Manifesto, Company |
| `src/components/Architecture.astro` | Clickable block diagram + side panel |
| `src/components/Terminal.astro` | Quickstart terminal + waveform |
| `../docs/` | Docs pages (Markdown) |

## Before launch

- [ ] Confirm or replace every figure marked **TARGET** / **TBC** (Technology page, photonic docs)
- [ ] Real founder bios and photos (`src/pages/company.astro`)
- [ ] Grant datasheet PDF at `public/gridworkz-grant-datasheet.pdf`
- [ ] Confirm grant eligibility wording (NSF / NSERC) on `/labs`
- [ ] Wire the lab request form (Netlify Forms works as-is; on Vercel use Formspree or similar)
- [ ] Enable Plausible (snippet commented in `src/layouts/Base.astro`)
- [ ] Social share image (`og:image`)
- [ ] Turn on `showRepoStats` once the repo is public
- [ ] Replace the "coming soon" terminal output (`src/components/Terminal.astro`) with real simulator output
- [ ] Confirm license choice for RTL (Apache 2.0 vs Solderpad / CERN-OHL)
