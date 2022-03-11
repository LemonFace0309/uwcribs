import { VFC } from 'react';

import { Card } from "@root/ui/components/card";

type Props = {
  title: string;
  description: string;
  beds: number;
  baths: number;
  amenities: string[];
  ppp: number; // price per person
  fbLink: string;
};

export const Post: VFC<Props> = ({
  title,
  description,
  beds,
  baths,
  amenities,
  ppp,
  fbLink,
}) => <Card>test</Card>;
