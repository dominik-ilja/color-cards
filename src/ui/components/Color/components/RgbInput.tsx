import { RGB } from "color-convert/conversions";
import React from "react";
import { TextField } from "react-aria-components";

import { StrRGB } from "@/ui/App";
import { clamp } from "@/ui/utilities/clamp";

import Input from "./Input";

const MIN_RGB = 0;
const MAX_RGB = 255;
const RED_INDEX = 0;
const GREEN_INDEX = 1;
const BLUE_INDEX = 2;

type Props = {
  channels: RGB;
  displayValue: StrRGB;
  onChange: (rgb: RGB) => void;
  onDisplay: (rgbStrs: StrRGB) => void;
};

export default function RgbInput({ channels, displayValue, ...props }: Props) {
  function onBlur() {
    props.onDisplay(channels.map(String) as StrRGB);
  }

  function onChange(text: string, index: number) {
    const display = [...displayValue] as StrRGB;
    display[index] = text;
    props.onDisplay(display);

    const value = parseInt(text);
    const channel = Number.isNaN(value) ? 0 : clamp(value, MIN_RGB, MAX_RGB);
    const rgb = [...channels] as RGB;
    rgb[index] = channel;
    props.onChange(rgb);
  }

  return (
    <div className="flex items-center justify-center gap-x-8">
      {[
        {
          aria_label: "RGB R Input",
          index: RED_INDEX,
          leading_icon: "R",
          value: displayValue[RED_INDEX].toString(),
        },
        {
          aria_label: "RGB G Input",
          index: GREEN_INDEX,
          leading_icon: "G",
          value: displayValue[GREEN_INDEX].toString(),
        },
        {
          aria_label: "RGB B Input",
          index: BLUE_INDEX,
          leading_icon: "B",
          value: displayValue[BLUE_INDEX].toString(),
        },
      ].map(({ aria_label, index, leading_icon, value }) => (
        <TextField
          aria-label={aria_label}
          key={aria_label}
          value={value}
          onBlur={onBlur}
          onChange={(text) => onChange(text, index)}
        >
          <Input className="text-center" leadingIcon={leading_icon} />
        </TextField>
      ))}
    </div>
  );
}
