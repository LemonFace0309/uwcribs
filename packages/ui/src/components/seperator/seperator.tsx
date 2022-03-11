import { VFC } from 'react';

import cx from "classnames";

type Props = {
  className?: string;
}

export const Seperator: VFC<Props> = ({ className }) => <div className={cx(className, "w-8 border bg-navy-100")} />;
