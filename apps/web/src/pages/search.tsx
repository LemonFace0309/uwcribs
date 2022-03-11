import type { NextPage } from 'next';

import { Post } from '@src/components/post';

const Search: NextPage = () => {
  return (
    <div className="w-full text-white grid place-items-center">
      <Post
        type="Entire Rental Unit"
        title="Icon Apartment"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet felis, purus,  mauris in tellus dignissim nisl. At id tempus fermentum... more"
        imageURL="https://cdn.spongebobwiki.org/thumb/3/32/Squidward%27s_house_Scavenger_Pants.png/1200px-Squidward%27s_house_Scavenger_Pants.png"
        availableBeds={3}
        totalBeds={4}
        baths={3}
        amenities={['Wifi', 'Gym', 'Pool', 'Utilities Included']}
        ppp={800}
        fbLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        genderRestriction="Cooed"
      />
    </div>
  );
};

export default Search;
