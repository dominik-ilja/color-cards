import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from "react-aria-components";
import { ChevronDownIcon, XIcon } from "lucide-react";
// import { ChevronDownIcon } from "lucide-react";

type size = "sm" | "md" | "lg" | "xl" | "xxl";

export default function App() {
  const [isApiSelected, setIsApiSelected] = useState(false);
  const [cardSize, setCardSize] = useState<size>("md");
  const [color, setColor] = useState("#4f46e5");
  const [colorName, setColorName] = useState("");
  const [selectWidth, setSelectWidth] = useState(0);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectRef.current !== null) {
      setSelectWidth(selectRef.current.offsetWidth);
    }

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
      useAPI: isApiSelected,
      size: cardSize,
      data: null,
    };

    if (message.useAPI) {
      try {
        // API URL : https://www.thecolorapi.com/docs

        const hexCode = message.color.slice(1);
        const { data } = await axios.get(`https://www.thecolorapi.com/id?hex=${hexCode}`);

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
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-y-6 mb-8">
        {/* Color */}
        <div>
          <div className="flex items-center justify-content-between">
            <label className="label mb-2" htmlFor="color">
              Color
            </label>
            <Select className="color-select" defaultSelectedKey={"Hex"}>
              <Label hidden>Color Code</Label>
              <Button className="color-select-button">
                <SelectValue className="mr-2" />
                <ChevronDownIcon aria-hidden="true" size={16} />
              </Button>
              <Popover className={"select-popover"}>
                <ListBox className="select-listbox">
                  <ListBoxItem className={"select-item"}>Hex</ListBoxItem>
                  <ListBoxItem className={"select-item"}>RGB</ListBoxItem>
                  <ListBoxItem className={"select-item"}>HSL</ListBoxItem>
                  <ListBoxItem className={"select-item"}>HSB</ListBoxItem>
                  <ListBoxItem className={"select-item"}>CMYK</ListBoxItem>
                </ListBox>
              </Popover>
            </Select>
          </div>
          <div className="flex items-center gap-x-1 w-full">
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
            <input
              className="input flex-1"
              id="color-text"
              type="text"
              title="Color code must be a valid hex code Ex: #000000"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
              pattern="^#[a-fA-F0-9]{6}$"
              minLength={7}
              maxLength={7}
            />
          </div>
        </div>

        {/* Card Size Selection */}
        <div className="flex gap-x-3" style={{ alignItems: "end" }}>
          <Select className="select flex flex-1 flex-col" ref={selectRef}>
            <Label className="mb-2">Size</Label>
            <Button className="select-button">
              <SelectValue />
              <ChevronDownIcon aria-hidden="true" size={16} />
            </Button>
            <Popover className={"select-popover"} style={{ width: selectWidth }}>
              <ListBox className="select-listbox">
                <ListBoxItem className={"select-item"}>Small</ListBoxItem>
                <ListBoxItem className={"select-item"}>Default</ListBoxItem>
                <ListBoxItem className={"select-item"}>Large</ListBoxItem>
                <ListBoxItem className={"select-item"}>x-large</ListBoxItem>
                <ListBoxItem className={"select-item"}>2x-large</ListBoxItem>
              </ListBox>
            </Popover>
          </Select>
          <div className="flex items-center gap-x-1" style={{ height: 32 }}>
            <div>500</div>
            <XIcon size={16} />
            <div>500</div>
          </div>
        </div>

        <fieldset className="m-0 p-0 border-none">
          <legend className="label px-0 mb-2">Color Values</legend>
          {[{ label: "Hex" }, { label: "RGB" }, { label: "HSL" }, { label: "HSB" }, { label: "CMYK" }].map(
            ({ label }) => {
              return (
                <div key={label} className="flex items-center">
                  <input className="checkbox m-0 mr-3" type="checkbox" id={label} />
                  <label className="label" htmlFor={label}>
                    {label}
                  </label>
                </div>
              );
            }
          )}
        </fieldset>

        {/* Use Custom Name */}
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
      </div>

      <div className="flex gap-x-3">
        <button className="btn-primary btn w-full" id="create" onClick={onRun}>
          Create Card
        </button>
        <button className="btn-default btn w-full" id="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
