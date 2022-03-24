import React from "react";

import type { NextPage } from "next";

import { GetPostsDocument } from "@src/__generated__/graphql";
import { Posts } from "@src/components/posts";
import { addApolloState, initializeApollo } from "@src/lib/apollo-client";

const Search: NextPage = () => {
  return (
    <div className="w-full text-white grid place-items-center">
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
