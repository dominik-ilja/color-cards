import { ChevronDownIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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

export type size = "sm" | "md" | "lg" | "xl" | "xxl";

const options = [
  { label: "Small" },
  { label: "Default" },
  { label: "Large" },
  { label: "x-Large" },
  { label: "2x-Large" },
];

export default function SizeSelection() {
  const [selectWidth, setSelectWidth] = useState(0);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [selection, setSelection] = useState<Key>("Default");

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
