import type { Config } from "tailwindcss";

import selectorPlugin from "./configuration/tailwind/selectorPlugin";
import {
  animationDuration,
  borderRadius,
  borderWidth,
  breakpoints,
  colorBackground,
  colorBorder,
  colorForeground,
  dimensionHeight,
  fontFamily,
  fontLeading,
  fontSize,
  fontWeight,
  spacing,
  transparency,
  zIndex,
} from "./configuration/tailwind/tokens/default.tokens";
export { breakpoints } from "./configuration/tailwind/tokens/default.tokens";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      height: { ...dimensionHeight },
      spacing: { header: dimensionHeight.header },
    },
    backgroundColor: { ...colorBackground },
    borderColor: { ...colorBorder },
    borderWidth: { ...borderWidth },
    borderRadius: { ...borderRadius },
    fill: { ...colorBackground, ...colorForeground },
    fontFamily: { ...fontFamily },
    fontSize: { ...fontSize },
    fontWeight: { ...fontWeight },
    lineHeight: { ...fontLeading },
    opacity: { ...transparency },
    screens: { ...breakpoints },
    spacing: { ...spacing },
    textColor: {
      fg: {
        ...colorForeground,
      },
    },
    transitionDuration: { ...animationDuration },
    zIndex: { ...zIndex },
  },
  plugins: [selectorPlugin],
};

export default config;
