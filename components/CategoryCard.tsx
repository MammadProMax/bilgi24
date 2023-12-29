import Image from "next/image";
import React from "react";
import { Card, CardDescription } from "./ui/card";
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
         className={cn(
            "bg-primary text-center px-6 py-3 transition duration-300 space-y-1 sm:space-y-3 hover:shadow-xl hover:shadow-muted-foreground ring-4 ring-secondary w-36 h-32 flex flex-col items-center justify-center rounded-3xl",
            className
         )}
      >
         <Image
            alt="Category Image Icon"
            src={category.icon.path}
            width={size ?? 46}
            height={size ?? 46}
         />
         <CardDescription className="text-muted font-sans max-sm:text-xs ">
            {category.name}
         </CardDescription>
      </Card>
   );
}
