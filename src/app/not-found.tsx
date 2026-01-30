'use client';

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Custom404() {
    return <section className="flex flex-col items-center  h-[80vh] justify-center">
      <h2 className="text-2xl dark:text-gray-200 text-gray-800 font-bold text-start ">Oops!!</h2>
      <h1 className="text-[14rem] font-bold dark:text-gray-200 text-gray-800 pb-3 ">404</h1>
      <span className="flex flex-col items-center">
        <p className="text-2xl dark:text-gray-200 text-gray-800">We could not find the page you were looking for.</p>
        <Button variant="default" className="rounded-md p-8 m-5 cursor-pointer text-xl bg-violet-500 hover:bg-violet-600 font-bold text-white dark:hover:text-violet-200 hover:text-violet-300" onClick={() => redirect("/dashboard")}>Go back</Button>
      </span>
    </section>;
} 