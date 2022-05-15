import { FC, ReactElement, ReactNode } from "react";

import cx from "classnames";

import { Nav } from "./nav";

import styles from "./layout.module.scss";

type Props = {
  children?: ReactNode;
  tabs?: ReactElement[];
  withBackground?: boolean;
};

/**
 * Layout of the app
 */
export const Layout: FC<Props> = ({ children, withBackground }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-sea-300">
        <div className="m-auto max-w-7xl">
          <Nav />
        </div>
      </div>
      <main className={cx("flex-grow", { [styles.bg]: withBackground })}>
        {children}
      </main>
      <footer></footer>
    </div>
  );
};
