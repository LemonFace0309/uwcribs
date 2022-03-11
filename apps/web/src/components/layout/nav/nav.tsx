import Link from 'next/link';
import { VFC } from 'react';

import { Button, Logo } from '@root/ui/components';

export const Nav: VFC = () => {
  // const router = useRouter();

  return (
    <nav className="flex justify-between p-4">
      <Link href="/">
        <a>
          <Logo className="cursor-pointer transition hover:-rotate-3 hover:scale-105" />
        </a>
      </Link>
      <Button color="salmon" variant="rounded">
        Login
      </Button>
    </nav>
  );
};
