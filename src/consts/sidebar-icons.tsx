import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { ReactNode } from "react";

interface SidebarIcon{
    icon:ReactNode,
    label:string,
    href:string
}

export const sidebarItems: SidebarIcon[] = [
    {
      icon: <AiFillHome className="text-xl text-black mt-1" />,
      label: "Home",
      href: "/home",
    },
    {
      icon: <RiDashboardFill className="text-xl text-black  mt-1" />,
      label: "Dashboard",
      href: "/w/id/dashboard",
    },
    {
      icon: <BsFillPeopleFill className="text-xl text-black mt-1" />,
      label: "Members",
      href: "/w/id/members",
    },
    {
      icon: <FaCalendar className="text-xl text-black mt-1" />,
      label: "Calendar",
      href: "/w/id/calendar",
    },
    {
      icon: <AiFillMessage className="text-xl text-black mt-1" />,
      label: "Message",
      href: "",
    },
  ];