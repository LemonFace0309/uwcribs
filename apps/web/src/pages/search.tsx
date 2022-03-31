import React from "react";

import type { NextPage } from "next";

import { GetPostsDocument } from "@src/__generated__/graphql";
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

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetPostsDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Search;
