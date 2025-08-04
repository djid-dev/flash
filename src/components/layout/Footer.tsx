import { Heart, Pencil, ArrowUpRight } from "lucide-react";
import ExternalLink from "next/link";

export default function Footer() {
  return (
    <footer className="  fixed 
     bottom-0 min-w-screen flex justify-center">
      <div className="flex sm:min-w-[60%] flex-row justify-between items-center   gap-6 text-[.6rem] sm:text-[.8rem] p-4 text-neutral-800 dark:text-neutral-400">
        <ExternalLink className="flex gap-2  items-center  group" target="_blank" href="https://github.com/djid-dev">
        <Heart className="text-red-500  w-[1rem]"/>
        <p>Made by Orlando</p>
        <span className="flex w-[1rem] items-start ">
          <ArrowUpRight className="group-hover:pl-1 group-hover:pb-1 transition-all duration-300 ease-in-out"/>
        </span>
      </ExternalLink>
      <ExternalLink href="https://slug.vercel.app/" target="_blank" className="flex gap-2  items-center group">
        <Pencil className="text-red-500 w-[1rem]" />
        <p>Inspired by Slug</p>
        <span className="flex w-[1rem] items-start">
          <ArrowUpRight className="group-hover:pl-1 group-hover:pb-1 transition-all duration-300 ease-in-out"/>
        </span>
      </ExternalLink>
      </div>
    </footer>
  );
}
