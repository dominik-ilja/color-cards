import axios from "axios";
import type { CMYK, HEX, HSL, HSV, RGB } from "color-convert/conversions";
import React, { useEffect, useState } from "react";
import { Key } from "react-aria-components";

import ColorCodesCheckGroup from "@/ui/components/ColorCodesCheckGroup";
import ColorGroup from "@/ui/components/ColorGroup";
import ColorValues from "@/ui/components/ColorValues";
import CustomName from "@/ui/components/CustomName";
import SizeSelection, { size } from "@/ui/components/SizeSelection";
import { createColors } from "@/ui/utilities/createColors";

import Button from "./components/Button";

export type Display = HEX | RGB | HSL | HSV | CMYK;

const COLOR_VALUES = [
  { label: "Hex", id: "hex" },
  { label: "RGB", id: "rgb" },
  { label: "HSL", id: "hsl" },
  { label: "HSB", id: "hsb" },
  { label: "CMYK", id: "cmyk" },
];

export type SizeOption = {
  name: string;
  id: string;
  size: number;
};

export const SIZE_DEFAULT: SizeOption = {
  name: "Default",
  id: "default",
  size: 500,
};

type ButtonsProps = {
  onCreate: React.MouseEventHandler<HTMLButtonElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
};

function Buttons({ onCreate, onCancel }: ButtonsProps) {
  return (
    <div className="flex gap-x-3">
      <Button
        className="w-full"
        id="create"
        onClick={onCreate}
        variant="primary"
      >
        Create
      </Button>
      <Button className="w-full" id="cancel" onClick={onCancel}>
        Close
      </Button>
    </div>
  );
}

export default function App() {
  const [cardSize, setCardSize] = useState<size>("md");
  const [color, setColor] = useState("4f46e5");
  const [colorName, setColorName] = useState("");
  // const [customName, setCustomName] = useState<string>("");

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
    if (!/^#[a-fA-F0-9]{6}$/.test(color)) {
      console.log("Invalid color");
      return;
    }

    const message = {
      color: color.toLowerCase(),
      colorName,
      useAPI: customName,
      size: cardSize,
      data: null,
    };

    if (message.useAPI) {
      try {
        // API URL : https://www.thecolorapi.com/docs

        const hexCode = message.color.slice(1);
        const { data } = await axios.get(
          `https://www.thecolorapi.com/id?hex=${hexCode}`,
        );

        // update message values with data
        message.color = data.hex.value.toLowerCase();
        message.colorName = data.name.value;
        message.data = data;
      } catch (error) {
        console.dir(error);
        message.data = null;
      }
    }

    parent.postMessage({ pluginMessage: { type: "run" } }, "*");
  }
  function onCancel() {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }

  return (
    <form className="m-0 p-4" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-y-6">
        <ColorGroup
          color={color}
          onChange={(value: any) => {
            console.log(value);
            setColor(value);
          }}
        />

        {/* We need a way to get the selection from this component */}
        <SizeSelection />
        <ColorValues
          colors={colors}
          items={COLOR_VALUES}
          value={colorCodes}
          onChange={setColorCodes}
        />

        <CustomName onCheck={() => {}} onTextChange={() => {}} />

        <Buttons onCreate={onRun} onCancel={onCancel} />
      </div>
    </form>
  );
}
