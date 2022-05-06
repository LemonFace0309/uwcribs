import { FC } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@root/ui/components";

export const AuthButton: FC = () => {
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
