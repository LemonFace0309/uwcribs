import { SeasonEnum } from "@prisma/client";
import cloneDeep from "lodash/cloneDeep";

import { SearchProps } from "./types";

type ActionType = {
  type: keyof SearchProps;
  value: string;
};

export const reducer = (
  state: SearchProps,
  action: ActionType
): SearchProps => {
  switch (action.type) {
    case "season":
      return { ...cloneDeep(state), season: action.value as SeasonEnum };
    case "availableBeds":
      return { ...cloneDeep(state), availableBeds: parseInt(action.value) };
    case "baths":
      return { ...cloneDeep(state), baths: parseInt(action.value) };
    default:
      throw new Error("Invalid action type");
  }
};
