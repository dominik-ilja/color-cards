import { CheckIcon, ChevronDownIcon } from "lucide-react";
import React from "react";
import {
  Button as AriaButton,
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

type Props = {
  onSelectionChange: (key: Key) => void;
  selection: Key;
  selectionItems: { label: string; id: string }[];
};

export default function ColorSelect({
  onSelectionChange,
  selection,
  selectionItems,
}: Props) {
  return (
    <Select selectedKey={selection} onSelectionChange={onSelectionChange}>
      <Label hidden>Color Code</Label>
      <AriaButton className="select flex items-center gap-x-8 text-fg hf:text-fg-primary">
        <SelectValue className="mr-2" />
        <ChevronDownIcon aria-hidden size={16} />
      </AriaButton>
      <Popover
        className="min-w-[--trigger-width] rounded border border-default bg-layer-0 p-8"
        placement="bottom right"
      >
        <ListBox className="outline-none">
          {selectionItems.map(({ label, id }) => (
            <ListBoxItem
              className="cursor-pointer rounded p-8 text-fg outline-none transition-colors hf:bg-[#ECEBFE] hf:text-fg-primary"
              id={id}
              key={id}
              textValue={label}
            >
              {({ isSelected }) => (
                <div
                  className={`${isSelected ? "text-fg-primary" : ""} flex items-center justify-between gap-x-12`}
                >
                  {label}
                  {isSelected && <CheckIcon size={20} />}
                </div>
              )}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
