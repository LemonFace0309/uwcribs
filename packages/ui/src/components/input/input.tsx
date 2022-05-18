import React, { InputHTMLAttributes, ReactElement } from "react";

import cx from "classnames";

import styles from "./input.module.scss";

type Props = {
  labelClassName?: string;
  inputClassName?: string;
  name: string;
  label?: string;
  icon?: ReactElement;
  ref?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { name, label, icon, labelClassName, inputClassName, ...otherProps },
  ref
) {
  return (
    <label className={cx(styles.label, labelClassName)}>
      {label}
      {icon}
      <input
        className={cx(
          styles.input,
          { [styles.inputWithIcon]: icon },
          inputClassName
        )}
        {...otherProps}
        name={name}
        ref={ref}
      />
    </label>
  );
});
