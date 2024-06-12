import React, { useState } from "react";
import { Checkbox, CheckboxGroup } from "react-aria-components";

const options = [
  { label: "Hex", value: "hex" },
  { label: "RGB", value: "rgb" },
  { label: "HSL", value: "hsl" },
  { label: "HSB", value: "hsb" },
  { label: "CMYK", value: "cmyk" },
];

export default function ColorCodesCheckGroup() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <fieldset className="m-0 border-none p-0">
      <legend className="label mb-2 px-0">Color Values</legend>
      <CheckboxGroup>
        {options.map(({ label, value }) => (
          <Checkbox key={value} value={value}>
            {label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </fieldset>
  );
}

/*
          <div key={label}>
            <input className="checkbox m-0 mr-3" type="checkbox" id={label} />
            <label className="label" htmlFor={label}>
              {label}
            </label>
          </div>
*/
