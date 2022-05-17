import React, { InputHTMLAttributes, ReactNode } from "react";

import cx from "classnames";

import styles from "./input.module.scss";

type Props = {
  labelClassName?: string;
  inputClassName?: string;
  name: string;
  icon?: ReactNode;
  label?: string;
  ref?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { name, label, labelClassName, inputClassName, ...otherProps },
  ref
) {
  return (
    <label className={cx(styles.label, labelClassName)}>
      {label}
      <input
        className={cx(styles.input, inputClassName)}
        {...otherProps}
        name={name}
        ref={ref}
      />
    </label>
  );
});
