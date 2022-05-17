import Head from "next/head";
import { FC } from "react";

type Props = {
  title?: string;
  keywords?: string[];
  description?: string;
  image?: string;
};

export const Meta: FC<Props> = ({ title, keywords, description, image }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      {keywords && <meta name="keywords" content={keywords.join(" ")} />}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
        </>
      )}
      {image && <meta name="og:image" content={image} />}
      {title && (
        <>
          <meta name="og:title" content={title} />
          <title>{title}</title>
        </>
      )}
    </Head>
  );
};
