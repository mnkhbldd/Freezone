// Navbar.tsx
"use client";

import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const { user, isLoaded } = useUser();

  return (
    <header className="bg-[#1A1A1A] flex items-center p-4 gap-4 h-16 text-white">
      <div>
        <h1 className="text-3xl font-bold">Logo</h1>
      </div>
      <div className="flex gap-4">
        <p className="p-[10px]">Explore</p>
        <p className="p-[10px]">About Us</p>
        <p className="p-[10px]">Contact</p>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          {isLoaded && user && (
            <div
              className="flex gap-4 items-center cursor-pointer"
              onClick={() => {
                const userButton = document.querySelector(
                  ".cl-userButtonTrigger"
                );
                if (userButton) (userButton as HTMLElement).click();
              }}
            >
              {/* Hidden UserButton (still functional) */}
              <UserButton
                appearance={{
                  elements: {
                    userButtonTrigger: { display: "none" },
                    popoverContent: {
                      transform: "translateX(-200px)",
                      marginTop: "8px",
                    },
                  },
                }}
              />
              <Image
                src={user.imageUrl}
                alt={user.username || user.firstName || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
              {/* Visible User Info + Chevron */}
              <p className="font-medium">
                {user.username || user.firstName || "User"}
              </p>
              <ChevronDown className="size-[16px]" />
            </div>
          )}
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;
