"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Topbar = () => {
  /* >> determine whether there is a sign-in button or not, type "use client" because useAuth() is a hook */
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const topRoutes = [
    { label: "Dashboard", path: "/instructor/courses" },
    { label: "Courses", path: "/user-course" },
  ];

  // const sidebarRoutes = [
  //   {
  //     label: "Dashboard",
  //     path: "/instructor/courses",
  //   },
  //   {
  //     label: "Income statistics",
  //     path: "/instructor/performance",
  //   },
  // ];

  /* for query */
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
    setSearchInput("");
  };

  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/">
        <Image src="/keipy-two.png" height={100} width={200} alt="logo" />
      </Link>

      <div className="max-md:hidden w-[400px] rounded-full flex">
        <input
          className="flex-grow bg-[#ead5f4] text-[#000] rounded-l-full border-none outline-none text-sm pl-4 py-3"
          placeholder="Search for courses"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="bg-[#9a369a] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#842584]/70"
          disabled={searchInput.trim() === ""}
          onClick={handleSearch}
        >
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

        <div className="w-full max-w-[200px] z-20 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
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

              {/* {pathName.startsWith("/instructor") && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    {sidebarRoutes.map((route) => (
                      <Link
                        href={route.path}
                        key={route.path}
                        className="text-sm font-medium hover:text-[#ab40ab]"
                      >
                        {route.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )} */}
            </SheetContent>
          </Sheet>
        </div>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
