"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

type ContactProps = {};

export default function MessagesContacts({}: ContactProps) {
   const searchParams = useSearchParams();
   const router = useRouter();
   const locale = useLocale();

   const messageId = searchParams?.get("messageId");

   return (
      <div
         className={cn(
            "absolute left-0 inset-y-0 w-full lg:w-[22rem] xl:w-[32rem] h-full bg-white shadow-lg border-r border-border transition-all duration-700 ease-in-out lg:translate-x-0",
            !!messageId && "-translate-x-[1000px]"
         )}
      >
         <div className="w-full h-full flex flex-col p-1.5 sm:p-5">
            <div className="flex justify-between items-center w-full p-3 rounded-md hover:bg-muted">
               <div className="flex gap-3">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 ring-1 ring-blue-500 bg-white rounded-full flex justify-center items-center">
                     <User />
                  </div>
                  {/*  */}
                  <div className="flex-col">
                     <h3 className="text-sm sm:text-lg font-semibold">
                        hello world
                     </h3>
                     <p className="text-xs text-muted-foreground">
                        latest message
                     </p>
                  </div>
                  {/*  */}
               </div>
               <div className="h-fit self-start mt-1 text-xs text-muted-foreground">
                  <span className="h-fit">01/10/2024</span>
               </div>
            </div>
         </div>
      </div>
   );
}
