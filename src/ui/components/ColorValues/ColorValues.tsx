import React from "react";
import { CheckboxGroup, Label } from "react-aria-components";

import Checkbox from "@/ui/components/Checkbox";

type Props = {
  colors: any;
  items: { label: string; id: string }[];
  onChange: (selected: string[]) => void;
  value: string[];
};

function format(value: string | number[]) {
  if (Array.isArray(value)) {
    return `(${value.map(String).join(", ")})`;
  }
  return "#" + value;
}

export default function ColorValues({ colors, items, onChange, value }: Props) {
  const entries = Object.entries(colors);

  return (
    <CheckboxGroup
      className="mb-16 flex flex-col items-start"
      value={value}
      onChange={onChange}
    >
      <Label className="mb-8">Color Values</Label>
      <div className="flex flex-col gap-y-4">
        {items.map(({ label, id }) => (
          <Checkbox key={id} value={id}>
            {label}{" "}
            <div className="text-sm text-fg-muted">
              {format(
                entries.find(([key]) => key === id)![1] as string | number[],
              )}
            </div>
          </Checkbox>
        ))}
      </div>
    </CheckboxGroup>
  );
}
