"use client";

import React, { useContext } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import Skeleton from "react-loading-skeleton";

import { mainPageContext } from "@/components/context/MainPage.context";
import CategoryCard from "./CategoryCard";
import { cn } from "@/lib/utils";

export default function CategoriesSection() {
   // categories fetched by api
   const { fetchedData, isLoadingContent } = useContext(mainPageContext);

   const loopLoading = new Array(18).fill(null);
   const loadingContent = (
      <div className="w-full mx-auto pb-6 grid xl:grid-cols-9 grid-cols-3 gap-x-5 gap-y-8">
         {loopLoading.map((_, index) => (
            <div
               key={index}
               className={cn({
                  "hidden sm:block": index > 5,
                  "hidden sm:hidden xl:block": index > 8,
               })}
            >
               <Skeleton className={cn("w-[150px] h-[136px] !rounded-md")} />
            </div>
         ))}
      </div>
   );

   return (
      <div className="pb-9 pt-10 space-y-6">
         <h1 className="bg-primary text-primary-foreground text-center text-3xl py-2 font-semibold font-sans rounded-sm border-b-4 border-b-secondary">
            Select Category
         </h1>

         {isLoadingContent ? (
            loadingContent
         ) : (
            <>
               <div className="w-full mx-auto pb-6 lg:grid xl:grid-cols-9 md:grid-cols-6 hidden gap-x-5 gap-y-8">
                  {fetchedData?.categories.map((category) => (
                     <Link
                        key={category.id}
                        href={"/"}
                        className="w-full place-self-center"
                     >
                        <CategoryCard category={category} />
                     </Link>
                  ))}
               </div>
               {/* category slider for mobile view */}
               <div className="lg:hidden w-full pt-6 xl:rounded-lg">
                  <Swiper
                     modules={[Pagination, Grid]}
                     grid={{ rows: 3 }}
                     spaceBetween={35}
                     pagination={{
                        clickable: true,
                        bulletClass:
                           "swiper-pagination-bullet !translate-y-1.5",
                     }}
                     slidesPerView={2}
                     breakpoints={{
                        938: {
                           slidesPerView: 5,
                           grid: { rows: 2 },
                           spaceBetween: 25,
                        },
                        781: {
                           slidesPerView: 4,
                           grid: { rows: 2 },
                        },
                        640: {
                           slidesPerView: 3,
                           grid: { rows: 2 },
                        },
                     }}
                     className="h-[500px] sm:h-[320px] !pb-10 !px-3"
                  >
                     {fetchedData?.categories.map((category) => (
                        <SwiperSlide key={category.id}>
                           <Link href={"/"} className="w-full">
                              <CategoryCard category={category} />
                           </Link>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
            </>
         )}
      </div>
   );
}
