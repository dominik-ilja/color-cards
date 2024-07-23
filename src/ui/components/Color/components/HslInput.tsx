import { HSL } from "color-convert/conversions";
import React from "react";
import { TextField } from "react-aria-components";

import { clamp } from "@/ui/utilities/clamp";

import Input from "./Input";

const MIN_CHANNEL = 0;
const MAX_HUE = 360;
const MAX_SATURATION = 100;
const MAX_LIGHTNESS = 100;
const HUE_INDEX = 0;
const SATURATION_INDEX = 1;
const LIGHTNESS_INDEX = 2;

export type StrHSL = [string, string, string];

type Props = {
  channels: HSL;
  displayValue: StrHSL;
  onChange: (hsl: HSL) => void;
  onDisplay: (hsl: StrHSL) => void;
};

export default function HslInput({ channels, displayValue, ...props }: Props) {
  function onBlur() {
    props.onDisplay(channels.map(String) as StrHSL);
  }
  function onChange(text: string, index: number, max: number) {
    const display = [...displayValue] as StrHSL;
    display[index] = text;
    props.onDisplay(display);

    const value = parseInt(text);
    const channel = Number.isNaN(value) ? 0 : clamp(value, MIN_CHANNEL, max);
    const hsl = [...channels] as HSL;
    hsl[index] = channel;
    props.onChange(hsl);
  }

  return (
    <div className="flex items-center justify-center gap-x-8">
      {[
        {
          aria_label: "HSL Hue Input",
          index: HUE_INDEX,
          leading_icon: "H",
          max: MAX_HUE,
          value: displayValue[HUE_INDEX].toString(),
        },
        {
          aria_label: "HSL Saturation Input",
          index: SATURATION_INDEX,
          leading_icon: "S",
          max: MAX_SATURATION,
          trailing_icon: "%",
          value: displayValue[SATURATION_INDEX].toString(),
        },
        {
          aria_label: "HSL Lightness Input",
          index: LIGHTNESS_INDEX,
          leading_icon: "L",
          max: MAX_LIGHTNESS,
          trailing_icon: "%",
          value: displayValue[LIGHTNESS_INDEX].toString(),
        },
      ].map(
        ({ aria_label, index, leading_icon, max, trailing_icon, value }) => (
          <TextField
            aria-label={aria_label}
            key={aria_label}
            value={value}
            onBlur={() => onBlur()}
            onChange={(text) => onChange(text, index, max)}
          >
            <Input
              className="text-center"
              leadingIcon={leading_icon}
              trailingIcon={trailing_icon}
            />
          </TextField>
        ),
      )}
    </div>
  );
}
