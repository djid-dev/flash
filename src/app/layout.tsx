import type { Metadata, Viewport } from "next";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import ThemeProvider from "@/components/providers/ThemeProvider";
import { nunitoSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Flash",
  description: "Flash - Shorten, share and track your links",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunitoSans.variable} font-nunito-sans antialiased`}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
