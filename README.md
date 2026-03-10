# Forge Labs Website

Marketing website for [Forge Labs](https://forgelabs.nz) — a Christchurch-based AI and technology consultancy.

**Live:** https://sierrawins.test.forgelabs.nz *(moving to forgelabs.nz)*

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v3** — v4 has a broken arm64 native binary, use v3
- **shadcn/ui** (Radix UI, v3-compatible)
- **Auth.js v5** — Google OAuth, restricted to `@forgelabs.nz` domain
- **Octokit** — git-based CMS via GitHub API
- **react-markdown + remark-gfm** — markdown rendering

## Content Management

Page content lives in `content/home.md` and uses a custom shortcode system:

```
{{hero title="..." subtitle="..." cta="Label|#anchor" image="..." overlay="dark"}}

{{features}}
- title: Feature Name
  description: Description text.
  icon: brain
{{/features}}

{{services}}
- title: Service Name
  description: Description text.
  icon: code
{{/services}}

{{cta title="..." subtitle="..." cta="Label|#contact"}}

{{contact}}
```

The shortcode parser lives in `src/lib/shortcodes.ts`. Content is read server-side and rendered via section components in `src/app/components/sections/`.

## Admin CMS (skeleton)

The `/admin` route is a skeleton — authentication is wired (Auth.js + Google OAuth) but the markdown editor UI is a placeholder. Planned: `@uiw/react-md-editor` for editing `content/home.md` via the GitHub API.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** Requires Node 18+. Uses Tailwind v3 — do not upgrade to v4 (arm64 native build is broken).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

| Variable | Description |
|---|---|
| `AUTH_SECRET` | Random secret for Auth.js session encryption |
| `AUTH_GOOGLE_ID` | Google OAuth client ID (GCP: fl-sparkyn project) |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `GITHUB_TOKEN` | Fine-grained PAT with `contents:write` on this repo |
| `NEXT_PUBLIC_SITE_URL` | Full URL of the site (e.g. `https://forgelabs.nz`) |

## Deployment

Deployed on Vercel via the `forgelabs-web` project, connected to this GitHub repo. Push to `main` triggers a production deployment.

DNS: `forgelabs.nz` → `cname.vercel-dns.com` (Cloudflare proxy **must be OFF** for Vercel SSL to work).

## Contact Form

Uses a Google Apps Script endpoint. The form submits via `FormData` (not JSON) — the Apps Script expects `request.parameter`, not `request.postData.contents`.

## Project Structure

```
src/
  app/
    page.tsx          # Home page — reads content/home.md, renders shortcodes
    layout.tsx        # Root layout
    admin/            # CMS admin (skeleton)
    login/            # Auth.js login page
    api/              # API routes (auth, contact form)
  components/
    sections/         # Hero, Features, Services, CTA, Contact section components
    ui/               # shadcn/ui base components
    layout/           # Header, Footer
  lib/
    shortcodes.ts     # Custom shortcode parser
content/
  home.md             # Page content (edit this to update the site)
```
