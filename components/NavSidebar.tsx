import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import NavSearch from "./NavSearch";
import NavLang from "./NavLang";
import LogoIcon from "./global/LogoIcon";

export default function NavSidebar() {
   return (
      <Sheet>
         <Button asChild variant={"ghost"} size="sm">
            <SheetTrigger>
               <Menu />
            </SheetTrigger>
         </Button>

         <SheetContent side={"top"} className="bg-primary text-white">
            <LogoIcon />
            <div className="mt-5 flex gap-6">
               <NavSearch className="w-[60vw] bg-primary sm:w-72 placeholder:text-gray-300 ring-offset-muted-foreground focus-visible:ring-teal-900" />
               <NavLang />
            </div>
         </SheetContent>
      </Sheet>
   );
}
