import React from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type CreatePostLayoutProps = {
   children: React.ReactNode;
   params: {
      locale: string;
   };
};

export default function CreatePostLayout({
   children,
   params,
}: CreatePostLayoutProps) {
   return (
      <>
         <nav className="fixed inset-x-0 top-0 z-50">
            <Navbar locale={params.locale} />
         </nav>
         {/* seperator */}
         <div className="pt-[72px] w-full bg-primary" />

         <main>
            <MaxWidthWrapper className="pt-16">
               <h1 className="text-center text-xl  md:text-3xl font-semibold text-secondary">
                  Please select the appropriate category
               </h1>
               {children}
            </MaxWidthWrapper>
         </main>
      </>
   );
}
