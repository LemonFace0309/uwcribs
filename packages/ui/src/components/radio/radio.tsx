import { forwardRef } from "react";

import { RadioProps } from "./types";

import styles from "./radio.module.scss";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  props,
  ref
) {
  const {
    isDisabled = false,
    isChecked = false,
    isRequired,
    label,
    name,
    onChange = () => null,
    value,
    ...rest
  } = props;

  return (
    <label className={styles.label}>
      <input
        {...rest}
        className={styles.input}
        defaultChecked={isChecked}
        checked={isChecked}
        disabled={isDisabled}
        name={name}
        onChange={onChange}
        required={isRequired}
        type="radio"
        value={value}
        ref={ref}
      />
      {label ? <span>{label}</span> : null}
    </label>
  );
});
