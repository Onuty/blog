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
Admin: `http://localhost:4321/admin`

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
cover: /images/example.jpg
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

Comments are rendered at the bottom of each blog post.

## Build

```bash
npm run build
```

The output goes to `dist/` and is ready for Cloudflare Pages.

