import { ParsedUrlQuery } from "querystring"; // from node

import { SeasonEnum } from "@src/__generated__/graphql";

import type { SearchProps } from "./types";

export const defaultSearchParams: SearchProps = {
  season: null,
  availableBeds: null,
  baths: null,
  priceMin: null,
  priceMax: null,
};

export const getSearchParams = (query: ParsedUrlQuery): SearchProps => {
  const searchParams = { ...defaultSearchParams };

  if (typeof query.season === "string") {
    searchParams.season = query.season as SeasonEnum;
  }
  if (typeof query.availableBeds === "string") {
    searchParams.availableBeds = parseInt(query.availableBeds);
  }
  if (typeof query.baths === "string") {
    searchParams.baths = parseInt(query.baths);
  }
  if (typeof query.priceMin === "string") {
    searchParams.priceMin = parseInt(query.priceMin);
  }
  if (typeof query.priceMax === "string") {
    searchParams.priceMax = parseInt(query.priceMax);
  }

  return searchParams;
};
