import axios from "axios";
import type { CMYK, HEX, HSL, HSV, RGB } from "color-convert/conversions";
import React, { useEffect, useState } from "react";
import { Key } from "react-aria-components";

import {
  COLOR_CODES,
  COLOR_CODES_ORDER,
  MESSAGE_TYPES,
  type MessageAdjustSize,
  type MessageClose,
  type MessageCreate,
} from "@/constants";
import Button from "@/ui/components/Button";
import Color from "@/ui/components/Color";
import ColorValues from "@/ui/components/ColorValues";
import CustomName from "@/ui/components/CustomName";
import SizeSelect, {
  SIZE_DEFAULT,
  SIZE_OPTIONS,
} from "@/ui/components/SizeSelect/SizeSelect";
import { createColors } from "@/ui/utilities/createColors";

export type Display = HEX | RGB | HSL | HSV | CMYK;

const COLOR_VALUES = [
  { label: "Hex", id: COLOR_CODES.HEX },
  { label: "RGB", id: COLOR_CODES.RGB },
  { label: "HSL", id: COLOR_CODES.HSL },
  { label: "HSB", id: COLOR_CODES.HSB },
  { label: "CMYK", id: COLOR_CODES.CMYK },
];

export default function App() {
  const [sizeSelection, setSizeSelection] = useState(SIZE_DEFAULT);
  const [colorCodes, setColorCodes] = useState<string[]>(["hex"]);
  const [showCustomName, setShowCustomName] = useState(false);
  const [customName, setCustomName] = useState("");
  const [display, setDisplay] = useState<Display>("");
  const [selection, setSelection] = useState<Key>("hex");
  const [colors, setColors] = useState(
    createColors({ value: "4F46E5", type: "hex" }),
  );

  /* Used to communicate with plugin code */
  useEffect(() => {
    function listener(event: MessageEvent) {
      console.log(event);
      const { type, message } = event.data.pluginMessage;
    }

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  async function onRun() {
    let name = customName.trim();

    if (!showCustomName || name.length === 0) {
      try {
        const hex = colors.hex;
        const { data } = await axios.get(
          `https://www.thecolorapi.com/id?hex=${hex}`,
        );
        name = data.name.value;
      } catch (error) {
        console.log(error);
        name = "Color Card";
        figma.notify(`Failed to retrieve card name. Using default: "${name}"`);
      }
    }

    parent.postMessage(
      {
        pluginMessage: {
          type: MESSAGE_TYPES.CREATE,
          message: {
            colors,
            name,
            selection: colorCodes.sort((a, b) => {
              const aIdx = COLOR_CODES_ORDER.findIndex((v) => v === a);
              const bIdx = COLOR_CODES_ORDER.findIndex((v) => v === b);
              return aIdx - bIdx;
            }),
            size: sizeSelection.id,
          },
        },
      } as MessageCreate,
      "*",
    );
  }
  function onCancel() {
    parent.postMessage(
      {
        pluginMessage: {
          type: MESSAGE_TYPES.CLOSE,
        },
      } as MessageClose,
      "*",
    );
  }

  type ColorKeys = keyof typeof colors;

  return (
    <main className="flex min-h-screen items-start justify-center">
      <div className="w-full border border-muted p-16 shadow-2xl">
        <Color
          colors={colors}
          display={display}
          selection={selection}
          selectionItems={COLOR_VALUES}
          onChange={(colors) => setColors(colors)}
          onDisplay={setDisplay}
          onSelectionChange={(key) => {
            setSelection(key);
            setDisplay(colors[key as ColorKeys] as Display);
          }}
        />

        <SizeSelect
          items={SIZE_OPTIONS}
          onSelectionChange={setSizeSelection}
          selection={sizeSelection}
        />

        <ColorValues
          colors={colors}
          items={COLOR_VALUES}
          value={colorCodes}
          onChange={setColorCodes}
        />

        <CustomName
          showInput={showCustomName}
          value={customName}
          onChange={setCustomName}
          onShowInputChange={(show) => {
            setShowCustomName(show);
            parent.postMessage(
              {
                pluginMessage: {
                  type: MESSAGE_TYPES.ADJUST_SIZE,
                  message: { expanded: show },
                },
              } as MessageAdjustSize,
              "*",
            );
          }}
        />

        <div className="mb-auto flex gap-x-12">
          <Button
            className="w-full justify-center"
            variant="primary"
            onClick={onRun}
          >
            Create
          </Button>
          <Button className="w-full justify-center" onClick={onCancel}>
            Close
          </Button>
        </div>
      </div>
    </main>
  );
}
