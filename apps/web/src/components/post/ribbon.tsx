import { FC } from "react";

import styles from "./post.module.scss";

export const Ribbon: FC = ({ children }) => {
  return <div className={styles.ribbon}>{children}</div>;
};
