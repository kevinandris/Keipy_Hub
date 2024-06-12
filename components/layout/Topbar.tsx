"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Topbar = () => {
  /* >> determine whether there is a sign-in button or not, type "use client" because useAuth() is a hook */
  const { isSignedIn } = useAuth();

  const topRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Learning", path: "/learning" },
  ];

  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/">
        <Image src="/logo.png" height={100} width={200} alt="logo" />
      </Link>

      <div className="max-md:hidden w-[400px] rounded-full flex">
        <input
          className="flex-grow bg-[#ead5f4] text-[#000] rounded-l-full border-none outline-none text-sm pl-4 py-3"
          placeholder="Search for courses"
        />
        <button className="bg-[#9a369a] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#842584]/70">
          <Search className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {topRoutes.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className="text-sm font-medium hover:text-[#ab40ab]"
            >
              {route.label}
            </Link>
          ))}
        </div>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
