import { VFC } from "react";

import { BedroomsSelect } from "@src/components/search/filter/bedrooms-select";

export const Filter: VFC = () => {
  return (
    <div className="flex items-center justify-center w-full mb-4">
      <span className="text-3xl">I want a </span>
      <BedroomsSelect />
      <span className="text-3xl">bedroom unit</span>
    </div>
  );
};
