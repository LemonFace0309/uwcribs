import React, { ChangeEvent, useCallback, useState } from "react";

import { Radio } from "./radio";
import { OptionPropType, OptionsPropType, RadioValue } from "./types";

import styles from "./radio.module.scss";

export interface RadioGroupProps {
  /** Once set, controls the selected value on the `RadioGroup` */
  value?: RadioValue | null;
  /** Sets the initial selected value on the `RadioGroup` */
  defaultValue?: RadioValue | null;
  /** Sets the disabled state of all `Radio` elements in the group. Overrides the `isDisabled` setting of all child `Radio` items. */
  isDisabled?: boolean;
  /** Marks this as a required field */
  isRequired?: boolean;
  /** An array of objects, each object is mapped onto a `Radio` element within the group. Name must be unique to the group. */
  options: OptionsPropType;
  /** Function that gets after each change event */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Sets the `name` prop on each of the `Radio` elements in the group */
  name?: string;
}

const noOptions: OptionsPropType = [];

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    onChange,
    options = noOptions,
    value: propValue,
    defaultValue,
    isDisabled,
    isRequired,
    name,
  } = props;

  const [selectedValue, setSelectedValue] = useState<
    RadioValue | undefined | null
  >(propValue !== undefined ? propValue : defaultValue);

  const onRadioChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.currentTarget.value);
      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  // If propValue is provided than act as a controlled component
  // If not then act as an uncontrolled component using the value from state
  const value = typeof propValue !== "undefined" ? propValue : selectedValue;
  return (
    <div role="radiogroup" className={styles.group}>
      {options.map(({ ...optionProps }: OptionPropType, index: number) => {
        if (typeof isDisabled !== "undefined") {
          optionProps.isDisabled = isDisabled;
        }
        const isChecked = value != null && optionProps.value === value;
        return (
          <Radio
            {...optionProps}
            name={name || optionProps.name}
            key={index}
            onChange={onRadioChange}
            isChecked={isChecked}
            isRequired={isRequired}
          />
        );
      })}
    </div>
  );
};
