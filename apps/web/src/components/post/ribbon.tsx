import { FC, ReactNode } from "react";

import styles from "./post.module.scss";

type Props = {
  children?: ReactNode;
};

export const Ribbon: FC<Props> = ({ children }) => {
  return <div className={styles.ribbon}>{children}</div>;
};
