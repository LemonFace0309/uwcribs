import { FC } from "react";

import { BedroomsSelect } from "@src/components/search/filter/bedrooms-select";

export const Filter: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-4 md:flex-row">
      <span className="md:text-3xl">I want a </span>
      <BedroomsSelect />
      <span className="md:text-3xl">bedroom unit</span>
    </div>
  );
};
