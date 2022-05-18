import { ParsedUrlQuery } from "querystring"; // from node

import { SeasonEnum } from "@src/__generated__/graphql";
import type { SearchProps } from "@src/context/search/types";

// Todo(Charles): Refactor to max more scalable
export const getPostsSearchParams = (query: ParsedUrlQuery): SearchProps => {
  return {
    season:
      typeof query.season === "string" ? (query.season as SeasonEnum) : null,
    availableBeds:
      typeof query.availableBeds === "string"
        ? parseInt(query.availableBeds)
        : null,
    baths: typeof query.baths === "string" ? parseInt(query.baths) : null,
    priceMin:
      typeof query.priceMin === "string" ? parseInt(query.priceMin) : null,
    priceMax:
      typeof query.priceMax === "string" ? parseInt(query.priceMax) : null,
  };
};
