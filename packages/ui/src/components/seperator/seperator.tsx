import { FC } from "react";

import cx from "classnames";

type Props = {
  className?: string;
  fullWidth?: boolean;
};

export const Seperator: FC<Props> = ({ className, fullWidth = false }) => (
  <div className={cx(className, { "w-8": !fullWidth }, "border bg-navy-100")} />
);
