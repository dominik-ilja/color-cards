import React from "react";

import { COLOR_CODES, type ColorCodesValue } from "@/constants";
import type { Display } from "@/ui/App";
import { StrCMYK, StrHSB, StrHSL, StrRGB } from "@/ui/App";
import { type Colors, createColors } from "@/ui/utilities/createColors";

import CmykInput from "./CmykInput";
import HexInput from "./HexInput";
import HsbInput from "./HsbInput";
import HslInput from "./HslInput";
import RgbInput from "./RgbInput";

type Props = {
  colors: Colors;
  display: Display;
  onChange: (colors: Colors) => void;
  onDisplay: (display: Display) => void;
  selection: ColorCodesValue;
};

export default function ColorInput({
  colors,
  display,
  onChange,
  onDisplay,
  selection,
}: Props) {
  if (selection === COLOR_CODES.HEX && typeof display === "string") {
    return (
      <HexInput
        displayValue={display}
        value={colors.hex}
        onChange={(hex) => {
          onChange(createColors({ value: hex, type: COLOR_CODES.HEX }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  const displayIsArray = Array.isArray(display);

  if (selection === COLOR_CODES.RGB && displayIsArray && display.length === 3) {
    return (
      <RgbInput
        channels={colors.rgb}
        displayValue={display.map(String) as StrRGB}
        onChange={(rgb) => {
          onChange(createColors({ value: rgb, type: COLOR_CODES.RGB }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  if (selection === COLOR_CODES.HSL && displayIsArray && display.length === 3) {
    return (
      <HslInput
        channels={colors.hsl}
        displayValue={display.map(String) as StrHSL}
        onChange={(hsl) => {
          onChange(createColors({ value: hsl, type: COLOR_CODES.HSL }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  if (selection === COLOR_CODES.HSB && displayIsArray && display.length === 3) {
    return (
      <HsbInput
        channels={colors.hsb}
        displayValue={display.map(String) as StrHSB}
        onChange={(hsb) => {
          onChange(createColors({ value: hsb, type: COLOR_CODES.HSB }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  if (
    selection === COLOR_CODES.CMYK &&
    displayIsArray &&
    display.length === 4
  ) {
    return (
      <CmykInput
        channels={colors.cmyk}
        displayValue={display.map(String) as StrCMYK}
        onChange={(cmyk) => {
          onChange(createColors({ value: cmyk, type: COLOR_CODES.CMYK }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  throw new Error("Invalid input selected");
}
