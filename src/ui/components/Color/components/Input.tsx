import React from "react";
import { Input as AriaInput, type InputProps } from "react-aria-components";

type Props = InputProps & {
  leadingIcon?: string;
  trailingIcon?: string;
};

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute top-[14px] w-16 text-center font-monospace text-sm leading-none text-fg-muted ${className}`}
    >
      {name}
    </span>
  );
}

export default function Input({
  leadingIcon,
  trailingIcon,
  className = "",
  ...props
}: Props) {
  return (
    <div className="relative">
      {leadingIcon && <Icon className="left-4" name={leadingIcon} />}
      <AriaInput
        className={`input font-mono h-40 w-full border-default ${className}`}
        style={{
          paddingLeft: leadingIcon ? 20 : "",
          paddingRight: leadingIcon ? 20 : "",
        }}
        {...props}
      />
      {trailingIcon && <Icon className="right-4" name={trailingIcon} />}
    </div>
  );
}
