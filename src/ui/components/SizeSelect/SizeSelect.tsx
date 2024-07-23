import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import React from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

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

export const SIZE_OPTIONS: SizeOption[] = [
  { name: "Small", id: "small", size: 250 },
  SIZE_DEFAULT,
  { name: "Large", id: "large", size: 750 },
  { name: "x-Large", id: "x-large", size: 1000 },
  { name: "2x-Large", id: "2xl-large", size: 1250 },
];

type SizeDisplayProps = {
  selection: SizeOption;
};

function SizeDisplay({ selection }: SizeDisplayProps) {
  return (
    <div className="flex items-center justify-center text-fg-muted">
      <div className="grid h-40 place-items-center p-8">{selection.size}</div>
      <div>
        <XIcon size={20} />
      </div>
      <div className="grid h-40 place-items-center p-8">{selection.size}</div>
    </div>
  );
}

type SizeSelectProps = {
  selection: SizeOption;
  onSelectionChange: (selection: SizeOption) => void;
  items: SizeOption[];
};

export default function SizeSelect({
  items,
  onSelectionChange,
  selection,
}: SizeSelectProps) {
  return (
    <div className="mb-20 flex items-end">
      <Select
        className="select flex w-full flex-col text-fg"
        selectedKey={selection.id}
        onSelectionChange={(key) =>
          onSelectionChange(items.find((item) => item.id === key)!)
        }
      >
        <Label>Size</Label>
        <Button className="input">
          <SelectValue />
          <ChevronDownIcon size={20} />
        </Button>

        <Popover className="min-w-[--trigger-width] rounded border border-default bg-layer-0 p-8">
          <ListBox className="outline-none" items={items}>
            {(item) => (
              <ListBoxItem
                className="cursor-pointer rounded p-8 text-fg outline-none transition-colors hf:bg-[#ECEBFE] hf:text-fg-primary"
                id={item.id}
                textValue={item.name}
              >
                {({ isSelected }) => (
                  <div
                    className={`${isSelected ? "text-fg-primary" : ""} flex items-center justify-between`}
                  >
                    {item.name}
                    {isSelected && <CheckIcon size={20} />}
                  </div>
                )}
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      </Select>

      <SizeDisplay selection={selection} />
    </div>
  );
}
