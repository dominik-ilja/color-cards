import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Button,
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

import CmykInput from "./ColorGroup/CmykInput";
import Input from "./Input";

type ColorGroupProps = {
  color: string; // Hex string
  onChange: any;
};

export default function ColorGroup({ color, onChange }: ColorGroupProps) {
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
          onChange={(e) => onChange(e.target.value)}
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
        <CmykInput
          value={color}
          onChange={(value) => {
            console.log(value);
            onChange(value);
          }}
        />
      );
      break;
    default:
      break;
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="label" htmlFor="color">
          Color
        </label>
        <Select
          className="color-select"
          selectedKey={selection}
          onSelectionChange={(key) => setSelection(key)}
        >
          <Label hidden>Color Code</Label>
          <Button className="color-select-button hfv:text-fg-primary">
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
            value={`#${color}`}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();

              if (value.startsWith("#")) {
                onChange(value.slice(1));
              } else {
                onChange(value);
              }
            }}
          />
        </div>

        <div className="flex-1">{input}</div>
      </div>
    </div>
  );
}
