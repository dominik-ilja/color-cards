import React from "react";

import type { Display } from "@/ui/App";
import { createColors } from "@/ui/utilities/createColors";

type Props = {
  colors: any;
  id: string;
  onDisplay: any;
  onChange: any;
  selection: any;
};

export default function ColorSwatch({
  colors,
  id,
  onChange,
  onDisplay,
  selection,
}: Props) {
  return (
    <div className="color-picker-wrapper border-default">
      <input
        className="color-picker"
        id={id}
        type="color"
        value={"#" + colors.hex}
        onChange={(e) => {
          const hex = e.target.value.substring(1);
          const colors = createColors({
            value: hex,
            type: "hex",
          });

          type ColorKeys = keyof typeof colors;
          onDisplay(colors[selection as ColorKeys] as Display);
          onChange(colors);
        }}
      />
    </div>
  );
}
