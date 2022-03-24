import { FC } from "react";

import cx from "classnames";

type Props = {
  className?: string;
};

export const Card: FC<Props> = ({ children, className }) => (
  <div className={cx(className, "text-navy-700 rounded-xl p-4 shadow-md")}>
    {children}
  </div>
);
