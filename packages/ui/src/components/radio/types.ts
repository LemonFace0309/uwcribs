import { ReactNode } from "react";

// Used by RadioGroup
export type OptionPropType = {
  isDisabled?: boolean;
  label?: ReactNode;
  name?: string;
  value?: string;
};

export type OptionsPropType = Array<OptionPropType>;

export type RadioValue = string;

// If updating props in OwnProps, also update in ExtractReactTypeProps
type OwnProps = {
  /** Makes a `Radio` field unselectable when true. Overridden by `isDisabled` prop of `RadioGroup`. */
  isDisabled?: boolean;
  /** Marks this as a required field */
  isRequired?: boolean;
  /** Set the field as checked */
  isChecked?: boolean;
  /** The label value for the input rendered to the dom */
  label?: ReactNode;
  /** onChange event handler, passed into the props of each `Radio` Component instantiated within `RadioGroup` */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Field value */
  value?: RadioValue;
};

// Expose all props on a html input element
type Combine<First, Second> = Omit<First, keyof Second> & Second;
export type RadioProps = Combine<
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "aria-label" | "disabled" | "required" | "checked" | "value"
  >,
  OwnProps
>;
