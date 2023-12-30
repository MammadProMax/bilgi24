import type { Metadata } from "next";
import { Noto_Sans, Dancing_Script } from "next/font/google";
import "../globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/providers/index";

// fonts
const fontSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontDancingScript = Dancing_Script({
   subsets: ["latin"],
   variable: "--font-dancing-script",
});

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function RootLayout({
   children,
   params,
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
               "min-h-screen font-sans",
               fontDancingScript.variable,
               fontSans.variable
            )}
         >
            <Providers>
               <nav className="fixed inset-x-0 top-0 z-50">
                  <Navbar />
               </nav>
               {children}
            </Providers>
         </body>
      </html>
   );
}
