import type { NextPage } from "next";

import { Button } from "@root/ui/components";
import styles from "@src/styles/pages/landing.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      {/* <Button href="/search">Search</Button> */}
    </div>
  );
};

export default Home;
