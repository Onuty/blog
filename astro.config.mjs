import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

const site = process.env.SITE_URL ?? "https://onuty.net";

export default defineConfig({
  site,
  output: "static",
  integrations: [mdx(), tailwind({ applyBaseStyles: false }), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
