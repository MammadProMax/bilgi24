import React from "react";
import Image from "next/image";

import type { Post } from "@/types/main";

import { Card } from "@/components/ui/card";
import { Calendar, Hash, Heart, MapPin, MessageSquareMore } from "lucide-react";
import { Button } from "../../ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ShowcaseCardLinear({ post }: { post: Post }) {
   const slugToTitle = (slug: string) => slug.split("-").join(" ");

   return (
      <Card className="flex items-center gap-x-3 w-full p-3 shadow-md overflow-hidden transition duration-300 hover:translate-x-2">
         <Image
            alt="product image"
            src={post.image}
            width={110}
            height={100}
            className="aspect-square object-cover flex-shrink-0 rounded-md"
         />
         <div className="flex-[0.6] space-y-1.5 sm:space-y-0.5">
            <h6 className="line-clamp-1 font-semibold text-sm sm:text-base">
               {slugToTitle(post.slug)}
            </h6>
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
               <Hash
                  className="w-3 h-3 sm:w-4 sm:h-4 text-foreground"
                  fill="red"
               />
               <p className=" text-destructive text-xs sm:text-sm">{post.id}</p>
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
         <div className="flex-[0.4] flex flex-col-reverse relative top-[15px] sm:top-2.5 items-center text-center justify-center gap-2">
            <div className="font-semibold text-sky-600 truncate w-[100px] sm:w-fit text-sm sm:text-base">
               {formatCurrency(post.price)}
            </div>
            <div className="flex items-center gap-2">
               <Button
                  onClick={(ev) => ev.preventDefault()}
                  className="rounded-full text-secondary w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] p-2"
                  size={"sm"}
                  variant="ghost"
               >
                  <Heart className="w-full" />
               </Button>
               <Button
                  onClick={(ev) => ev.preventDefault()}
                  className="rounded-full text-secondary w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] p-2"
                  variant="ghost"
               >
                  <MessageSquareMore className="w-full" />
               </Button>
            </div>
         </div>
      </Card>
   );
}
