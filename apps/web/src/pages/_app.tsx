import "@root/ui/styles/variables.css";
import 'styles/globals.css';

import { Layout } from '@src/components/layout';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
