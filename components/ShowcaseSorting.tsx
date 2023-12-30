import React from "react";

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

type Props = {
   selectValue: string;
   onValueChange: (val: string) => void;
   onGridChange: (val: boolean) => void;
   grid: boolean;
};

export default function ShowcaseSorting({
   selectValue,
   onValueChange,
   onGridChange,
   grid,
}: Props) {
   return (
      <div className="flex items-center justify-between px-6 py-3 bg-muted">
         <div className="flex items-center gap-3">
            <h6>Sort by</h6>
            <Select value={selectValue} onValueChange={onValueChange}>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="sort" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most-expensive">Most Expensive</SelectItem>
                  <SelectItem value="cheapest">Cheapest</SelectItem>
               </SelectContent>
            </Select>
         </div>
         <div className="flex">
            <Button
               size={"sm"}
               variant={"ghost"}
               className={cn(
                  "hover:bg-slate-200",
                  grid &&
                     "text-secondary hover:bg-transparent hover:text-secondary"
               )}
               onClick={() => onGridChange(true)}
            >
               <LayoutGrid />
            </Button>
            <Button
               size={"sm"}
               variant={"ghost"}
               className={cn(
                  "hover:bg-slate-200",
                  !grid &&
                     "text-secondary hover:bg-transparent hover:text-secondary"
               )}
               onClick={() => onGridChange(false)}
            >
               <AlignJustify />
            </Button>
         </div>
      </div>
   );
}
