"use client";

import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type NavSearchProps = {
   className?: string;
};

export default function NavSearch({ className }: NavSearchProps) {
   return (
      <div className="relative w-fit">
         <Input placeholder="Enter Product" className={cn(className)} />
         <Search className="absolute top-2 right-2 text-muted-foreground" />
      </div>
   );
}
