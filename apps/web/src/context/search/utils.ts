import { SeasonEnum } from "@prisma/client";
import { ParsedUrlQuery } from "querystring"; // from node

import type { SearchProps } from "./types";

export const getSearchParams = (query: ParsedUrlQuery): SearchProps => {
  return {
    season:
      typeof query.season === "string"
        ? (query.season as SeasonEnum)
        : undefined,
    availableBeds:
      typeof query.availableBeds === "string"
        ? parseInt(query.availableBeds)
        : undefined,
    baths: typeof query.baths === "string" ? parseInt(query.baths) : undefined,
  };
};
