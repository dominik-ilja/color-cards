import { HSV } from "color-convert/conversions";
import React from "react";
import { TextField } from "react-aria-components";

import { clamp } from "@/ui/utilities/clamp";

import Input from "./Input";

const MIN_CHANNEL = 0;
const MAX_HUE = 360;
const MAX_SATURATION = 100;
const MAX_BRIGHTNESS = 100;
const HUE_INDEX = 0;
const SATURATION_INDEX = 1;
const BRIGHTNESS_INDEX = 2;

export type StrHSB = [string, string, string];

type Props = {
  channels: HSV;
  displayValue: StrHSB;
  onChange: (hsb: HSV) => void;
  onDisplay: (hsb: StrHSB) => void;
};

export default function HsbInput({ channels, displayValue, ...props }: Props) {
  function onBlur() {
    props.onDisplay(channels.map(String) as StrHSB);
  }
  function onChange(text: string, index: number, max: number) {
    const display = [...displayValue] as StrHSB;
    display[index] = text;
    props.onDisplay(display);

    const value = parseInt(text);
    const channel = Number.isNaN(value) ? 0 : clamp(value, MIN_CHANNEL, max);
    const hsl = [...channels] as HSV;
    hsl[index] = channel;
    props.onChange(hsl);
  }

  return (
    <div className="flex items-center justify-center gap-x-8">
      {[
        {
          aria_label: "HSB Hue Input",
          index: HUE_INDEX,
          leading_icon: "H",
          max: MAX_HUE,
          value: displayValue[HUE_INDEX].toString(),
        },
        {
          aria_label: "HSB Saturation Input",
          index: SATURATION_INDEX,
          leading_icon: "S",
          max: MAX_SATURATION,
          trailing_icon: "%",
          value: displayValue[SATURATION_INDEX].toString(),
        },
        {
          aria_label: "HSB Brightness Input",
          index: BRIGHTNESS_INDEX,
          leading_icon: "B",
          max: MAX_BRIGHTNESS,
          trailing_icon: "%",
          value: displayValue[BRIGHTNESS_INDEX].toString(),
        },
      ].map(
        ({ aria_label, index, leading_icon, max, trailing_icon, value }) => (
          <TextField
            aria-label={aria_label}
            key={aria_label}
            value={value}
            onBlur={onBlur}
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
