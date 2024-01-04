"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Heart, Home, LucideIcon, Mail, Plus, UserIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type Navigations = {
   name: string;
   href: string;
   Icon: LucideIcon;
};

const navigations: Navigations[] = [
   {
      name: "User",
      href: "/profile",
      Icon: UserIcon,
   },
   {
      name: "Messages",
      href: "/profile/messages",
      Icon: Mail,
   },
   {
      name: "Watchlist",
      href: "/profile/watchlist",
      Icon: Heart,
   },
   {
      name: "Home",
      href: "/",
      Icon: Home,
   },
];

export default function BottomNavbar({ locale }: { locale: string }) {
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const isActive = (href: string) =>
      href === "/"
         ? pathname === `/${locale}`
         : pathname === `/${locale}${href}`;

   return (
      <div className="bg-accent shadow-md border-t border-t-border relative">
         <div className="w-full h-14 flex justify-around items-center">
            {navigations.map((nav, index) => (
               <Link
                  href={`/${locale}${nav.href}`}
                  key={index}
                  className={cn(
                     buttonVariants({ variant: "ghost" }),
                     "hover:bg-white"
                  )}
               >
                  <nav.Icon
                     className={cn(
                        "text-muted-foreground",
                        isActive(nav.href) && "text-secondary"
                     )}
                  />
               </Link>
            ))}
            <div className="absolute -top-4">
               <button className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-secondary flex items-center justify-center shadow-md hover:bg-[#e3a916] transition-colors duration-200 ease-in-out">
                  <Plus className="text-white" />
               </button>
            </div>
         </div>
      </div>
   );
}
