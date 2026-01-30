
import BlurText from "@/components/ui/BlurText";
import { geist, nunitoSans } from "@/lib/fonts";
import FadeContent from "@/components/ui/FadeContent";
import Link from "next/link";
import { Link2Icon } from "lucide-react";

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

          <Link
            href={"/dashboard"}
            className={`${nunitoSans.className} antialiased flex items-center group gap-2 w-fit  my-6 p-3 border-2 border-neutral-300 dark:border-neutral-600    rounded-[.5rem]  hover:border-b-violet-500 dark:hover:border-violet-500 hover:text-foreground dark:text-white font-bold`}
          >
            <Link2Icon className="rotate-135 group-hover:rotate-105 transition-transform duration-300 ease-in-out group-hover:text-violet-500" />
            <span>Create a link</span>
          </Link>
        </FadeContent>
      </div>
    </section>
  );
}
