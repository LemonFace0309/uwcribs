/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";

import { Seperator } from "@root/ui/components";
import { useGetPostsQuery } from "@src/__generated__/graphql";
import { Post } from "@src/components/post";
import { getPostsSearchParams } from "@src/lib/search";

export const Posts = () => {
  const router = useRouter();

  const searchParams = useMemo(() => {
    return getPostsSearchParams(router.query);
  }, [router]);

  const { loading, error, data } = useGetPostsQuery({
    variables: { options: searchParams },
  });

  if (!data || loading || error) return null;

  return (
    <>
      {data.posts.map((post) => (
        <Fragment key={post.id}>
          <Post {...post} />
          <Seperator fullWidth />
        </Fragment>
      ))}
    </>
  );
};
