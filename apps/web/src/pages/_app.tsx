import type { AppProps } from 'next/app';

import { Layout } from '@src/components/layout';

import "@root/ui/styles/variables.scss";
import 'styles/preflight.scss';
import 'styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
