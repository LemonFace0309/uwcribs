import React from "react";

import type { GetServerSideProps, NextPage } from "next";

import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@src/__generated__/graphql";
import { Posts } from "@src/components/posts";
import { Filter } from "@src/components/search/filter";
import { addApolloState, initializeApollo } from "@src/lib/apollo-client";
import styles from "@src/styles/pages/search.module.scss";

const Search: NextPage = () => {
  return (
    <div className={styles.root}>
      <Filter />
      <div className={styles.postsContainer}>
        <Posts />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.time("ssr");
  const apolloClient = initializeApollo();
  console.timeLog("ssr");

  let variables: GetPostsQueryVariables = {};
  if (ctx.query.beds && typeof ctx.query.beds === "string") {
    variables = {
      options: {
        availableBeds: parseInt(ctx.query.beds),
      },
    };
  }
  console.timeLog("ssr");
  await apolloClient.query<GetPostsQuery, GetPostsQueryVariables>({
    query: GetPostsDocument,
    variables,
  });
  console.timeEnd("ssr");

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Search;
