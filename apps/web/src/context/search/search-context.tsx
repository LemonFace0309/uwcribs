import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from "react";

import { reducer } from "./reducer";
import { ContextProps, SearchProps } from "./types";

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchContext = createContext<ContextProps>({
  state: {
    season: undefined,
    availableBeds: undefined,
    baths: undefined,
  },
  dispatch: () => null,
});

export const SearchProvider: FC<{
  params: SearchProps;
  children: ReactNode;
}> = ({ params, children }) => {
  const [state, dispatch] = useReducer(reducer, params);

  const value = {
    state,
    dispatch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
