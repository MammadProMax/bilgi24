"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
   href: string;
   Icon: LucideIcon;
   shouldHideOnMobile?: boolean;
   isCompany?: boolean;
};

const sidebarMenuOptions: SidebarMenuOptions[] = [
   {
      Icon: UserCog,
      name: "Profile",
      href: "/profile",
   },
   {
      name: "Messages",
      href: "/profile/messages",
      Icon: Mail,
      shouldHideOnMobile: true,
   },
   {
      name: "Watchlist",
      href: "/profile/watchlist",
      Icon: Heart,
      shouldHideOnMobile: true,
   },
   {
      name: "Purchases",
      href: "/profile/purchases",
      Icon: CreditCard,
   },
   {
      name: "Wallet",
      href: "/profile/wallet",
      Icon: Wallet,
   },
   {
      name: "My shop",
      href: "/profile/my-shop",
      Icon: ShoppingCart,
      isCompany: true,
   },
   {
      name: "My Ads",
      href: "/profile/my-ads",
      Icon: ShoppingCart,
      isCompany: false,
   },
];

export default function SidebarMenu({ locale, session }: SidebarMenuProps) {
   const pathname = usePathname();

   const isActiveLink = (href: string) => pathname === `/${locale}${href}`;

   return (
      <div className="fixed z-40 transition-all duration-500 ease-out left-0 inset-y-0 md:w-64 mt-[72px] w-16">
         <div className="border-r border-border shadow-lg bg-accent h-full transition-all overflow-hidden">
            <div className="w-full py-6 text-center text-xl font-semibold text-primary hidden md:block">
               {session.firstName} {session.lastName}
            </div>

            {sidebarMenuOptions.map(
               ({ name, href, Icon, shouldHideOnMobile, isCompany }) => {
                  if (
                     typeof isCompany === "boolean" &&
                     isCompany !== session.isCompany
                  )
                     return null;

                  return (
                     <Link
                        href={`/${locale}${href}`}
                        key={name}
                        className={cn(
                           "flex gap-x-3 items-center py-2 px-5 text-lg text-muted-foreground hover:bg-slate-200 transition-colors duration-200",
                           isActiveLink(href) && "bg-slate-200",
                           shouldHideOnMobile && "max-md:hidden"
                        )}
                     >
                        <Icon
                           className={cn(
                              "md:w-5 md:h-5 w-6 h-6",
                              isActiveLink(href) && "text-secondary"
                           )}
                        />

                        <div
                           className={cn(
                              "font-medium text-base hidden md:block",
                              isActiveLink(href) && "text-primary"
                           )}
                        >
                           {name}
                        </div>
                     </Link>
                  );
               }
            )}
         </div>
      </div>
   );
}
