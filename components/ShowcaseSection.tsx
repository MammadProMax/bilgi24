"use client";

import React, { useState } from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { AlignJustify, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShowcaseSection() {
   const [selectValue, setSelectValue] = useState("newest");
   const [layoutGrid, setLayoutGrid] = useState(false);

   return (
      <div className="py-6 flex flex-col">
         <h1 className="bg-primary text-primary-foreground text-2xl py-4 px-3 font-base font-sans rounded-t-sm">
            Home Page Showcase
         </h1>
         <div className="flex items-center justify-between px-6 py-3 bg-muted">
            <div className="flex items-center gap-3">
               <h6>Sort by</h6>
               <Select
                  value={selectValue}
                  onValueChange={(val) => setSelectValue(val)}
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="sort" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="newest">Newest</SelectItem>
                     <SelectItem value="oldest">Oldest</SelectItem>
                     <SelectItem value="most-expensive">
                        Most Expensive
                     </SelectItem>
                     <SelectItem value="cheapest">Cheapest</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div>
               <Button
                  size={"sm"}
                  variant={"ghost"}
                  className={cn(
                     "hover:bg-slate-200",
                     layoutGrid &&
                        "text-secondary hover:bg-transparent hover:text-secondary"
                  )}
                  onClick={() => setLayoutGrid(true)}
               >
                  <LayoutGrid />
               </Button>
               <Button
                  size={"sm"}
                  variant={"ghost"}
                  className={cn(
                     "hover:bg-slate-200",
                     !layoutGrid &&
                        "text-secondary hover:bg-transparent hover:text-secondary"
                  )}
                  onClick={() => setLayoutGrid(false)}
               >
                  <AlignJustify />
               </Button>
            </div>
         </div>
      </div>
   );
}
