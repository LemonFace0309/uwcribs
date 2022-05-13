import { useRouter } from "next/router";
import { FC } from "react";

import { Button } from "@root/ui/components";
import {
  BathroomsSelect,
  BedroomsSelect,
  SeasonRadio,
} from "@src/components/search/filter/lib";

export const Filter: FC = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold uppercase">Filter Results</p>
        <Button
          variant="text"
          color="blue"
          onClick={() => router.push("/search")}
          className="opacity-50 hover:opacity-100">
          Clear Filters
        </Button>
      </div>
      <SeasonRadio />
      <BedroomsSelect />
      <BathroomsSelect />
    </div>
  );
};
