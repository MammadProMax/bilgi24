import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ShowcaseLoading() {
   return (
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
         {new Array(6).fill(null).map((_, index) => (
            <div
               key={index}
               className="flex shrink-0 items-center gap-x-3 w-full p-3 shadow-md overflow-hidden rounded-md border border-border"
            >
               <div className="w-28 h-28 relative bottom-1">
                  <Skeleton className="w-full h-full" />
               </div>
               <div className="flex-1">
                  <Skeleton className="!w-32 h-3" />
                  <Skeleton className="!w-16 h-3" />
                  <Skeleton className="!w-16 h-3" />
                  <Skeleton className="!w-28 h-3" />
               </div>

               <div className="flex flex-1 items-center gap-4 justify-center">
                  <Skeleton className="!w-8 h-8 !rounded-full" />
                  <Skeleton className="!w-8 h-8 !rounded-full" />
               </div>
            </div>
         ))}
      </div>
   );
}
