import React from "react";
import type { Metadata } from "next";
import { Noto_Sans, Dancing_Script } from "next/font/google";
import "@/app/globals.css";

import Providers from "@/components/providers/index";
import { cn } from "@/lib/utils";

const fontSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontDancingScript = Dancing_Script({
   subsets: ["latin"],
   variable: "--font-dancing-script",
});

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function layout({
   params,
   children,
}: {
   children: React.ReactNode;
   params: {
      locale: string;
   };
}) {
   return (
      <html lang={params.locale}>
         <body
            className={cn(
               "min-h-screen font-sans scroll-scondary",
               fontDancingScript.variable,
               fontSans.variable
            )}
         >
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
