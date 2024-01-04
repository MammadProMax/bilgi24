import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/auth/server";

import Navbar from "@/components/Navbar";
import SidebarMenu from "@/components/app/user/SidebarMenu";
import BottomNavbar from "@/components/BottomNavbar";

type ProfileProps = {
   params: {
      locale: string;
   };

   children: React.ReactNode;
   messages: React.ReactNode;
   watchlist: React.ReactNode;
};

export default async function ProfileLayout({
   params,
   children,
}: ProfileProps) {
   const session = await getServerSession();
   if (!session || !session.userId) {
      return redirect(`/${params.locale}/login`);
   }

   return (
      <>
         {/* body */}
         <nav className="fixed inset-x-0 top-0 z-50">
            <Navbar locale={params.locale} />
         </nav>
         {/* seperator */}
         <div className="pt-[72px] w-full bg-primary" />
         <SidebarMenu session={session} locale={params.locale} />
         {/* main routes */}
         <main className="md:pl-64 pl-16 pb-">{children}</main>

         {/* seperator */}
         <div className="pb-14 md:hidden"></div>
         <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
            <BottomNavbar locale={params.locale} />
         </div>
      </>
   );
}
