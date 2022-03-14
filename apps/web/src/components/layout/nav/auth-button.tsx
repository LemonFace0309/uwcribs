import { signIn, signOut, useSession } from 'next-auth/react';
import { VFC } from 'react';

import { Button } from '@root/ui/components';

export const AuthButton: VFC = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <Button color="salmon" variant="rounded" onClick={() => signOut()}>
        Logout
      </Button>
    );

  return (
    <Button color="salmon" variant="rounded" onClick={() => signIn()}>
      Login
    </Button>
  );
};
