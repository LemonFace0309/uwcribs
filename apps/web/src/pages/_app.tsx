import type { AppProps } from 'next/app';

import { Layout } from '@src/components/layout';

import "@root/ui/styles/variables.css";
import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
