import "./Checkbox.css";

import clsx from "clsx";
import { CheckIcon } from "lucide-react";
import React from "react";
import type { CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import { Checkbox as AriaCheckbox } from "react-aria-components";

function FakeCheckboxInput() {
  return (
    <div className="checkbox-input">
      <CheckIcon strokeWidth={3} />
    </div>
  );
}

type CheckboxProps = AriaCheckboxProps & { labelPosition?: "right" | "left" };

export default function Checkbox({
  children,
  className,
  labelPosition = "right",
  ...props
}: CheckboxProps) {
  return (
    <AriaCheckbox
      className={clsx("checkbox", className && className)}
      {...props}
    >
      <>
        {labelPosition === "right" && <FakeCheckboxInput />}
        {children}
        {labelPosition === "left" && <FakeCheckboxInput />}
      </>
    </AriaCheckbox>
  );
}
