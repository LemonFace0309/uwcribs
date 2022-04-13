/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { VFC } from "react";

import {
  GetPostsQueryVariables,
  useGetPostsQuery,
} from "@src/__generated__/graphql";
import { Post } from "@src/components/post";

export const Posts: VFC = () => {
  const router = useRouter();
  const { beds } = router.query;

  // Todo(Charles): abstract to hook later
  let variables: GetPostsQueryVariables = {};
  if (beds && typeof beds === "string") {
    variables = {
      options: {
        beds: parseInt(beds),
      },
    };
  }
  const { loading, error, data } = useGetPostsQuery({
    variables,
  });

  if (!data || loading || error) return null;

  return (
    <>
      {data.posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
};
