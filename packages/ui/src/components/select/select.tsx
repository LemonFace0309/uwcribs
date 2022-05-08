import { Fragment, useMemo, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiSelector } from "react-icons/hi";

type OptionPropType = { label: string; value: string };

type SelectValue = string;

type Props = {
  value?: SelectValue;
  defaultValue?: SelectValue;
  onChange?: (val?: SelectValue) => void;
  options: Array<OptionPropType>;
};

export const Select = ({
  value: propValue,
  defaultValue,
  onChange,
  options,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<
    SelectValue | undefined | null
  >(propValue !== undefined ? propValue : defaultValue);

  // If propValue is provided than act as a controlled component
  // If not then act as an uncontrolled component using the value from state
  const value = typeof propValue !== "undefined" ? propValue : selectedValue;
  const label = useMemo(() => {
    const value = typeof propValue !== "undefined" ? propValue : selectedValue;
    return options.find((option) => option.value === value)?.label;
  }, [options, propValue, selectedValue]);
  return (
    <Listbox value={value} onChange={onChange ?? setSelectedValue}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block font-medium truncate">{label}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HiSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={option.value}>
                {({ selected }) => (
                  <>
                    <span className="block font-medium truncate">
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <HiCheck className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
