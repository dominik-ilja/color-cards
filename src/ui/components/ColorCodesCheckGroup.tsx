import React from "react";

const options = [
  { label: "Hex" },
  { label: "RGB" },
  { label: "HSL" },
  { label: "HSB" },
  { label: "CMYK" },
];

export default function ColorCodesCheckGroup() {
  return (
    <fieldset className="m-0 border-none p-0">
      <legend className="label mb-2 px-0">Color Values</legend>
      {options.map(({ label }) => {
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
