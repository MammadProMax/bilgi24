import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { LogIn, Plus } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import LogoIcon from "./global/LogoIcon";
import NavSearch from "./NavSearch";
import NavSidebar from "./NavSidebar";
import NavLang from "./NavLang";
import { buttonVariants } from "./ui/button";

export default function Navbar() {
   return (
      <div className="bg-primary py-6 text-primary-foreground">
         <MaxWidthWrapper className="flex items-center justify-between">
            <div className="flex items-center">
               <Link href="/">
                  <LogoIcon />
               </Link>
               <div className="px-3 hidden md:block">
                  <NavSearch className="bg-primary lg:w-96 w-64 placeholder:text-gray-300 focus-visible:ring-teal-900" />
               </div>
            </div>
            <div className="flex items-center gap-x-0.5 md:gap-x-4">
               <div className="md:block hidden">
                  <NavLang />
               </div>

               <Link
                  href="/"
                  className={cn(
                     buttonVariants({ variant: "outline", size: "sm" }),
                     "bg-inherit"
                  )}
               >
                  Sign in
                  <LogIn className="w-4 h-4 mx-1" />
               </Link>
               <Link
                  href="/"
                  className={cn(
                     buttonVariants({ variant: "secondary", size: "sm" }),
                     "hidden md:flex"
                  )}
               >
                  Post Ad
                  <Plus className="w-4 h-4 mx-1" />
               </Link>
               {/* sidebar */}
               <div className="md:hidden mx-2">
                  <NavSidebar />
               </div>
            </div>
         </MaxWidthWrapper>
      </div>
   );
}
