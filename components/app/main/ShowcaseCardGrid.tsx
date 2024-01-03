import React from "react";
import Image from "next/image";

import type { Post } from "@/types/main";

import { Card } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

import { formatCurrency, formatDate } from "@/lib/utils";

export default function ShowcaseCardGrid({ post }: { post: Post }) {
   const slugToTitle = (slug: string) => slug.split("-").join(" ");

   return (
      <Card className="flex flex-col justify-between gap-x-3 w-fit h-[420px] p-4 shadow-md space-y-3 overflow-hidden transition duration-300 hover:-translate-y-2">
         <div className="w-full flex flex-col gap-4">
            <Image
               alt="product image"
               src={post.image}
               width={250}
               height={250}
               className="aspect-square object-cover rounded-md"
            />
            <h6 className="font-semibold text-sm sm:text-base line-clamp-2 max-w-60">
               {slugToTitle(post.slug)}
            </h6>
         </div>

         <div className="flex justify-between items-center max-w-64 w-full">
            <div className="space-y-2.5 sm:space-y-1.5">
               <div className="flex items-center justify-start gap-x-1">
                  <MapPin
                     className="w-3 h-3 sm:w-4 sm:h-4 text-muted"
                     fill="red"
                  />
                  <p className="text-muted-foreground line-clamp-1 text-xs sm:text-sm">
                     {post.state.name} / {post.city.name}
                  </p>
               </div>

               <div className="flex items-center justify-start gap-x-1">
                  <Calendar
                     className="w-3 h-3 sm:w-4 sm:h-4 text-foreground"
                     fill="gold"
                  />
                  <p className="text-gray-800 text-xs sm:text-sm">
                     {formatDate(post.createdAt, {
                        year: "numeric",
                        day: "2-digit",
                        month: "2-digit",
                     })}
                  </p>
               </div>
            </div>

            <div className="font-semibold text-sky-600 sm:w-fit text-sm sm:text-base self-end">
               {formatCurrency(post.price)}
            </div>
         </div>
      </Card>
   );
}
