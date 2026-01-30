'use client';

import BlurText from "@/components/ui/BlurText";
import { geist } from "@/lib/fonts";
import FadeContent from "@/components/ui/FadeContent";
import { Link2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <section className="font-sans ">
      <div className="flex flex-col mt-10 p-4 sm:p-0 justify-center items-center">
        <BlurText
          text="Shorten, share and track"
          delay={100}
          animateBy="letters"
          direction="top"
          className={`${geist.className} antialiased mt-6 text-2xl  sm:text-5xl text-pretty font-bold tracking-tight  max-w-[75ch] duration-500 animate-in fade-in-5 slide-in-from-bottom-2`}
        />

        <FadeContent
          blur={true}
          duration={1000}
          easing="ease-out"
          initialOpacity={0}
          className="text-center text-balance flex flex-col justify-center items-center p-1.5 "
        >
          <p className="text-pretty max-w-[75ch] text-sm duration-700 animate-in fade-in-5 slide-in-from-top-2 md:text-base text-neutral-800 dark:text-neutral-300 sm:text-sm ">
            Your links are important. Use <strong>Flash</strong> to shorten, brand, share and
            manage your links. <br /> It`s fast, secure and easy to use.
          </p>

          <Button
            onClick={() => redirect("/dashboard")}
            variant="outline"
            className="m-5 flex items-center gap-3 rounded-md p-7 text-xl font-bold text-white border-2 border-violet-500 bg-violet-500 dark:hover:text-violet-500 dark:hover:bg-transparent dark:bg-violet-500 hover:text-violet-500 dark:hover:border-violet-500  hover:bg-transparent  [&_svg]:!size-8 transition group"
          >
            <Link2Icon className="group-hover:-rotate-10 transition" />
            Get started
          </Button>

        </FadeContent>
      </div>
    </section>
  );
}
