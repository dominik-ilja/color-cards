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

import { SIZES } from "@/constants";

export type SizeOption = {
  name: string;
  id: string;
};

export const SIZE_DEFAULT: SizeOption = {
  name: "Default",
  id: SIZES.DEFAULT,
};

export const SIZE_OPTIONS: SizeOption[] = [
  { name: "Small", id: SIZES.SMALL },
  SIZE_DEFAULT,
  { name: "Large", id: SIZES.LARGE },
  { name: "x-Large", id: SIZES.XLARGE },
  { name: "2x-Large", id: SIZES["2XLARGE"] },
];

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
        className="select text-fg flex w-full flex-col"
        selectedKey={selection.id}
        onSelectionChange={(key) =>
          onSelectionChange(items.find((item) => item.id === key)!)
        }
      >
        <Label className="mb-8">Size</Label>
        <Button className="input">
          <SelectValue />
          <ChevronDownIcon size={20} />
        </Button>

        <Popover className="bg-layer-0 min-w-[--trigger-width] rounded border border-default p-8">
          <ListBox className="outline-none" items={items}>
            {(item) => (
              <ListBoxItem
                className="text-fg hf:bg-[#ECEBFE] hf:text-fg-primary cursor-pointer rounded p-8 outline-none transition-colors"
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
    </div>
  );
}
