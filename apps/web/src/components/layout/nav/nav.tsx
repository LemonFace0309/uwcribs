import Link from 'next/link';
import { VFC } from 'react';

import { Logo } from '@root/ui/components';

import { AuthButton } from './auth-button';

export const Nav: VFC = () => {

  return (
    <nav className="flex justify-between p-4">
      <Link href="/">
        <a>
          <Logo className="cursor-pointer transition hover:-rotate-3 hover:scale-105" />
        </a>
      </Link>
      <AuthButton />
    </nav>
  );
};
