import { VFC } from 'react';

import { Button, Logo } from '@root/ui/components';

export const Nav: VFC = () => (
  <nav className="flex justify-between p-4">
    <Logo className="cursor-pointer transition hover:-rotate-3 hover:scale-105" onClick={() => null} />
    <Button color="salmon" variant="rounded">Login</Button>
  </nav>
);
