import React from "react";

import { getServerSession } from "@/auth/server";

import MessagesContext from "@/components/context/Messages.context";
import MessagesContacts from "@/components/app/user/MessagesContacts";
import { redirect } from "next/navigation";

type MessagesLayoutProps = {
   children: React.ReactNode;
   params: {
      locale: string;
   };
};

// messages sidebar translate breakpoint : -translate-x-[1000px]

export default async function MessagesLayout({
   children,
   params,
}: MessagesLayoutProps) {
   const session = await getServerSession();
   if (!session) redirect(`/${params.locale}/login`);
   
   return (
      <MessagesContext session={session}>
         <div className="relative min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-72px)]">
            {/* contacts sidebar */}
            <MessagesContacts />
            {/* chat section */}
            <section className="pl-0 lg:pl-[22rem] xl:pl-[32rem] bg-red-600">
               {children}
            </section>
         </div>
      </MessagesContext>
   );
}
