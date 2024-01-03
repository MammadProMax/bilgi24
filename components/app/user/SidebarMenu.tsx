"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import {
   CreditCard,
   Heart,
   LucideIcon,
   Mail,
   ShoppingCart,
   UserCog,
   Wallet,
} from "lucide-react";
import { Session } from "@/auth/server";

type SidebarMenuProps = {
   locale: string;
   session: Session;
};

type SidebarMenuOptions = {
   name: string;
   tab?: string;
   Icon: LucideIcon;
   shouldHideOnMobile?: boolean;
};

const sidebarMenuOptions: SidebarMenuOptions[] = [
   {
      Icon: UserCog,
      name: "Profile",
   },
   {
      name: "Messages",
      tab: "messages",
      Icon: Mail,
      shouldHideOnMobile: true,
   },
   {
      name: "Watchlist",
      tab: "watchlist",
      Icon: Heart,
      shouldHideOnMobile: true,
   },
   {
      name: "Purchases",
      tab: "purchases",
      Icon: CreditCard,
   },
   {
      name: "Wallet",
      tab: "wallet",
      Icon: Wallet,
   },
   {
      name: "My shop",
      tab: "myShop",
      Icon: ShoppingCart,
   },
];

export default function SidebarMenu({ locale, session }: SidebarMenuProps) {
   const searchParams = useSearchParams();

   const isActiveLink = (tab: string | undefined) =>
      typeof tab === "undefined"
         ? searchParams.has("tab") === false
         : searchParams.get("tab") === tab;

   return (
      <>
         <div className="fixed transition-all duration-500 ease-out left-0 inset-y-0 md:w-64 mt-[72px] w-16">
            <div className="border-r border-border shadow-lg bg-accent h-full transition-all overflow-hidden">
               <div className="w-full py-6 text-center text-xl font-semibold text-primary hidden md:block">
                  {session.firstName} {session.lastName}
               </div>

               {sidebarMenuOptions.map(
                  ({ name, tab, Icon, shouldHideOnMobile }) => (
                     <Link
                        href={
                           tab
                              ? `/${locale}/profile?tab=${tab}`
                              : `/${locale}/profile`
                        }
                        key={name}
                        className={cn(
                           "flex gap-x-3 items-center py-2 px-5 text-lg text-muted-foreground hover:bg-slate-200 transition-colors duration-200",
                           isActiveLink(tab) && "bg-slate-200",
                           shouldHideOnMobile && "max-md:hidden"
                        )}
                     >
                        <Icon
                           className={cn(
                              "md:w-5 md:h-5 w-6 h-6",
                              isActiveLink(tab) && "text-secondary"
                           )}
                        />

                        <div
                           className={cn(
                              "font-medium text-base hidden md:block",
                              isActiveLink(tab) && "text-primary"
                           )}
                        >
                           {name}
                        </div>
                     </Link>
                  )
               )}
            </div>
         </div>
         {/* seperate sidebar from body */}
      </>
   );
}
