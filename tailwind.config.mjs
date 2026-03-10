import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        text: "#111111",
        muted: "#666666",
        border: "#eeeeee",
        accent: "#ffa631"
      },
      maxWidth: {
        prose: "48rem"
      }
    }
  },
  plugins: [typography]
};

