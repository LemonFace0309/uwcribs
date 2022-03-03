import { FC } from "react";

/**
 * Layout of the page
 */
export const Layout: FC = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};