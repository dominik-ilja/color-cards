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
      className,
      size = "default",
      variant = "default",
      ...props
    }: ButtonProps<Component>,
    ref: PolymorphicRef<Component>,
  ) => {
    const Component = as ?? "button";

    const buttonClasses = twMerge(
      clsx(
        "flex h-10 items-center justify-center rounded-md border px-6 py-2 font-medium transition-colors",
        variant === "primary" &&
          "hfv:bg-primary-dark bg-primary text-fg-on-primary border-transparent",
        variant === "default" &&
          "hover-focus-visible:text-fg-primary-dark hover-focus-visible:border-primary-dark border-default bg-default",
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
