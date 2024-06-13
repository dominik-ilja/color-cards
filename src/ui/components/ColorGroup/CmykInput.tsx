import convert from "color-convert";
import React, { useState } from "react";

import Input from "../Input";

type Props = {
  value: string;
  onChange: (arg0: string) => void;
};

export default function CmykInput(props: Props) {
  // const [c, setC] = useState("0");
  // const [m, setM] = useState("0");
  // const [y, setY] = useState("0");
  // const [k, setK] = useState("0");

  // parse hex to cmyk
  const [c, m, y, k] = convert.hex.cmyk(props.value);

  console.log({ c, m, y, k });

  // function handleChange(setState: any) {
  //   return (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setState(e.target.value);
  //   };
  // }

  return (
    <div className="flex gap-x-1">
      <Input
        value={c}
        onChange={(e) => {
          let value = parseFloat(e.target.value);

          if (Number.isNaN(value)) {
            value = 0;
          } else if (value > 100) {
            value = 100;
          } else if (value < 0) {
            value = 0;
          }

          const hex = convert.cmyk.hex([value, m, y, k]);
          props.onChange(hex);
        }}
        type="number"
        min={0}
        max={100}
        leadingIcon="C"
        trailingIcon="%"
      />
      <Input
        value={m}
        onChange={(e) => {
          let value = parseFloat(e.target.value);

          if (Number.isNaN(value)) {
            value = 0;
          } else if (value > 100) {
            value = 100;
          } else if (value < 0) {
            value = 0;
          }

          const hex = convert.cmyk.hex([c, value, y, k]);
          props.onChange(hex);
        }}
        type="number"
        min={0}
        max={100}
        leadingIcon="M"
        trailingIcon="%"
      />
      <Input
        value={y}
        onChange={(e) => {
          let value = parseFloat(e.target.value);

          if (Number.isNaN(value)) {
            value = 0;
          } else if (value > 100) {
            value = 100;
          } else if (value < 0) {
            value = 0;
          }

          const hex = convert.cmyk.hex([c, m, value, k]);
          props.onChange(hex);
        }}
        type="number"
        min={0}
        max={100}
        leadingIcon="Y"
        trailingIcon="%"
      />
      <Input
        value={k}
        onChange={(e) => {
          let value = parseFloat(e.target.value);

          if (Number.isNaN(value)) {
            value = 0;
          } else if (value > 100) {
            value = 100;
          } else if (value < 0) {
            value = 0;
          }

          const hex = convert.cmyk.hex([c, m, y, value]);
          props.onChange(hex);
        }}
        type="number"
        min={0}
        max={100}
        leadingIcon="K"
        trailingIcon="%"
      />
    </div>
  );
}
