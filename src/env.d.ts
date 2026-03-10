/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GISCUS_REPO?: string;
  readonly PUBLIC_GISCUS_REPO_ID?: string;
  readonly PUBLIC_GISCUS_CATEGORY?: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID?: string;
  readonly PUBLIC_GISCUS_MAPPING?: "pathname" | "url" | "title" | "og:title";
  readonly PUBLIC_GISCUS_STRICT?: "0" | "1";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

