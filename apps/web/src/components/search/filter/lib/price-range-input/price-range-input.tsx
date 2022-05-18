import { FC, useEffect, useState } from "react";

import { BiDollar } from "react-icons/bi";

import { Button, Input, Seperator } from "@root/ui/components";
import { useSearchContext } from "@src/context/search";

export const PriceRangeInput: FC = () => {
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const { state, dispatch } = useSearchContext();

  const applyFilterHandler = () => {
    if (priceMin && !isNaN(Number(priceMin))) {
      dispatch({
        type: "priceMin",
        value: priceMin,
      });
    }
    if (priceMax && !isNaN(Number(priceMin))) {
      dispatch({
        type: "priceMax",
        value: priceMax,
      });
    }
  };

  useEffect(() => {
    setPriceMin(state.priceMin ? state.priceMin.toString() : "");
  }, [state.priceMin]);

  useEffect(() => {
    setPriceMax(state.priceMax ? state.priceMax.toString() : "");
  }, [state.priceMax]);

  return (
    <>
      <p className="mt-10 mb-4 text-sm font-bold">Price Range</p>
      <div className="flex">
        <Input
          name="min"
          placeholder="Min"
          type="number"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          icon={<BiDollar />}
          labelClassName="mr-3"
          inputClassName="w-24"
        />
        <Input
          name="max"
          placeholder="Max"
          type="number"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          icon={<BiDollar />}
          labelClassName="mr-3"
          inputClassName="w-24"
        />
        <Button onClick={applyFilterHandler}>Apply</Button>
      </div>
      <Seperator fullWidth className="mt-10" />
    </>
  );
};
