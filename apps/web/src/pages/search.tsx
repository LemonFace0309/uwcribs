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
