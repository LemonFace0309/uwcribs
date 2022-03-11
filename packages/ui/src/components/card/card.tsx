import { FC } from "react";

import cx from "classnames";

type Props = {
  className?: string;
}

export const Card: FC<Props> = ({ children, className }) => (<div className={cx(className, "rounded-xl")}>{children}</div>)