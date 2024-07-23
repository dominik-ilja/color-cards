import React from "react";
import type { Key } from "react-aria";

import type { Display } from "@/ui/App";
import { createColors } from "@/ui/utilities/createColors";

import CmykInput, { type StrCMYK } from "./CmykInput";
import HexInput from "./HexInput";
import HsbInput, { type StrHSB } from "./HsbInput";
import HslInput, { type StrHSL } from "./HslInput";
import RgbInput, { type StrRGB } from "./RgbInput";

type Props = {
  colors: any;
  display: Display;
  onChange: any;
  onDisplay: any;
  selection: Key;
};

export default function ColorInput({
  colors,
  display,
  onChange,
  onDisplay,
  selection,
}: Props) {
  if (selection === "hex" && typeof display === "string") {
    return (
      <HexInput
        displayValue={display}
        value={colors.hex}
        onChange={(hex) => {
          onChange(createColors({ value: hex, type: "hex" }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  const displayIsArray = Array.isArray(display);

  if (selection === "rgb" && displayIsArray && display.length === 3) {
    return (
      <RgbInput
        channels={colors.rgb}
        displayValue={display.map(String) as StrRGB}
        onChange={(rgb) => {
          onChange(createColors({ value: rgb, type: "rgb" }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  if (selection === "hsl" && displayIsArray && display.length === 3) {
    return (
      <HslInput
        channels={colors.hsl}
        displayValue={display.map(String) as StrHSL}
        onChange={(hsl) => {
          onChange(createColors({ value: hsl, type: "hsl" }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  if (selection === "hsb" && displayIsArray && display.length === 3) {
    return (
      <HsbInput
        channels={colors.hsb}
        displayValue={display.map(String) as StrHSB}
        onChange={(hsb) => {
          onChange(createColors({ value: hsb, type: "hsb" }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  if (selection === "cmyk" && displayIsArray && display.length === 4) {
    return (
      <CmykInput
        channels={colors.cmyk}
        displayValue={display.map(String) as StrCMYK}
        onChange={(cmyk) => {
          onChange(createColors({ value: cmyk, type: "cmyk" }));
        }}
        onDisplay={onDisplay}
      />
    );
  }

  throw new Error("Invalid input selected");
}
