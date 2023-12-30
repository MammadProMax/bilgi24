import React from "react";
import Image from "next/image";

import type { Post } from "@/types/main";

import { Card } from "@/components/ui/card";
import { Calendar, Hash, Heart, MapPin, MessageSquareMore } from "lucide-react";
import { Button } from "./ui/button";
import { formatCurrency } from "@/lib/utils";

export default function ShowcaseCard({ post }: { post: Post }) {
   return (
      <Card className="flex items-center gap-x-3 w-full p-3 shadow-md overflow-hidden">
         <Image
            alt="product image"
            src={post.image}
            width={110}
            height={100}
            className="aspect-square object-cover flex-shrink-0"
         />
         <div className="flex-[0.6] space-y-0.5">
            <h6 className=" line-clamp-1 font-semibold ">{post.title}</h6>
            <div className="flex items-center justify-start gap-x-1">
               <MapPin className="w-4 h-4 text-muted" fill="red" />
               <p className="text-muted-foreground line-clamp-1">
                  {post.state.name} / {post.city.name}
               </p>
            </div>
            <div className="flex items-center justify-start gap-x-1">
               <Hash className="w-4 h-4 text-foreground" fill="red" />
               <p className=" text-destructive text-sm">{post.id}</p>
            </div>
            <div className="flex items-center justify-start gap-x-1">
               <Calendar className="w-4 h-4 text-foreground" fill="gold" />
               <p className=" text-gray-800 text-sm">
                  {post.createdAt.split(" ")[0]}
               </p>
            </div>
         </div>
         <div className="flex-[0.4] flex flex-col items-center text-center justify-center gap-2">
            <div className="font-semibold text-sky-600 truncate w-[100px] sm:w-fit">
               {formatCurrency(post.price)}
            </div>
            <div className="flex items-center gap-2">
               <Button
                  className="rounded-full text-secondary w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] p-2"
                  size={"sm"}
                  variant="ghost"
               >
                  <Heart className="w-full" />
               </Button>
               <Button
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
