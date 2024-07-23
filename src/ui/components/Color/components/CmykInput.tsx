import { CMYK } from "color-convert/conversions";
import React from "react";
import { TextField } from "react-aria-components";

import { clamp } from "@/ui/utilities/clamp";

import Input from "./Input";

const MIN_CMYK = 0;
const MAX_CMYK = 100;
const CYAN_INDEX = 0;
const MAGENTA_INDEX = 1;
const YELLOW_INDEX = 2;
const BLACK_INDEX = 3;

export type StrCMYK = [string, string, string, string];

type Props = {
  channels: CMYK;
  displayValue: StrCMYK;
  onChange: (hsb: CMYK) => void;
  onDisplay: (hsb: StrCMYK) => void;
};

export default function CmykInput({ channels, displayValue, ...props }: Props) {
  function onBlur() {
    props.onDisplay(channels.map(String) as StrCMYK);
  }
  function onChange(text: string, index: number) {
    const display = [...displayValue] as StrCMYK;
    display[index] = text;
    props.onDisplay(display);

    const value = parseInt(text);
    const channel = Number.isNaN(value) ? 0 : clamp(value, MIN_CMYK, MAX_CMYK);
    const hsl = [...channels] as CMYK;
    hsl[index] = channel;
    props.onChange(hsl);
  }

  return (
    <div className="flex items-center justify-center gap-x-8">
      {[
        {
          aria_label: "CMYK cyan input",
          index: CYAN_INDEX,
          leading_icon: "C",
          trailing_icon: "%",
          value: displayValue[CYAN_INDEX].toString(),
        },
        {
          aria_label: "CMYK magenta input",
          index: MAGENTA_INDEX,
          leading_icon: "M",
          trailing_icon: "%",
          value: displayValue[MAGENTA_INDEX].toString(),
        },
        {
          aria_label: "CMYK yellow input",
          index: YELLOW_INDEX,
          leading_icon: "Y",
          trailing_icon: "%",
          value: displayValue[YELLOW_INDEX].toString(),
        },
        {
          aria_label: "CMYK black or key input",
          index: BLACK_INDEX,
          leading_icon: "K",
          trailing_icon: "%",
          value: displayValue[BLACK_INDEX].toString(),
        },
      ].map(({ aria_label, index, leading_icon, trailing_icon, value }) => (
        <TextField
          aria-label={aria_label}
          key={aria_label}
          value={value}
          onBlur={onBlur}
          onChange={(text) => onChange(text, index)}
        >
          <Input
            className="text-center"
            leadingIcon={leading_icon}
            trailingIcon={trailing_icon}
          />
        </TextField>
      ))}
    </div>
  );
}
