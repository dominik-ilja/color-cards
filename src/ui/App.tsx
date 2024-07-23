import axios from "axios";
import type { HEX } from "color-convert/conversions";
import React, { useEffect, useState } from "react";

import {
  COLOR_CODES_ORDER,
  COLOR_VALUES,
  type ColorCodesValue,
  MESSAGE_TYPES,
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

export type StrRGB = [string, string, string];
export type StrHSL = [string, string, string];
export type StrHSB = [string, string, string];
export type StrCMYK = [string, string, string, string];

export type Display = HEX | StrRGB | StrHSL | StrHSB | StrCMYK;

export default function App() {
  const [sizeSelection, setSizeSelection] = useState(SIZE_DEFAULT);
  const [colorCodes, setColorCodes] = useState<string[]>(["hex"]);
  const [showCustomName, setShowCustomName] = useState(false);
  const [customName, setCustomName] = useState("");
  const [display, setDisplay] = useState<Display>("");
  const [selection, setSelection] = useState<ColorCodesValue>("hex");
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
      },
      "*",
    );
  }
  function onCancel() {
    parent.postMessage(
      {
        pluginMessage: {
          type: MESSAGE_TYPES.CLOSE,
          message: null,
        },
      },
      "*",
    );
  }

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

            const value = colors[key];
            Array.isArray(value)
              ? setDisplay(value.map(String) as Display)
              : setDisplay(value);
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
              },
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
