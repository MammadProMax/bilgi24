"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import MessagesContactList from "@/components/app/user/MessagesContactList";

type ContactProps = {};

export default function MessagesContacts({}: ContactProps) {
   const searchParams = useSearchParams();

   const messageId = searchParams?.get("messageId");

   return (
      <div
         className={cn(
            "absolute left-0 inset-y-0 w-full lg:w-[22rem] xl:w-[32rem] h-full bg-white shadow-lg border-r border-border transition-all duration-700 ease-in-out lg:translate-x-0",
            !!messageId && "-translate-x-[1000px]"
         )}
      >
         <div className="w-full h-full flex flex-col gap-y-3 p-1.5 sm:p-5">
            <MessagesContactList />
         </div>
      </div>
   );
}
