import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import {
  Button,
  Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

import { ChevronDownIcon, XIcon } from "lucide-react";
import Input from "./components/Input";
// import { ChevronDownIcon } from "lucide-react";

type size = "sm" | "md" | "lg" | "xl" | "xxl";

type ButtonsProps = {
  onCreate: React.MouseEventHandler<HTMLButtonElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
};

function Buttons({ onCreate, onCancel }: ButtonsProps) {
  return (
    <div className="flex gap-x-3">
      <button className="btn-primary btn w-full" id="create" onClick={onCreate}>
        Create
      </button>
      <button className="btn-default btn w-full" id="cancel" onClick={onCancel}>
        Close
      </button>
    </div>
  );
}

type ColorGroupProps = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

function ColorGroup({ color, setColor }: ColorGroupProps) {
  const [selection, setSelection] = useState<Key>("Hex");

  const options = [
    { label: "Hex" },
    { label: "RGB" },
    { label: "HSL" },
    { label: "HSB" },
    { label: "CMYK" },
  ];

  let input: React.JSX.Element | null = null;

  switch (selection) {
    case "Hex":
      input = (
        <Input
          leadingIcon="#"
          id="color-text"
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
          pattern="^[a-fA-F0-9]{6}$"
          minLength={3}
          maxLength={6}
        />
      );
      break;
    case "RGB":
      input = (
        <div className="flex gap-x-1">
          <Input leadingIcon="R" />
          <Input leadingIcon="G" />
          <Input leadingIcon="B" />
        </div>
      );
      break;
    case "HSL":
      input = (
        <div className="flex gap-x-1">
          <Input leadingIcon="H" trailingIcon="%" />
          <Input leadingIcon="S" trailingIcon="%" />
          <Input leadingIcon="L" trailingIcon="%" />
        </div>
      );
      break;
    case "HSB":
      input = (
        <div className="flex gap-x-1">
          <Input leadingIcon="H" trailingIcon="%" />
          <Input leadingIcon="S" trailingIcon="%" />
          <Input leadingIcon="B" trailingIcon="%" />
        </div>
      );
      break;
    case "CMYK":
      input = (
        <div className="flex gap-x-1">
          <Input leadingIcon="C" trailingIcon="%" />
          <Input leadingIcon="M" trailingIcon="%" />
          <Input leadingIcon="Y" trailingIcon="%" />
          <Input leadingIcon="K" trailingIcon="%" />
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div>
      <div className="justify-content-between flex items-center">
        <label className="label mb-2" htmlFor="color">
          Color
        </label>
        <Select
          className="color-select"
          selectedKey={selection}
          onSelectionChange={(key) => setSelection(key)}
        >
          <Label hidden>Color Code</Label>
          <Button className="color-select-button">
            <SelectValue className="mr-2" />
            <ChevronDownIcon aria-hidden="true" size={16} />
          </Button>
          <Popover className={"select-popover"}>
            <ListBox className="select-listbox">
              {options.map(({ label }) => (
                <ListBoxItem key={label} id={label} className={"select-item"}>
                  {label}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      </div>
      <div className="flex w-full items-center gap-x-1">
        <div className="color-picker-wrapper">
          <input
            className="color-picker"
            id="color"
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value.toLowerCase());
            }}
          />
        </div>

        {/* Client Side Validation of Input */}
        <div className="flex-1">{input}</div>
      </div>
    </div>
  );
}

function SizeSelection() {
  const [selectWidth, setSelectWidth] = useState(0);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [selection, setSelection] = useState<Key>("Default");

  const options = [
    { label: "Small" },
    { label: "Default" },
    { label: "Large" },
    { label: "x-Large" },
    { label: "2x-Large" },
  ];

  useEffect(() => {
    if (selectRef.current !== null) {
      setSelectWidth(selectRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="flex gap-x-3" style={{ alignItems: "end" }}>
      <Select
        className="select flex flex-1 flex-col"
        ref={selectRef}
        selectedKey={selection}
        onSelectionChange={(key) => setSelection(key)}
      >
        <Label className="mb-2">Size</Label>
        <Button className="select-button">
          <SelectValue />
          <ChevronDownIcon aria-hidden="true" size={16} />
        </Button>
        <Popover className={"select-popover"} style={{ width: selectWidth }}>
          <ListBox className="select-listbox">
            {options.map(({ label }) => (
              <ListBoxItem id={label} key={label} className={"select-item"}>
                {label}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
      <div
        className="text-muted flex items-center gap-x-1"
        style={{ height: 32 }}
      >
        <div className="font-mono">500</div>
        <XIcon size={16} />
        <div className="font-mono">500</div>
      </div>
    </div>
  );
}

function ColorCodesCheckGroup() {
  return (
    <fieldset className="m-0 border-none p-0">
      <legend className="label mb-2 px-0">Color Values</legend>
      {[
        { label: "Hex" },
        { label: "RGB" },
        { label: "HSL" },
        { label: "HSB" },
        { label: "CMYK" },
      ].map(({ label }) => {
        return (
          <div key={label} className="flex items-center">
            <input className="checkbox m-0 mr-3" type="checkbox" id={label} />
            <label className="label" htmlFor={label}>
              {label}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

type CustomNameProps = { onCheck: Function; onTextChange: Function };

function CustomName({ onCheck, onTextChange }: CustomNameProps) {
  const [isApiSelected, setIsApiSelected] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <input
          className="checkbox m-0 mr-3"
          id="color-api"
          type="checkbox"
          checked={isApiSelected}
          onChange={() => setIsApiSelected(!isApiSelected)}
        />
        <label className="label" htmlFor="color-api">
          Use custom name
        </label>
      </div>
      {isApiSelected && <input type="text" className="input mt-2 w-full" />}
    </div>
  );
}

export default function App() {
  const [cardSize, setCardSize] = useState<size>("md");
  const [color, setColor] = useState("4f46e5");
  const [colorName, setColorName] = useState("");
  const [customName, setCustomName] = useState<string>("");

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
        <ColorGroup color={color} setColor={setColor} />

        {/* We need a way to get the selection from this component */}
        <SizeSelection />
        {/* We need a way to get the selection from this component */}
        <ColorCodesCheckGroup />

        <CustomName onCheck={() => {}} onTextChange={() => {}} />

        <Buttons onCreate={onRun} onCancel={onCancel} />
      </div>
    </form>
  );
}
