import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    // Astro treats `slug` as a reserved entry property (`entry.slug`),
    // so frontmatter slug is supported but not part of `data` schema.
    date: z.coerce.date(),
    tags: z.array(z.string().min(1)).default([]),
    description: z.string().min(1),
    draft: z.boolean().default(false),
    cover: z.string().optional()
  })
});

export const collections = { blog };
