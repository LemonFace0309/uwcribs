import React from "react";

import type { GetServerSideProps, NextPage } from "next";
import { TabPanel, Tabs } from "react-tabs";

import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@src/__generated__/graphql";
import { Layout } from "@src/components/layout";
import { Posts } from "@src/components/posts";
import { Filter } from "@src/components/search/filter";
import { NavTabList } from "@src/components/search/nav-tab-list";
import { SearchProps, SearchProvider } from "@src/context/search";
import { addApolloState, initializeApollo } from "@src/lib/apollo-client";
import styles from "@src/styles/pages/search.module.scss";

const Search: NextPage<{ searchParams: SearchProps }> = ({ searchParams }) => {
  return (
    <Layout>
      <SearchProvider params={searchParams}>
        <Tabs>
          {/* Avoids React Tabs from throwing an error with inequal number of Tab and TabPanel components */}
          {NavTabList({})}
          <TabPanel>
            <div className={styles.container}>
              <div className={styles.postsContainer}>
                <Posts />
              </div>
              <Filter />
            </div>
          </TabPanel>
        </Tabs>
      </SearchProvider>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo();

  // let variables: GetPostsQueryVariables = {};
  // if (ctx.query.beds && typeof ctx.query.beds === "string") {
  //   variables = {
  //     options: {
  //       availableBeds: parseInt(ctx.query.beds),
  //     },
  //   };
  // }
  // await apolloClient.query<GetPostsQuery, GetPostsQueryVariables>({
  //   query: GetPostsDocument,
  //   variables,
  // });

  return addApolloState(apolloClient, {
    props: {
      searchParams: ctx.query,
    },
  });
};

export default Search;
