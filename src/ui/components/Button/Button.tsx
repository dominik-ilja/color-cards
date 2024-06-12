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
        "flex h-10 items-center justify-center rounded-md border px-6 py-2 font-medium outline-offset-2 transition-colors hfv:outline-primary",
        variant === "primary" &&
          "border-transparent bg-primary text-fg-on-primary hfv:bg-primary-dark",
        variant === "default" &&
          "bg-default border-default hfv:border-primary hfv:bg-primary-lightest hfv:text-fg-primary",
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
