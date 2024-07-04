"use client";
import {
  BadgeX,
  BarChart3,
  BookOpenText,
  CircleCheckBig,
  FileHeart,
  ListChecks,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarRoutes = [
    {
      icon: <BookOpenText />,
      label: "Courses",
      path: "/instructor/courses",
    },
    {
      icon: <BarChart3 />,
      label: "Income Statistics",
      path: "/instructor/performance",
    },
    {
      icon: <ListChecks />,
      label: "All Tasks",
      path: "/instructor/all-tasks",
    },
    {
      icon: <FileHeart />,
      label: "Prioritized Tasks",
      path: "/instructor/prioritized-tasks",
    },
    {
      icon: <CircleCheckBig />,
      label: "Completed Tasks",
      path: "/instructor/completed-tasks",
    },
    {
      icon: <BadgeX />,
      label: "Incomplete Tasks",
      path: "/instructor/incomplete-tasks",
    },
  ];

  return (
    <SidebarStyle className="fixed max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium">
      <div className="top">
        {sidebarRoutes.map((route) => (
          <Link
            href={route.path}
            key={route.path}
            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#eaa7ea]/90
            ${
              pathname.startsWith(route.path) &&
              "bg-[#ead5f4] hover:bg-[#eaa7ea]/90"
            }
          `}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </div>
      <div className="bottom">
        <LogOut />
        <Link href={"/"}>
          <Button>Logout</Button>
        </Link>
      </div>
    </SidebarStyle>
  );
};

const SidebarStyle = styled.div`
  height: 92.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .bottom {
    display: flex;
    gap: 0.5rem;
    padding: 1.5rem;
    align-items: center;
  }
`;

export default Sidebar;
