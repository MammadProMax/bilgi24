import MessagesContacts from "@/components/app/user/MessagesContacts";
import React from "react";

type MessagesLayoutProps = {
   children: React.ReactNode;
};

// messages sidebar translate breakpoint : -translate-x-[1000px]

export default function MessagesLayout({ children }: MessagesLayoutProps) {
   return (
      <div className="relative min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-72px)]">
         {/* contacts sidebar */}
         <MessagesContacts />
         {/* chat section */}
         <section className="pl-0 lg:pl-[22rem] xl:pl-[32rem] bg-red-600">
            {children}
         </section>
      </div>
   );
}
