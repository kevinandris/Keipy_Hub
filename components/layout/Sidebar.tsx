"use client";
import {
  BadgeX,
  BarChart3,
  BookOpenText,
  CircleCheckBig,
  FileHeart,
  ListChecks,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      path: "/instructor/tasks",
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
    <div className="max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium">
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
  );
};

export default Sidebar;
