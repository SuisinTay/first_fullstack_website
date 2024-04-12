"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { UserNav } from "./UserNav";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const Navbar = async ({
  isAuthenticated,
  user,
}: {
  isAuthenticated: Promise<boolean>;
  user: Promise<KindeUser | null>;
}) => {
  const userInfo = JSON.parse(user?.value);
  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl">
            <span className="text-primary">Sui </span> Sin
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />
          {(await isAuthenticated) ? (
            <UserNav
              email={userInfo?.email}
              image={userInfo?.picture}
              name={userInfo?.given_name}
            />
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary">Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
