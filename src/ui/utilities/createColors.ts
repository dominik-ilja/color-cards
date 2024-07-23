import convert from "color-convert";
import type { CMYK, HEX, HSL, HSV, RGB } from "color-convert/conversions";

import { COLOR_CODES, type ColorCode } from "@/constants";

export type Color =
  | { value: HEX; type: ColorCode["HEX"] }
  | {
      value: RGB | HSL | HSV;
      type: ColorCode["RGB"] | ColorCode["HSL"] | ColorCode["HSB"];
    }
  | { value: CMYK; type: ColorCode["CMYK"] };

export type Colors = {
  hex: HEX;
  rgb: RGB;
  hsl: HSL;
  hsb: HSV;
  cmyk: CMYK;
};

export type ColorsKeys = keyof Colors;

export function createColors({ value, type }: Color): Colors {
  switch (type) {
    case COLOR_CODES.HEX:
      return {
        hex: value,
        rgb: convert.hex.rgb(value),
        hsl: convert.hex.hsl(value),
        hsb: convert.hex.hsv(value),
        cmyk: convert.hex.cmyk(value),
      };
    case COLOR_CODES.RGB:
      return {
        hex: convert.rgb.hex(value),
        rgb: value,
        hsl: convert.rgb.hsl(value),
        hsb: convert.rgb.hsv(value),
        cmyk: convert.rgb.cmyk(value),
      };
    case COLOR_CODES.HSL:
      return {
        hex: convert.hsl.hex(value),
        rgb: convert.hsl.rgb(value),
        hsl: value,
        hsb: convert.hsl.hsv(value),
        cmyk: convert.hsl.cmyk(value),
      };
    case COLOR_CODES.HSB:
      return {
        hex: convert.hsv.hex(value),
        rgb: convert.hsv.rgb(value),
        hsl: convert.hsv.hsl(value),
        hsb: value,
        cmyk: convert.hsv.cmyk(value),
      };
    case COLOR_CODES.CMYK:
      return {
        hex: convert.cmyk.hex(value),
        rgb: convert.cmyk.rgb(value),
        hsl: convert.cmyk.hsl(value),
        hsb: convert.cmyk.hsv(value),
        cmyk: value,
      };
    default:
      throw new Error("Invalid type");
  }
}
