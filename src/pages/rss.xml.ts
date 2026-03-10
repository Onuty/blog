import rss from "@astrojs/rss";
import { SITE } from "@/consts";
import { getPublishedBlogPosts } from "@/lib/blog";

export async function GET(context: { site: URL | undefined }) {
  const posts = await getPublishedBlogPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    customData: "<language>en-us</language>",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}`
    }))
  });
}
