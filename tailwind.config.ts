import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const selectorPlugin = plugin(({ addVariant }) => {
  addVariant("not-last-child", "&:not(:last-child)");
  addVariant("hfv", ["&:hover", "&:focus-visible"]);
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    textColor: {
      "fg-default": "var(--color-foreground-default)",
      "fg-muted": "var(--color-foreground-muted)",
      "fg-on-primary": "var(--color-fg-on-primary)",
    },
    backgroundColor: {
      primary: "var(--color-primary)",
      "primary-dark": "var(--color-primary-dark)",
    },
    extend: {},
  },
  plugins: [selectorPlugin],
} as Config;
