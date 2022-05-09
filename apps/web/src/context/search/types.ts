import { Dispatch } from "react";

import { SeasonEnum } from "@prisma/client";

export type ContextProps = {
  state: SearchProps;
  dispatch: Dispatch<any>;
};

export type SearchProps = {
  season: SeasonEnum | undefined;
  availableBeds: number | undefined;
  baths: number | undefined;
};
