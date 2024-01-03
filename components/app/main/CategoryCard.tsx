import Image from "next/image";
import React from "react";
import { Card, CardDescription } from "../../ui/card";
import { Category } from "@/types/main";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
   category: Category;
   className?: string;
   size?: number;
};

export default function CategoryCard({
   category,
   className,
   size,
}: CategoryCardProps) {
   return (
      <Card
         onContextMenu={(ev) => ev.preventDefault()}
         className={cn(
            "bg-primary text-center text-sm px-2 py-3 transition duration-300 space-y-1 sm:space-y-3 hover:shadow-xl hover:shadow-muted-foreground w-full h-[8.5rem] flex flex-col items-center justify-center rounded-sm border-none",
            className
         )}
      >
         <Image
            alt="Category Image Icon"
            src={category.icon.path}
            width={size ?? 60}
            height={size ?? 60}
         />
         <CardDescription className="text-muted font-sans text-sm leading-tight line-clamp-2 !mt-2 px-2.5">
            {category.name}
         </CardDescription>
      </Card>
   );
}
