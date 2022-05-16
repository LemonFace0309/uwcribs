import Link from "next/link";
import { FC } from "react";

import { Logo } from "@root/ui/components";

import { AuthButton } from "./auth-button";

const isAuthEnabled = false;

export const Nav: FC = () => {
  return (
    <nav className="flex justify-between p-4 ">
      <Link href="/">
        <a>
          <Logo className="cursor-pointer transition hover:-rotate-3 hover:scale-105" />
        </a>
      </Link>
      {isAuthEnabled && <AuthButton />}
    </nav>
  );
};
