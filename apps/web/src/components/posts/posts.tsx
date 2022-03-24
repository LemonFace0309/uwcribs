/* eslint-disable @next/next/no-img-element */
import { VFC } from 'react';

import { gql, useQuery } from '@apollo/client';

import { Post } from '@src/components/post';

export const ALL_POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      type
      title
      description
      imageUrl
      availableBeds
      totalBeds
      baths
      amenities
      ppp
      fbLink
      genderRestriction
    }
  }
`;

export const Posts: VFC = () => {
  const { loading, error, data } = useQuery(ALL_POSTS_QUERY);

  if (loading || error) return null;

  return data.posts.map((post) => <Post key={post.id} {...post} />);
};
