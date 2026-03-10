import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

const byDateDesc = (a: BlogPost, b: BlogPost) => b.data.date.valueOf() - a.data.date.valueOf();

export async function getSortedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog");
  return posts.sort(byDateDesc);
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getSortedBlogPosts();
  return posts.filter((post) => !post.data.draft);
}
