import { FC } from "react";

import { Nav } from "./nav";

/**
 * Layout of the app
 */
export const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Nav />
      <main className="flex items-stretch flex-grow">{children}</main>
      <footer>Footer</footer>
    </div>
  );
};