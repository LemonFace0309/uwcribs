import { useRouter } from "next/router";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { reducer } from "./reducer";
import { ContextProps, SearchProps } from "./types";
import { defaultSearchParams } from "./utils";

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchContext = createContext<ContextProps>({
  state: defaultSearchParams,
  dispatch: () => null,
});

export const SearchProvider: FC<{
  params: SearchProps;
  children: ReactNode;
}> = ({ params, children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, params);

  // update query string on state update
  useEffect(() => {
    const query: Record<string, string> = {};
    for (const [key, value] of Object.entries(state)) {
      if (!value) continue;
      query[key] = value.toString();
    }
    router.push(
      { href: "/search", query },
      { href: "/search", query },
      { scroll: false }
    );
  }, [state]);

  const value = {
    state,
    dispatch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
