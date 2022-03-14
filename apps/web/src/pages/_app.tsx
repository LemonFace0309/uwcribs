import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { Layout } from '@src/components/layout';

import '@root/ui/styles/variables.scss';
import 'styles/preflight.scss';
import 'styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;
