"use client";
import { Link2Icon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

enum Page {
  Links,
  Settings,
}
export type PageType = Page;

export default function DashboardNavbar() {
  const path = usePathname();
  const currentPage = path.includes("settings") ? Page.Settings : Page.Links;

  return (
    <nav className=" min-w-screen mt-5 mb-4">
      <div className="flex justify-center gap-5">
        {currentPage === Page.Links ? (
          <>
            <Link
              className="flex flex-row items-center justify-center gap-1  text-md border-b-2 px-5 py-1 border-red-500 font-bold "
              href="/dashboard"
            >
              <Link2Icon className="rotate-135 w-6 h-6 text-red-500" />
              <span>Links</span>
            </Link>
            <Link
              className="flex flex-row items-center-safe justify-center gap-2 px-5 py-1 border-b-2 border-transparent group text-neutral-500 text-md font-bold "
              href={"/dashboard/settings"}
            >
              <Settings className="group-hover:text-neutral-100 w-6 h-6 " />
              <span className="group-hover:text-neutral-100">Settings</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              className="flex flex-row items-center justify-center gap-1  text-md border-b-2 px-5 py-1 border-transparent text-neutral-500 text-md group font-bold"
              href="/dashboard"
            >
              <Link2Icon className="rotate-135 group-hover:text-neutral-100 w-6 h-6" />
              <span className="group-hover:text-neutral-100   ">Links</span>
            </Link>
            <Link
              className="flex flex-row items-center-safe justify-center gap-2 px-5 py-1 border-b-2  border-red-500   group text-neutral-100 font-bold"
              href={"/dashboard/settings"}
            >
              <Settings className="text-red-500 w-6 h-6 " />
              <span className="">Settings</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
