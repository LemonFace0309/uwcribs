import Head from "next/head";
import { VFC } from "react";

type Props = {
  title: string;
  keywords: string;
  description: string;
  image: string;
};

export const Meta: VFC<Props> = ({ title, keywords, description, image }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image}></meta>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <title>{title}</title>
    </Head>
  );
};
