import Image from "next/image";

import type { NextPage } from "next";

import { Button } from "@root/ui/components";
import styles from "@src/styles/pages/landing.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Image
        src="/landing.png"
        alt="landing page background"
        layout="fill"
        objectFit="cover"
        objectPosition="center center"
        loading="eager"
      />
      <div className={styles.backdrop} />
      <div className={styles.textContainer}>
        <span>
          <span>
            <span>
              <h1 className="text-6xl text-white">
                Find Your Perfect Dorm in Seconds
              </h1>
              <Button
                className={styles.btn}
                href="/search"
                variant="rounded"
                size="lg">
                <span className="text-3xl">Start Now</span>
              </Button>
            </span>
          </span>
        </span>
      </div>
    </>
  );
};

export default Home;
