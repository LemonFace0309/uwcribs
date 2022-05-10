import { Dispatch } from "react";

import { SeasonEnum } from "@prisma/client";

export type SearchProps = {
  season: SeasonEnum | undefined;
  availableBeds: number | undefined;
  baths: number | undefined;
};

export type SearchActionType = {
  type: keyof SearchProps;
  value: string;
};

export type ContextProps = {
  state: SearchProps;
  dispatch: Dispatch<SearchActionType>;
};
