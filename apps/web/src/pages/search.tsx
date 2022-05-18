import React from "react";

import type { GetServerSideProps, NextPage } from "next";
import { TabPanel, Tabs } from "react-tabs";

import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@src/__generated__/graphql";
import { Layout } from "@src/components/layout";
import { Meta } from "@src/components/meta";
import { Posts } from "@src/components/posts";
import { Filter, FilterModal } from "@src/components/search/filter";
import { NavTabList } from "@src/components/search/nav-tab-list";
import { SearchProps, SearchProvider } from "@src/context/search";
import { addApolloState, initializeApollo } from "@src/lib/apollo-client";
import { getPostsSearchParams } from "@src/lib/search";
import styles from "@src/styles/pages/search.module.scss";

const Search: NextPage<{ searchParams: SearchProps }> = ({ searchParams }) => {
  return (
    <>
      <Meta title="UW Cribs" keywords={["search"]} />
      <Layout withBackground>
        <SearchProvider params={searchParams}>
          <Tabs>
            {/* Avoids React Tabs from throwing an error with inequal number of Tab and TabPanel components */}
            {NavTabList({})}

            <TabPanel>
              {/* Present only on Tablet/Mobile */}
              <FilterModal />
              <div className={styles.container}>
                <div className={styles.postsContainer}>
                  <Posts />
                </div>
                <div className="hidden 2xl:block">
                  <Filter />
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </SearchProvider>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo();

  const searchParams = getPostsSearchParams(ctx.query);

  await apolloClient.query<GetPostsQuery, GetPostsQueryVariables>({
    query: GetPostsDocument,
    variables: { options: searchParams },
  });

  return addApolloState(apolloClient, {
    props: {
      searchParams: searchParams,
    },
  });
};

export default Search;
