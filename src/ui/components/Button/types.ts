import type { PolymorphicPropsWithRef } from "@/types/polymorphic";

export type BaseButtonProps = {
  variant?: "primary" | "default" | "inverse";
  size?: "small" | "default" | "large";
};

export type ButtonProps<T extends React.ElementType = "button"> = PolymorphicPropsWithRef<T, BaseButtonProps>;

export type ButtonComponent = {
  <T extends React.ElementType = "span">(props: ButtonProps<T>): React.ReactNode;
  displayName?: string;
};
