import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";

import { useApollo } from "@src/lib/apollo-client";
import { pageview } from "@src/lib/ga";

import "@root/ui/styles/variables.scss";
import "@src/styles/preflight.scss";
import "@src/styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
};

export default MyApp;
