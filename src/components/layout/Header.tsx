import Logo from "@/components/icons/Logo";
import ExternalLink from "next/link";
import Link from "next/link";
import { GitHub } from "../icons/BranchsLogos";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <nav className="bg-linear-to-r pb-1 from-transparent via-[color:#E42020] via-50% to-transparent ">
      <div className="flex bg-background items-center min-w-[95%] m-auto justify-center w-6xl px-2 py-4 text-white">
        <div className="flex flex-row justify-between min-w-[65%]  text-lg font-bold">
          <Link href="/" className="flex items-center justify-center">
            <Logo width={40} />
            <span className="text-[color:var(--foreground)] ">Flash</span>
          </Link>
          <div className="flex justify-center items-center gap-5">
            <ExternalLink href="/" className="hover:underline">
              <GitHub className="text-[color:var(--foreground)]" width={25} />
            </ExternalLink>
            <ThemeToggle />
            <Link
              href={"/"}
              className="flex flex-row items-center justify-center gap-2 border-2 p-2 rounded-2xl border-[color:var(--nav-button-border-color)] hover:border-red-500 hover:bg-red-500 transition-colors duration-500 text-[color:var(--foreground)] hover:text-[color:var(--inverted-foreground)]" 
            >
              <span className="font-medium text-base">
                Get Started
              </span>
              <ArrowRight/>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
