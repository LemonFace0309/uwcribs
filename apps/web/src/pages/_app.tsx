import type { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";

import { Layout } from "@src/components/layout";
import { useApollo } from "@src/lib/apollo-client";

import "@root/ui/styles/variables.scss";
import "@src/styles/preflight.scss";
import "@src/styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default MyApp;
