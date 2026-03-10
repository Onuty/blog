import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().trim().min(1),
    // Astro treats `slug` as a reserved entry property (`entry.slug`),
    // so frontmatter slug is supported but not part of `data` schema.
    date: z.coerce.date(),
    tags: z
      .array(z.string())
      .default([])
      .transform((items) => items.map((item) => item.trim()).filter((item) => item.length > 0)),
    description: z.string().trim().min(1),
    draft: z.boolean().default(false),
    featured: z.boolean().optional().default(false),
    pinned: z.boolean().optional().default(false),
    cover: z.preprocess(
      (value) => {
        if (typeof value !== "string") return value;
        const trimmed = value.trim();
        if (trimmed.length === 0) return undefined;
        return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
      },
      z.string().optional()
    )
  })
});

export const collections = { blog };
