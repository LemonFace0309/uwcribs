import { createContext, FC, ReactNode, useContext } from "react";

import { SeasonEnum } from "@prisma/client";

export type ContextProps = {
  season: SeasonEnum | undefined;
  availableBeds: number | undefined;
  baths: number | undefined;
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchContext = createContext<ContextProps>({
  season: undefined,
  availableBeds: undefined,
  baths: undefined,
});

export const SearchProvider: FC<{
  params: ContextProps;
  children: ReactNode;
}> = ({ params, children }) => {
  return (
    <SearchContext.Provider value={params}>{children}</SearchContext.Provider>
  );
};
