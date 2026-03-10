/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GISCUS_REPO?: string;
  readonly PUBLIC_GISCUS_REPO_ID?: string;
  readonly PUBLIC_GISCUS_CATEGORY?: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID?: string;
  readonly PUBLIC_GISCUS_MAPPING?: "pathname" | "url" | "title" | "og:title";
  readonly PUBLIC_GISCUS_STRICT?: "0" | "1";
  readonly PUBLIC_GISCUS_REACTIONS_ENABLED?: "0" | "1";
  readonly PUBLIC_GISCUS_EMIT_METADATA?: "0" | "1";
  readonly PUBLIC_GISCUS_INPUT_POSITION?: "top" | "bottom";
  readonly PUBLIC_GISCUS_THEME?: "light" | "light_high_contrast" | "light_protanopia" | "light_tritanopia";
  readonly PUBLIC_GISCUS_LANG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
