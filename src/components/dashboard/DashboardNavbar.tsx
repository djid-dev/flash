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
              className="flex flex-row items-center justify-center gap-1  text-md border-b-1 px-5 py-1 border-violet-500 font-bold "
              href="/dashboard"
            >
              <Link2Icon className="w-6 h-6 text-violet-500" />
              <span className="text-violet-500">Links</span>
            </Link>
            <Link
              className="flex flex-row items-center justify-center gap-1  text-md border-b-2 px-5 py-1 border-transparent text-md group font-bold hover:border-b-2 "
              href={"/dashboard/settings"}
            >
              <Settings className="group-hover:text-neutral-900 text-neutral-500 dark:group-hover:text-neutral-100 w-6 h-6 group-hover:rotate-5 transition " />
              <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-300 dark:text-neutral-500 text-neutral-500">Settings</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              className="flex flex-row items-center justify-center gap-1  text-md border-b-2 px-5 py-1 border-transparent text-neutral-500 text-md group font-bold hover:border-b-2 "
              href="/dashboard"
            >
              <Link2Icon className=" group-hover:text-neutral-900 text-neutral-500 dark:group-hover:text-neutral-100 w-6 h-6 group-hover:rotate-5 transition" />
              <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-300 dark:text-neutral-500 text-neutral-500">Links</span>
            </Link>
            <Link
              className="flex flex-row items-center-safe justify-center gap-1 px-5 py-1 border-b-2  border-violet-500   group text-neutral-300 font-bold"
              href={"/dashboard/settings"}
            >
              <Settings className="text-violet-500 w-6 h-6 " />
              <span className=" text-violet-500">Settings</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
