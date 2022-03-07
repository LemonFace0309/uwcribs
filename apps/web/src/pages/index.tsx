import type { NextPage } from 'next';

import { Button } from '@root/ui/components';

const Home: NextPage = () => {
  return (
    <div className="w-full text-white grid place-items-center">
      <Button>Hello World</Button>
    </div>
  );
};

export default Home;
