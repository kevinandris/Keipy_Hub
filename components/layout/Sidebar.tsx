"use client";
import {
  ArrowLeft,
  BadgeX,
  BarChart3,
  BookOpenText,
  CircleCheckBig,
  FileHeart,
  ListChecks,
  LogOut,
  Menu,
} from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useGlobalState } from "@/app/context/globalProvider";

const Sidebar = () => {
  const { collapsed, collapseMenu, theme } = useGlobalState();
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
    <SidebarStyle
      collapsed={collapsed}
      theme={theme}
      className="fixed max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium"
    >
      <div className="top">
        <button className="toggle-nav" onClick={collapseMenu}>
          {collapsed ? (
            <Menu width={30} color="#842584" />
          ) : (
            <ArrowLeft width={30} color="#842584" />
          )}
        </button>

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
          <Button>Back to homepage</Button>
        </Link>
      </div>
    </SidebarStyle>
  );
};

const SidebarStyle = styled.div<{ collapsed: boolean }>`
  position: relative;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 100;
    width: 15rem;

    border-radius: 7%;
    background-color: ${(props) => props.theme.colorPurple};
    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) =>
      props.collapsed ? "translateX(-94%)" : "translateX(0)"};

    .toggle-nav {
      display: block !important;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorPurple2};
    }

    .bottom {
      display: block;
      padding-bottom: 5rem;
    }
  }

  .toggle-nav {
    display: none;
    /* padding: 0.8rem 0.9rem; */
    position: absolute;
    right: -2rem;
    top: 2.7rem;

    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    color: ${(props) => props.theme.colorGrey3};
    /* background-color: ${(props) => props.theme.colorBg2}; */
    border-top: 2px solid ${(props) => props.theme.colorGrey1};
    border-right: 2px solid ${(props) => props.theme.colorGrey1};
    border-bottom: 2px solid ${(props) => props.theme.colorGrey1};
  }

  .bottom {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    margin-left: 0.9rem;
  }
`;

export default Sidebar;
