import React from "react";

type Props = React.ComponentProps<"input"> & {
  leadingIcon?: string;
  trailingIcon?: string;
};

export default function Input({ leadingIcon, trailingIcon, ...props }: Props) {
  return (
    <div className="relative">
      <span className="font-mono text-muted input-icon input-leading-icon">{leadingIcon}</span>
      <input className={`input w-full font-mono px-6`} {...props} />
      <span className="font-mono text-muted input-icon input-trailing-icon">{trailingIcon}</span>
    </div>
  );
}
