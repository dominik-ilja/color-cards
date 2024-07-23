import type { Colors } from "@/ui/utilities/createColors";

export const COLOR_CODES = {
  HEX: "hex",
  RGB: "rgb",
  HSL: "hsl",
  HSB: "hsb",
  CMYK: "cmyk",
} as const;

export type ColorCode = typeof COLOR_CODES;
export type ColorCodesKey = keyof ColorCode;
export type ColorCodesValue = ColorCode[ColorCodesKey];

export const COLOR_CODES_ORDER = [
  COLOR_CODES.HEX,
  COLOR_CODES.RGB,
  COLOR_CODES.HSL,
  COLOR_CODES.HSB,
  COLOR_CODES.CMYK,
] as const;

export const COLOR_VALUES: { label: string; id: ColorCodesValue }[] = [
  { label: "Hex", id: COLOR_CODES.HEX },
  { label: "RGB", id: COLOR_CODES.RGB },
  { label: "HSL", id: COLOR_CODES.HSL },
  { label: "HSB", id: COLOR_CODES.HSB },
  { label: "CMYK", id: COLOR_CODES.CMYK },
] as const;

export type ColorValues = typeof COLOR_VALUES;

export const MESSAGE_TYPES = {
  ADJUST_SIZE: "ADJUST_SIZE",
  CREATE: "CREATE",
  CLOSE: "CLOSE",
} as const;

export type MessageTypeKey = keyof typeof MESSAGE_TYPES;
export type MessageTypeValue = (typeof MESSAGE_TYPES)[MessageTypeKey];

export const PLUGIN_DIMENSIONS = {
  HEIGHT: {
    DEFAULT: 480,
    EXPANDED: 528,
  },
  WIDTH: 400,
} as const;

export const SIZES = {
  SMALL: "sm",
  DEFAULT: "default",
  LARGE: "lg",
  XLARGE: "xl",
  "2XLARGE": "2xl",
} as const;

export type MessageAdjustSize = {
  pluginMessage: {
    type: (typeof MESSAGE_TYPES)["ADJUST_SIZE"];
    message: {
      expanded: boolean;
    };
  };
};

export type MessageClose = {
  pluginMessage: {
    type: (typeof MESSAGE_TYPES)["CLOSE"];
    message: null;
  };
};

export type MessageCreate = {
  pluginMessage: {
    type: (typeof MESSAGE_TYPES)["CREATE"];
    message: {
      colors: Colors;
      name: string;
      selection: string[];
      size: string;
    };
  };
};

export type PluginMessage = MessageAdjustSize | MessageClose | MessageCreate;
