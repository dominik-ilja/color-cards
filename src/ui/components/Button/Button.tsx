import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import type { PolymorphicRef } from "@/types/polymorphic";

import type { ButtonComponent, ButtonProps } from "./types";

const Button: ButtonComponent = React.forwardRef(
  <Component extends React.ElementType = "button">(
    {
      as,
      children,
      variant = "default",
      className,
      ...props
    }: ButtonProps<Component>,
    ref: PolymorphicRef<Component>,
  ) => {
    const Component = as ?? "button";

    const buttonClasses = twMerge(
      clsx(
        "flex items-center rounded border px-16 py-8 font-medium transition-colors",
        variant === "primary" &&
          "border-transparent text-fg-on-primary hf:bg-primary-hover bg-primary",
        variant === "default" &&
          "hf:text-fg-primary border-default bg-default hf:border-primary",
        variant === "inverse" &&
          "hf:text-fg-on-primary text-fg-on-inverse border border-on-inverse bg-inverse hf:border-primary hf:bg-primary",
      ),
      className,
    );

    return (
      <Component className={buttonClasses} ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";

export default Button;
