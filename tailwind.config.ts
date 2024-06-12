import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const selectorPlugin = plugin(({ addVariant }) => {
  addVariant("not-last-child", "&:not(:last-child)");
  addVariant("hfv", ["&:hover", "&:focus-visible"]);
});

const borderColor = {
  default: "var(--color-border-default)",
  primary: "var(--color-border-primary)",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    backgroundColor: {
      "primary-lightest": "var(--color-background-primary-lightest)",
      primary: "var(--color-primary)",
      "primary-dark": "var(--color-primary-dark)",
    },
    borderColor: {
      ...borderColor,
    },
    outlineColor: { ...borderColor },
    textColor: {
      "fg-default": "var(--color-foreground-default)",
      "fg-muted": "var(--color-foreground-muted)",
      "fg-primary": "var(--color-foreground-primary)",
      "fg-on-primary": "var(--color-foreground-on-primary)",
    },
    extend: {},
  },
  plugins: [selectorPlugin],
} as Config;
