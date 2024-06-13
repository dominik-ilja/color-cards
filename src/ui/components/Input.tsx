import React from "react";

type Props = React.ComponentProps<"input"> & {
  leadingIcon?: string;
  trailingIcon?: string;
};

export default function Input({ leadingIcon, trailingIcon, ...props }: Props) {
  return (
    <div className="relative">
      <span className="text-muted input-icon input-leading-icon font-mono">
        {leadingIcon}
      </span>
      <input
        className={`outline-transparent h-8 w-full rounded-sm border border-default px-6 font-mono outline outline-1 hfv:outline-primary`}
        {...props}
      />
      <span className="text-muted input-icon input-trailing-icon font-mono">
        {trailingIcon}
      </span>
    </div>
  );
}
