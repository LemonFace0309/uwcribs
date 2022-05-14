import { Dispatch } from "react";

import { GetPostsQueryVariables } from "@src/__generated__/graphql";

export type SearchProps = NonNullable<GetPostsQueryVariables["options"]>;

export type SearchActionType =
  | {
      type: keyof SearchProps;
      value: string;
    }
  | { type: "clear" };

export type ContextProps = {
  state: SearchProps;
  dispatch: Dispatch<SearchActionType>;
};
