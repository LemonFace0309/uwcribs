/* eslint-disable @next/next/no-img-element */
import { VFC } from "react";

import { useGetPostsQuery } from "@src/__generated__/graphql";
import { Post } from "@src/components/post";

export const Posts: VFC = () => {
  const { loading, error, data } = useGetPostsQuery();

  if (!data || loading || error) return null;

  return (
    <>
      {data.posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
};
