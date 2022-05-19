/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

import cx from "classnames";
import startCase from "lodash/startCase";
import { FaBed } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";

import { Button, Seperator } from "@root/ui/components";
import { GetPostsQuery } from "@src/__generated__/graphql";
import { Unwrap } from "@src/lib/types";

import { Ribbon } from "./ribbon";

type Props = Unwrap<GetPostsQuery["posts"]>;

const isValidPPP = (ppp: number | undefined | null) => {
  return ppp && ppp < 2500 && ppp > 200;
};

export const Post: FC<Props> = ({
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
    <div className="flex flex-col items-center max-w-4xl mx-auto my-4 md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div className="relative w-full overflow-hidden rounded-xl shrink-0 md:w-[300px] h-[216px]">
        <Ribbon>{genderRestriction}</Ribbon>
        <img
          alt={`Image of ${startCase(type)} at ${title}`}
          src={
            imageUrl ||
            "https://cdn.spongebobwiki.org/thumb/3/32/Squidward%27s_house_Scavenger_Pants.png/1200px-Squidward%27s_house_Scavenger_Pants.png"
          }
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="w-full break-words">
        <p className="text-xs font-extralight">{startCase(type)}</p>
        <h1 className="text-xl">{title || "Icon Apartment"}</h1>
        <Seperator className="my-2" />
        <div className="mb-2 space-x-2">
          {Array.from(Array(totalBeds).keys()).map((i) => (
            <FaBed
              key={i}
              className={cx("inline-block", {
                "text-salmon-500": i + 1 <= availableBeds,
              })}
            />
          ))}
        </div>
        <div>
          <p className="text-xs font-light">{`${availableBeds} beds • ${baths} baths`}</p>
          <p className="text-xs font-light">{amenities.join(" • ")}</p>
        </div>
        <p className="my-4 text-xs font-light break-words whitespace-pre-line">
          {description}
        </p>
        <div className="flex items-center justify-between w-full">
          <p className="text-xl font-bold">
            {isValidPPP(ppp)
              ? `$${ppp}/month per person`
              : `Contact Seller for Price →`}
          </p>
          <Button
            variant="rounded-outline"
            color="sea"
            size="sm"
            className="flex items-center"
            onClick={() => window.open(fbLink, "_blank")}>
            <GrFacebook className="inline-block h-8 mr-2" size="16px" />
            <p className="inline text-xs">Contact Seller</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
