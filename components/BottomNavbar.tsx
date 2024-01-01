"use client";

import { Heart, Home, LucideIcon, Mail, Plus, UserIcon } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Navigations = {
   name: string;
   href: string;
   Icon: LucideIcon;
};

const navigations: Navigations[] = [
   {
      name: "User",
      href: "/",
      Icon: UserIcon,
   },
   {
      name: "Messages",
      href: "/",
      Icon: Mail,
   },
   {
      name: "Watchlist",
      href: "/",
      Icon: Heart,
   },
   {
      name: "Home",
      href: "/",
      Icon: Home,
   },
];

export default function BottomNavbar() {
   return (
      <div className="bg-accent shadow-md border-t border-t-border relative">
         <div className="w-full h-14 flex justify-around items-center">
            {navigations.map((nav, index) => (
               <Link
                  href={nav.href}
                  key={index}
                  className={cn(
                     buttonVariants({ variant: "ghost" }),
                     "hover:bg-white"
                  )}
               >
                  <nav.Icon className="text-muted-foreground" />
               </Link>
            ))}
            <div className="absolute -top-4">
               <button className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-secondary flex items-center justify-center shadow-md hover:bg-secondary-dark transition-colors duration-200 ease-in-out">
                  <Plus className="text-white" />
               </button>
            </div>
         </div>
      </div>
   );
}
