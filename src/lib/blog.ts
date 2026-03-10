import { getCollection, type CollectionEntry } from "astro:content";
import { BLOG_SLUG_PATTERN } from "@/lib/validation";

export type BlogPost = CollectionEntry<"blog">;

const byPinnedThenDateDesc = (a: BlogPost, b: BlogPost) => {
  if (a.data.pinned !== b.data.pinned) {
    return Number(b.data.pinned) - Number(a.data.pinned);
  }

  return b.data.date.valueOf() - a.data.date.valueOf();
};

function validatePostSlugs(posts: BlogPost[]) {
  const used = new Set<string>();

  for (const post of posts) {
    if (!BLOG_SLUG_PATTERN.test(post.slug)) {
      throw new Error(
        `Invalid slug "${post.slug}" in src/content/blog/${post.id}. Use lowercase kebab-case (a-z, 0-9, hyphens).`
      );
    }

    if (used.has(post.slug)) {
      throw new Error(
        `Duplicate slug "${post.slug}" detected. Ensure every post has a unique slug in src/content/blog.`
      );
    }

    used.add(post.slug);
  }
}

export async function getSortedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog");
  validatePostSlugs(posts);
  return posts.sort(byPinnedThenDateDesc);
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getSortedBlogPosts();
  return posts.filter((post) => !post.data.draft);
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts();
  return posts.filter((post) => post.data.featured);
}
