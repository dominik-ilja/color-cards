import "./Color.css";

import React from "react";
import { Label } from "react-aria-components";

import type { ColorCodesValue } from "@/constants";
import type { Display } from "@/ui/App";

import ColorInput from "./components/ColorInput";
import ColorSelect from "./components/ColorSelect";
import ColorSwatch from "./components/ColorSwatch";

const COLOR_SWATCH_ID = "color-swatch";

type Props = {
  colors: any;
  onChange: (colors: any) => void;
  onDisplay: (display: Display) => void;
  onSelectionChange: (key: ColorCodesValue) => void;
  selection: ColorCodesValue;
  display: Display;
  selectionItems: { label: string; id: string }[];
};

export default function Color({
  colors,
  display,
  onChange,
  onDisplay,
  onSelectionChange,
  selection,
  selectionItems,
}: Props) {
  return (
    <div className="mb-20">
      <div className="mb-8 flex items-center justify-between">
        <Label htmlFor={COLOR_SWATCH_ID}>Color</Label>
        <ColorSelect
          selection={selection}
          selectionItems={selectionItems}
          onSelectionChange={onSelectionChange}
        />
      </div>
      <div className="flex min-h-40 items-center gap-x-8">
        <ColorSwatch
          colors={colors}
          id={COLOR_SWATCH_ID}
          selection={selection}
          onChange={onChange}
          onDisplay={onDisplay}
        />
        <ColorInput
          colors={colors}
          display={display}
          selection={selection}
          onChange={onChange}
          onDisplay={onDisplay}
        />
      </div>
    </div>
  );
}
