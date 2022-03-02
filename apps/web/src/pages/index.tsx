import { Button } from '@root/ui/components';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen text-white grid place-items-center">
      <Button>Hello World</Button>
    </div>
  );
};

export default Home;
