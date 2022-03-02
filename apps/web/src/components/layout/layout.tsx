import { FC } from "react";

export const Layout: FC = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};