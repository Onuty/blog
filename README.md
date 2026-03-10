# Onuty Blog (Astro + Decap CMS)

Minimal indie developer blog with Astro, Tailwind CSS, TypeScript, MDX, Astro Content Collections, Decap CMS admin, and giscus comments.

## Stack

- Astro (static output)
- Tailwind CSS
- TypeScript
- Markdown/MDX via Content Collections
- Decap CMS (`/admin`)
- giscus comments
- RSS and sitemap

## Local development

```bash
npm install
npm run dev
```

Site: `http://localhost:4321`
Admin: `http://localhost:4321/admin/`

## Content model

Blog posts live in `src/content/blog/*.mdx`.

Frontmatter schema:

```md
---
title: Example Post
slug: example-post
date: 2026-03-09
tags: [astro, blog]
description: Example article
draft: false
featured: false
pinned: false
cover: /uploads/example.jpg
---
```

## Decap CMS setup

The CMS config is in `public/admin/config.yml`.

1. Set the correct repository in `backend.repo`.
2. Configure GitHub OAuth for Decap CMS (`backend: github`) using an OAuth proxy/service.
3. Commit and deploy. Content edits are saved as MDX files in `src/content/blog`.

## giscus setup

1. Install giscus on your GitHub repo and create a discussion category.
2. Copy values into `.env` from `.env.example`:

- `PUBLIC_GISCUS_REPO`
- `PUBLIC_GISCUS_REPO_ID`
- `PUBLIC_GISCUS_CATEGORY`
- `PUBLIC_GISCUS_CATEGORY_ID`
- `PUBLIC_GISCUS_MAPPING`

Comments are rendered only on blog article pages.

## Build

```bash
npm run build
```

Output directory: `dist/`

## Cloudflare Pages Deployment Notes

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20` (recommended)

### Environment variables

Set these in Cloudflare Pages if used:

- `SITE_URL=https://onuty.net` (used for canonical URLs and sitemap site base)
- `PUBLIC_GISCUS_REPO`
- `PUBLIC_GISCUS_REPO_ID`
- `PUBLIC_GISCUS_CATEGORY`
- `PUBLIC_GISCUS_CATEGORY_ID`
- `PUBLIC_GISCUS_MAPPING`
- `PUBLIC_GISCUS_STRICT`
- `PUBLIC_GISCUS_REACTIONS_ENABLED`
- `PUBLIC_GISCUS_EMIT_METADATA`
- `PUBLIC_GISCUS_INPUT_POSITION`
- `PUBLIC_GISCUS_THEME`
- `PUBLIC_GISCUS_LANG`

### Path and admin notes

- Decap admin is served from `/admin/`.
- `public/_redirects` includes `/admin -> /admin/` to avoid config path issues.
- Static assets from `public/` (including `public/admin/*`, `public/uploads/*`) are copied to `dist/` automatically.
