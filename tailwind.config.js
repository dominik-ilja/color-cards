/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    textColor: {
      "fg-default": "var(--color-foreground-default)",
      "fg-muted": "var(--color-foreground-muted)",
    },
    extend: {},
  },
  plugins: [],
};
