"use client";

import React, { useContext } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { mainPageContext } from "@/components/context/MainPage.context";
import CategoryCard from "./CategoryCard";
import { Grid, Pagination } from "swiper/modules";

export default function CategoriesSection() {
   // categories fetched by api
   const { fetchedData, isLoadingContent } = useContext(mainPageContext);
   return (
      <div className="pb-9 py-20 space-y-6">
         <h1 className="text-center text-4xl font-semibold font-sans">
            Select Category
         </h1>

         <div className="bg-muted w-full py-12 px-12 xl:rounded-lg lg:grid 2xl:grid-cols-9 lg:grid-cols-6 hidden gap-x-2 gap-y-8">
            {fetchedData?.categories.map((category) => (
               <Link
                  key={category.id}
                  href={"/"}
                  className="w-fit place-self-center"
               >
                  <CategoryCard category={category} />
               </Link>
            ))}
         </div>
         <div className="lg:hidden bg-muted w-full py-12 px-6 sm:px-12 xl:rounded-lg">
            <Swiper
               modules={[Pagination, Grid]}
               grid={{ rows: 3 }}
               spaceBetween={45}
               pagination={{
                  clickable: true,
               }}
               slidesPerView={2}
               breakpoints={{
                  938: {
                     slidesPerView: 5,
                     grid: { rows: 2 },
                  },
                  781: {
                     slidesPerView: 4,
                     grid: { rows: 2 },
                  },
                  646: {
                     slidesPerView: 3,
                     grid: { rows: 2 },
                  },
                  482: {
                     slidesPerView: 3,
                     grid: { rows: 3 },
                  },
               }}
               className="h-[450px] sm:h-[380px] !py-6 !pb-16 !px-3"
            >
               {fetchedData?.categories.map((category) => (
                  <SwiperSlide key={category.id}>
                     <Link href={"/"} className="w-fit">
                        <CategoryCard
                           category={category}
                           className="max-sm:w-28 max-sm:h-28 "
                           size={35}
                        />
                     </Link>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   );
}
