import convert from "color-convert";
import type { CMYK, HEX, HSL, HSV, RGB } from "color-convert/conversions";

export type Color =
  | { value: HEX; type: "hex" }
  | { value: RGB | HSL | HSV; type: "rgb" | "hsl" | "hsb" }
  | { value: CMYK; type: "cmyk" };

export function createColors({ value, type }: Color) {
  switch (type) {
    case "hex":
      return {
        hex: value,
        rgb: convert.hex.rgb(value),
        hsl: convert.hex.hsl(value),
        hsb: convert.hex.hsv(value),
        cmyk: convert.hex.cmyk(value),
      };
    case "rgb":
      return {
        hex: convert.rgb.hex(value),
        rgb: value,
        hsl: convert.rgb.hsl(value),
        hsb: convert.rgb.hsv(value),
        cmyk: convert.rgb.cmyk(value),
      };
    case "hsl":
      return {
        hex: convert.hsl.hex(value),
        rgb: convert.hsl.rgb(value),
        hsl: value,
        hsb: convert.hsl.hsv(value),
        cmyk: convert.hsl.cmyk(value),
      };
    case "hsb":
      return {
        hex: convert.hsv.hex(value),
        rgb: convert.hsv.rgb(value),
        hsl: convert.hsv.hsl(value),
        hsb: value,
        cmyk: convert.hsv.cmyk(value),
      };
    case "cmyk":
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
