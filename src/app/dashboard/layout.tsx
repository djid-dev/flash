
'use client'

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNavbar />
      <Toaster />
      <main>{children}</main>
    </>
  );
}

