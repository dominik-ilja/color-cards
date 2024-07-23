const tokens = {
  animation: {
    duration: {
      none: "var(--animation-duration-none)",
      shortest: "var(--animation-duration-shortest)",
      short: "var(--animation-duration-short)",
      DEFAULT: "var(--animation-duration-default)",
      long: "var(--animation-duration-long)",
    },
  },
  color: {
    black: "var(--color-black)",
    transparent: "var(--color-transparent)",
    white: "var(--color-white)",
    beige: "var(--color-beige)",
    "indian-red": "var(--color-indian-red)",
    tundra: "var(--color-tundra)",
    primary: {
      DEFAULT: "var(--color-primary-default)",
      hover: "var(--color-primary-hover)",
    },
    background: {
      "adaptive-0": "var(--color-background-adaptive-0)",
      "adaptive-1": "var(--color-background-adaptive-1)",
      "adaptive-2": "var(--color-background-adaptive-2)",
      "adaptive-3": "var(--color-background-adaptive-3)",
      "adaptive-4": "var(--color-background-adaptive-4)",
      inverse: "var(--color-background-inverse)",
      "layer-0": "var(--color-background-layer-0)",
      "layer-1": "var(--color-background-layer-1)",
      "layer-2": "var(--color-background-layer-2)",
      "layer-3": "var(--color-background-layer-3)",
      "layer-4": "var(--color-background-layer-4)",
      "layer-0-1": "var(--color-background-layer-0-1)",
      "layer-0-2": "var(--color-background-layer-0-2)",
      "layer-0-3": "var(--color-background-layer-0-3)",
      "layer-0-4": "var(--color-background-layer-0-4)",
      "layer-1-0": "var(--color-background-layer-1-0)",
      "layer-1-2": "var(--color-background-layer-1-2)",
      "layer-1-3": "var(--color-background-layer-1-3)",
      "layer-1-4": "var(--color-background-layer-1-4)",
      "layer-2-0": "var(--color-background-layer-2-0)",
      "layer-2-1": "var(--color-background-layer-2-1)",
      "layer-2-3": "var(--color-background-layer-2-3)",
      "layer-2-4": "var(--color-background-layer-2-4)",
      "layer-3-0": "var(--color-background-layer-3-0)",
      "layer-3-1": "var(--color-background-layer-3-1)",
      "layer-3-2": "var(--color-background-layer-3-2)",
      "layer-3-4": "var(--color-background-layer-3-4)",
      "layer-4-0": "var(--color-background-layer-4-0)",
      "layer-4-1": "var(--color-background-layer-4-1)",
      "layer-4-2": "var(--color-background-layer-4-2)",
      "layer-4-3": "var(--color-background-layer-4-3)",
      primary: "var(--color-background-primary-default)",
      "primary-hover": "var(--color-background-primary-hover)",
      transparent: "var(--color-background-transparent)",
      beige: "var(--color-background-beige)",
      "indian-red": "var(--color-background-indian-red)",
      tundra: "var(--color-background-tundra)",
    },
    border: {
      default: "var(--color-border-default)",
      muted: "var(--color-border-muted)",
      primary: "var(--color-border-primary)",
      transparent: "var(--color-border-transparent)",
    },
    foreground: {
      DEFAULT: "var(--color-foreground-default)",
      link: "var(--color-foreground-link)",
      muted: "var(--color-foreground-muted)",
      "on-inverse": "var(--color-foreground-on-inverse)",
      "on-primary": "var(--color-foreground-on-primary)",
      primary: "var(--color-foreground-primary)",
    },
  },
  dimension: {
    borderWidth: {
      DEFAULT: "var(--dimension-border-width-default)",
      medium: "var(--dimension-border-width-medium)",
      large: "var(--dimension-border-width-large)",
    },
    height: {
      header: "var(--dimension-height-header)",
      "input-small": "var(--dimension-height-input-small)",
      input: "var(--dimension-height-input-default)",
      "input-large": "var(--dimension-height-input-large)",
    },
  },
  font: {
    family: {
      "ibm-mono-plex": "var(--font-family-ibm-mono-plex)",
      inter: "var(--font-family-inter)",
      monospace: "var(--font-family-monospace)",
      "playfair-display": "var(--font-family-playfair-display)",
      "sans-serif": "var(--font-family-sans-serif)",
      serif: "var(--font-family-serif)",
    },
    leading: {
      none: "var(--font-leading-none)",
      snug: "var(--font-leading-snug)",
      normal: "var(--font-leading-normal)",
      relaxed: "var(--font-leading-relaxed)",
    },
    size: {
      "2xs": "var(--font-size-2xs)",
      xs: "var(--font-size-xs)",
      sm: "var(--font-size-sm)",
      base: "var(--font-size-base)",
      lg: "var(--font-size-lg)",
      xl: "var(--font-size-xl)",
      "2xl": "var(--font-size-2xl)",
      "3xl": "var(--font-size-3xl)",
      "4xl": "var(--font-size-4xl)",
      "5xl": "var(--font-size-5xl)",
      "6xl": "var(--font-size-6xl)",
      "7xl": "var(--font-size-7xl)",
      "8xl": "var(--font-size-8xl)",
      "9xl": "var(--font-size-9xl)",
      "10xl": "var(--font-size-10xl)",
    },
    weight: {
      normal: "var(--font-weight-normal)",
      medium: "var(--font-weight-medium)",
      bold: "var(--font-weight-bold)",
      black: "var(--font-weight-black)",
    },
  },
  borderRadius: {
    none: "var(--border-radius-none)",
    small: "var(--border-radius-small)",
    DEFAULT: "var(--border-radius-default)",
    medium: "var(--border-radius-medium)",
    large: "var(--border-radius-large)",
    full: "var(--border-radius-full)",
  },
  spacing: {
    "0": "var(--spacing-0)",
    "4": "var(--spacing-4)",
    "8": "var(--spacing-8)",
    "12": "var(--spacing-12)",
    "16": "var(--spacing-16)",
    "20": "var(--spacing-20)",
    "24": "var(--spacing-24)",
    "32": "var(--spacing-32)",
    "40": "var(--spacing-40)",
    "48": "var(--spacing-48)",
    "64": "var(--spacing-64)",
    "96": "var(--spacing-96)",
    "128": "var(--spacing-128)",
    "192": "var(--spacing-192)",
    "256": "var(--spacing-256)",
  },
  transparency: {
    disabled: "var(--transparency-disabled)",
  },
  zIndex: {
    "0": "var(--z-index-0)",
    DEFAULT: "var(--z-index-default)",
    docked: "var(--z-index-docked)",
    sticky: "var(--z-index-sticky)",
  },
};

export const animationDuration = tokens.animation.duration;
export const borderRadius = tokens.borderRadius;
export const borderWidth = tokens.dimension.borderWidth;
export const colorBackground = tokens.color.background;
export const colorBorder = tokens.color.border;
export const colorForeground = tokens.color.foreground;
export const dimensionHeight = tokens.dimension.height;
export const fontFamily = tokens.font.family;
export const fontLeading = tokens.font.leading;
export const fontSize = tokens.font.size;
export const fontWeight = tokens.font.weight;
export const spacing = tokens.spacing;
export const transparency = tokens.transparency;
export const zIndex = tokens.zIndex;

const breakpointTokens = {
  breakpoint: {
    xs: "23.75rem",
    sm: "34rem",
    md: "48rem",
    lg: "64rem",
    xl: "80rem",
    "2xl": "96rem",
  },
};
export const breakpoints = breakpointTokens.breakpoint;
