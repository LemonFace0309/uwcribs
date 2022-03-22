/* eslint-disable @next/next/no-img-element */
import { VFC } from 'react';

import cx from 'classnames';
import { FaBed } from 'react-icons/fa';

import { Card } from '@root/ui/components/card';
import { Seperator } from '@root/ui/components/seperator';

type Props = {
  type: 'Entire Rental Unit' | 'Shared Rental Unit';
  title: string;
  description: string;
  imageUrl: string;
  availableBeds: number;
  totalBeds: number;
  baths: number;
  amenities: string[];
  ppp: number; // price per person
  fbLink: string;
  genderRestriction: 'Cooed' | 'Male' | 'Female';
};

export const Post: VFC<Props> = ({
  type,
  title,
  description,
  imageUrl,
  availableBeds,
  totalBeds,
  baths,
  amenities,
  ppp,
  fbLink,
  genderRestriction,
}) => {
  return (
    <Card className="flex flex-col items-center max-w-3xl md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <img
        alt={`Image of ${type} at ${title}`}
        src={imageUrl}
        className="object-cover object-center w-full md:w-[300px] h-[216px]"
      />
      <div>
        <p className="text-xs font-extralight">{type}</p>
        <h1 className="text-xl">{title}</h1>
        <Seperator className="my-2" />
        <div className="mb-2 space-x-2">
          {Array.from(Array(totalBeds).keys()).map((i) => (
            <FaBed
              key={i}
              className={cx('inline-block', {
                'text-salmon-500': i + 1 <= availableBeds,
              })}
            />
          ))}
        </div>
        <div>
          <p className="text-xs font-light">{`${availableBeds} beds • ${baths} baths`}</p>
          <p className="text-xs font-light">{amenities.join(' • ')}</p>
        </div>
        <p className="my-4 text-xs font-light">{description}</p>
        <div className="flex space-between">
          <p className="text-xl font-bold">{`$${ppp}/month per person`}</p>
          {/* <Button variant="outline" color="sea">
            <GrFacebook className="inline-block mr-1" />Contact Seller
          </Button> */}
        </div>
      </div>
    </Card>
  );
};
