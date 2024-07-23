import React from "react";

import { COLOR_CODES, type ColorCodesValue } from "@/constants";
import type { Display } from "@/ui/App";
import { type Colors, createColors } from "@/ui/utilities/createColors";

type Props = {
  colors: Colors;
  id: string;
  onChange: (colors: Colors) => void;
  onDisplay: (display: Display) => void;
  selection: ColorCodesValue;
};

export default function ColorSwatch({
  colors,
  id,
  onChange,
  onDisplay,
  selection,
}: Props) {
  return (
    <div className="color-picker-wrapper border border-muted">
      <input
        className="color-picker"
        id={id}
        type="color"
        value={"#" + colors.hex}
        onChange={(e) => {
          const hex = e.target.value.substring(1);
          const colors = createColors({
            value: hex,
            type: COLOR_CODES.HEX,
          });

          onDisplay(colors[selection] as Display);
          onChange(colors);
        }}
      />
    </div>
  );
}
