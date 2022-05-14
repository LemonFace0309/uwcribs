import cloneDeep from "lodash/cloneDeep";

import { SeasonEnum } from "@src/__generated__/graphql";

import { SearchActionType, SearchProps } from "./types";
import { defaultSearchParams } from "./utils";

export const reducer = (
  state: SearchProps,
  action: SearchActionType
): SearchProps => {
  switch (action.type) {
    case "season":
      return { ...cloneDeep(state), season: action.value as SeasonEnum };
    case "availableBeds":
      return { ...cloneDeep(state), availableBeds: parseInt(action.value) };
    case "baths":
      return { ...cloneDeep(state), baths: parseInt(action.value) };
    case "clear":
      return cloneDeep(defaultSearchParams);
    default:
      throw new Error("Invalid action type");
  }
};
