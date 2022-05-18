import { FC } from "react";

import { Button } from "@root/ui/components";
import {
  BathroomsSelect,
  BedroomsSelect,
  PriceRangeInput,
  SeasonRadio,
} from "@src/components/search/filter/lib";
import { useSearchContext } from "@src/context/search";

export const Filter: FC = () => {
  const { dispatch } = useSearchContext();

  return (
    <div className="sticky top-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold uppercase">Filter Results</p>
        <Button
          variant="text"
          color="blue"
          onClick={() =>
            dispatch({
              type: "clear",
            })
          }
          className="opacity-50 hover:opacity-100">
          Clear Filters
        </Button>
      </div>
      <SeasonRadio />
      <BedroomsSelect />
      <BathroomsSelect />
      {/* WIP(Charles) */}
      <PriceRangeInput />
    </div>
  );
};
