import { FC } from "react";

import { BiDollar } from "react-icons/bi";

import { Button, Input, Seperator } from "@root/ui/components";

export const PriceRangeInput: FC = () => {
  return (
    <>
      <p className="mt-10 mb-4 text-sm font-bold">Price Range</p>
      <div className="flex">
        <Input
          name="min"
          placeholder="Min"
          icon={<BiDollar />}
          labelClassName="mr-3"
          inputClassName="w-24"
        />
        <Input
          name="max"
          placeholder="Max"
          icon={<BiDollar />}
          labelClassName="mr-3"
          inputClassName="w-24"
        />
        <Button>Go</Button>
      </div>
      <Seperator fullWidth className="mt-10" />
    </>
  );
};
