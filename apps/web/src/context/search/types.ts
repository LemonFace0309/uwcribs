import { Dispatch } from "react";

import { SeasonEnum } from "@prisma/client";

export type SearchProps = {
  season?: SeasonEnum | null;
  availableBeds?: number | null;
  baths?: number | null;
};

export type SearchActionType = {
  type: keyof SearchProps;
  value: string;
};

export type ContextProps = {
  state: SearchProps;
  dispatch: Dispatch<SearchActionType>;
};
