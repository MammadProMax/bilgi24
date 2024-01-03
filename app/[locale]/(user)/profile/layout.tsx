import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/auth/server";

import Navbar from "@/components/Navbar";

type ProfileProps = {
   params: {
      locale: string;
   };
   children: React.ReactNode;
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
         <nav className="fixed inset-x-0 top-0 z-50">
            <Navbar locale={params.locale} />
         </nav>
      </>
   );
}
