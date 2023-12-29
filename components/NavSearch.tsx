"use client";

import React, { useRef } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type NavSearchProps = {
   className?: string;
};

export default function NavSearch({ className }: NavSearchProps) {
   const inputRef = useRef<HTMLInputElement>(null);

   return (
      <div className="relative w-fit cursor-pointer">
         <Input
            ref={inputRef}
            placeholder="Enter Product"
            className={cn("cursor-pointer focus-within:cursor-text", className)}
         />
         <Search
            onClick={() => inputRef.current?.focus()}
            className="absolute top-2 right-2 text-gray-300"
         />
      </div>
   );
}
