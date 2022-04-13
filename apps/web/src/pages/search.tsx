import React from "react";

import type { GetServerSideProps, NextPage } from "next";

import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@src/__generated__/graphql";
import { Posts } from "@src/components/posts";
import { addApolloState, initializeApollo } from "@src/lib/apollo-client";
import styles from "@src/styles/pages/search.module.scss";

const Search: NextPage = () => {
  return (
    <div className={styles.postsContainer}>
      <Posts />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const apolloClient = initializeApollo();

  let variables: GetPostsQueryVariables = {};
  if (req.query.beds && typeof req.query.beds === "string") {
    variables = {
      options: {
        availableBeds: parseInt(req.query.beds),
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
