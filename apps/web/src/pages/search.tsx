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
import { addApolloState, initializeApollo } from "@src/lib/apollo-client";
import styles from "@src/styles/pages/search.module.scss";

const Search: NextPage = () => {
  return (
    <Layout>
      <Tabs>
        <NavTabList />
        <TabPanel>
          <div className={styles.container}>
            <div className={styles.postsContainer}>
              <Posts />
            </div>
            {/* <Filter /> */}
            Test
          </div>
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo();

  let variables: GetPostsQueryVariables = {};
  if (ctx.query.beds && typeof ctx.query.beds === "string") {
    variables = {
      options: {
        availableBeds: parseInt(ctx.query.beds),
      },
    };
  }
  await apolloClient.query<GetPostsQuery, GetPostsQueryVariables>({
    query: GetPostsDocument,
    variables,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Search;
