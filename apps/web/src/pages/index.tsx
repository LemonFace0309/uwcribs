import type { NextPage } from "next";

import { Button } from "@root/ui/components";
import styles from "@src/styles/pages/landing.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.root} />
      <div className={styles.textContainer}>
        <h1 className="text-6xl text-white">Find Your Dream Dorm in Seconds</h1>
        <Button
          className={styles.btn}
          href="/search"
          variant="rounded"
          size="lg">
          <span className="text-3xl">Start Now</span>
        </Button>
      </div>
    </>
  );
};

export default Home;
