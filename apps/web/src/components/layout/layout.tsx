import { FC, ReactElement } from "react";

import { Nav } from "./nav";

type Props = {
  tabs?: ReactElement[];
};

/**
 * Layout of the app
 */
export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-sea-300">
        <div className="m-auto max-w-7xl">
          <Nav />
        </div>
      </div>
      <main className="flex-grow">{children}</main>
      <footer>Footer</footer>
    </div>
  );
};
