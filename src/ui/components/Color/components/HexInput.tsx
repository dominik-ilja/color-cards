import type { HEX } from "color-convert/conversions";
import React, { useState } from "react";
import { TextField } from "react-aria-components";

import Input from "./Input";

type Props = {
  value: HEX;
  displayValue: HEX;
  onChange: (hex: HEX) => void;
  onDisplay: (hex: HEX) => void;
};

export default function HexInput(props: Props) {
  const [lastValid, setLastValid] = useState(props.value);

  return (
    <TextField
      aria-label="hex input"
      className="w-full"
      value={props.displayValue}
      onBlur={() => {
        props.onChange(lastValid);
        props.onDisplay(lastValid);
      }}
      onChange={(text) => {
        props.onDisplay(text);

        if (!/^[a-fA-F0-9]+$/.test(text) || text.length > 6) {
          props.onChange(lastValid);
          return;
        }

        const hexLength = 6;
        const fillString = text.length > 3 ? "0" : text;
        const hex = text.padEnd(hexLength, fillString);

        props.onChange(hex);
        setLastValid(hex);
      }}
    >
      <Input leadingIcon="#" />
    </TextField>
  );
}
