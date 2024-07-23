import React from "react";
import { Input, TextField } from "react-aria-components";

import Checkbox from "@/ui//components/Checkbox";

type Props = {
  showInput: boolean;
  onShowInputChange: (show: boolean) => void;
  value: string;
  onChange: (text: string) => void;
};

export default function CustomName(props: Props) {
  return (
    <div className="mb-20">
      <Checkbox
        className="mb-8"
        isSelected={props.showInput}
        onChange={props.onShowInputChange}
      >
        Use Custom Name
      </Checkbox>
      <TextField
        aria-label="Custom Name"
        value={props.value}
        onChange={props.onChange}
      >
        {props.showInput && <Input className="input" />}
      </TextField>
    </div>
  );
}
