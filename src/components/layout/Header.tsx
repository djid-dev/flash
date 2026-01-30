"use client";
import Logo from "@/components/icons/Logo";
import ExternalLink from "next/link";
import Link from "next/link";
import { GitHub } from "../icons/BranchsLogos";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { geist } from "@/lib/fonts";
import { GetStartedButton } from "@/components/ui/GetStartedButton";
import { UserAvatar } from "../ui/UserAvatar";
import { useSession } from "@/lib/auth-client";

export default function Header() {
  const {data: session, isPending } = useSession()


  return (
    <header className="bg-linear-to-r pb-[1.5px] from-transparent min-w-screen via-violet-500 via-50% to-transparent ">
      <div className=" px-2 py-3  flex justify-center items-center  bg-background ">
        <div className=" flex flex-row  justify-between  min-w-[60%] text-lg font-bold">
          <Link href="/" className="flex items-center gap-2 justify-center">
            <Logo className=" w-7 h-7 " />
            <span
              className={`${geist.className} antialiased text-[color:var(--foreground)] font-medium `}
            >
              Flash
            </span>
          </Link>
          <div className="flex justify-center items-center mx-6 md:mx-0 gap-5">
            <ExternalLink
              href="https://github.com/djid-dev/flash"
              target="_blank"
              className="hover:underline"
            >
              <GitHub className="p-1 rounded-full transition-all duration-300 ease-in-out hover:bg-foreground text-foreground hover:text-white hover:rotate-16  dark:hover:text-black  w-7 h-7" />
            </ExternalLink>
            <ThemeToggle />

            {session != null ? (
              isPending ? (
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
              ) : (
                <UserAvatar />
              )
            ) : (
              <GetStartedButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
