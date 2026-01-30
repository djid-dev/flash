
'use client';

import { Toaster } from "sonner";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useEffect, useState } from "react";



export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const [theme, setTheme] = useState<"light" | "dark">(() => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
});

const readTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  setTheme(storedTheme === "dark" ? "dark" : "light");
}
useEffect(() => {
  readTheme();
  const handleThemeChange = () => readTheme();
  window.addEventListener("theme-change", handleThemeChange);
  
  return () => {
    window.removeEventListener("theme-change", handleThemeChange);
  };
}, []);

  return (
    <>
      <DashboardNavbar/>
      <Toaster theme={theme}/> 
      <main>{children}</main>
    </>
  );
}
