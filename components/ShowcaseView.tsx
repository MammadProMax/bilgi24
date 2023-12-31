"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";

// context
import { mainPageContext } from "@/components/context/MainPage.context";

// coponents
import ShowcaseCardLinear from "@/components/ShowcaseCardLinear";

import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Skeleton from "react-loading-skeleton";
import ShowcaseLoading from "./ShowcaseLoading";
import ShowcaseCardGrid from "./ShowcaseCardGrid";

type ShowcaseViewProps = {
   // wheater we should display linear or gridLayout cards
   isGridLayout: boolean;
};

export default function ShowcaseView({ isGridLayout }: ShowcaseViewProps) {
   // get posts from apiContext
   const { fetchedData, isLoadingContent, locale } =
      useContext(mainPageContext);
   const [pagination, setPagination] = useState(1);

   //    # display posts if loading state is false
   const itemsLength = 9;
   const posts = fetchedData?.recent_posts ?? [];
   const maxPageLength = Math.ceil(posts.length / itemsLength);

   const startIndex = (pagination - 1) * itemsLength;
   const endIndex = pagination * itemsLength;

   const displayPosts = posts.slice(startIndex, endIndex);

   return isLoadingContent ? (
      <ShowcaseLoading />
   ) : (
      <>
         {/* linear cards div */}
         {!isGridLayout && (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
               {displayPosts.map((post) => (
                  <Link key={post.id} href={`/${locale}/ads/${post.id}`}>
                     <ShowcaseCardLinear post={post} />
                  </Link>
               ))}
            </div>
         )}
         {/* grid layout showcase */}
         {isGridLayout && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 place-items-center max-w-5xl mx-auto">
               {displayPosts.map((post) => (
                  <Link key={post.id} href={`/${locale}/ads/${post.id}`}>
                     <ShowcaseCardGrid post={post} />
                  </Link>
               ))}
            </div>
         )}
         <div className="mt-5">
            <Pagination>
               <PaginationContent>
                  <PaginationItem>
                     <PaginationPrevious
                        href="#showcase"
                        onClick={() => {
                           setPagination((prev) =>
                              prev !== 1 ? prev - 1 : prev
                           );
                        }}
                        className={cn(
                           pagination === 1 &&
                              "pointer-events-none text-gray-600 px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                        )}
                     />
                  </PaginationItem>
                  {new Array(maxPageLength).fill(null).map((_, index) => (
                     <PaginationItem key={index}>
                        <PaginationLink
                           href="#showcase"
                           className={cn(
                              "cursor-pointer",
                              index + 1 === pagination && "border border-border"
                           )}
                           onClick={() => {
                              setPagination(index + 1);
                           }}
                        >
                           {index + 1}
                        </PaginationLink>
                     </PaginationItem>
                  ))}

                  <PaginationItem>
                     <PaginationNext
                        href="#showcase"
                        onClick={() => {
                           setPagination((prev) =>
                              prev !== maxPageLength ? prev + 1 : prev
                           );
                        }}
                        className={cn(
                           pagination === maxPageLength &&
                              "pointer-events-none text-gray-600 px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                        )}
                     />
                  </PaginationItem>
               </PaginationContent>
            </Pagination>
         </div>
      </>
   );
}
