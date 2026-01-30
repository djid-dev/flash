import { geist } from "@/lib/fonts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export function GetStartedButton() {
    return <Link
              href={"/dashboard"}
              className="flex flex-row items-center justify-center gap-1 hover:gap-3 border-2 px-2 py-1 rounded-[.5rem] border-[color:var(--nav-button-border-color)] hover:border-violet-500 hover:bg-violet-500  text-black hover:text-white dark:text-white transition-all duration-300 ease-in-out h-8"
            >
              <span
                className={`${geist.className} antialiased font-normal text-[1rem]   tracking-wide`}
              >
                Get Started
              </span>
              <ArrowRight width={19} />
            </Link>
}