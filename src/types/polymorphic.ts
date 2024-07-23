/**
 * The property that specifies what the root is for a polymorphic component
 *
 * @template T The polymorphic root component
 */
export type AsProp<T extends React.ElementType> = {
  as?: T;
};

/**
 * Used to retrieve the correct "ref" attribute for the polymorphic component.
 *
 * @template T The component who's ref we're trying to receive.
 */
export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"];

/**
 * Used to add properties to the provided "BaseProps". If any keys from
 * "OverrideProps" match with a key in "BaseProps", then the key in "OverrideProps"
 * will be used.
 *
 * @template BaseProps The props to be extend
 * @template OverrideProps The props that should be added to BaseProps
 */
export type ExtendProps<BaseProps = {}, OverrideProps = {}> = OverrideProps & Omit<BaseProps, keyof OverrideProps>;

/**
 * Used to dynamically retreive the props associated with the provided component.
 * Also adds the property "as" for creating polymorphic component and "children".
 *
 * @template T The component to retrieve props for
 */
export type PolymorphicProps<T extends React.ElementType = React.ElementType, Props = {}> = ExtendProps<
  React.ComponentPropsWithoutRef<T>,
  Props
> &
  AsProp<T> &
  React.PropsWithChildren<Props>;

/**
 * Used to dynamically retreive the props associated with the provided component.
 * It builds off of "PolymorphicProps" by adding the polymorphic "ref" prop.
 *
 * @template T The component to retreive props for
 */
export type PolymorphicPropsWithRef<T extends React.ElementType = React.ElementType, Props = {}> = PolymorphicProps<
  T,
  Props
> & { ref?: PolymorphicRef<T> };
