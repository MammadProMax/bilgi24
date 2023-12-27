import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import NavSearch from "./NavSearch";

export default function NavSidebar() {
   return (
      <Sheet>
         <Button asChild variant={"ghost"} size="sm">
            <SheetTrigger>
               <Menu />
            </SheetTrigger>
         </Button>

         <SheetContent side={"top"} className="bg-primary text-white">
            <div className="mt-5">
               <NavSearch className="w-[60vw] bg-primary sm:w-72 placeholder:text-gray-300 ring-offset-muted-foreground focus-visible:ring-teal-900" />
            </div>
         </SheetContent>
      </Sheet>
   );
}
