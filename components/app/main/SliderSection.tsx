"use client";

import React, { useContext } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Link from "next/link";
import { mainPageContext } from "@/components/context/MainPage.context";

export default function SliderSection() {
   const {
      fetchedData: data,
      isLoadingContent: isLoading,
      locale,
   } = useContext(mainPageContext);
   // banners fetched from db

   // loading
   const loadingContent = (
      <SkeletonTheme baseColor="#07333f" highlightColor="#2d879e">
         <Skeleton className="w-full md:h-[26rem] aspect-video md:aspect-auto !rounded-xl" />
      </SkeletonTheme>
   );

   return (
      <>
         {isLoading ? (
            loadingContent
         ) : (
            <Swiper
               modules={[Pagination, Autoplay]}
               autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
               }}
               pagination={{ clickable: true }}
               speed={3000}
               loop
               className="rounded-2xl"
            >
               {data?.banners.map((banner) => {
                  const url = new URL(banner.link);
                  const categoryId = url.searchParams.get("categoryId");

                  return (
                     <SwiperSlide key={banner.id}>
                        <Link
                           href={
                              categoryId
                                 ? `${locale}/category/${categoryId}`
                                 : "/"
                           }
                        >
                           <Image
                              alt="banner of main page"
                              src={banner.image}
                              width={1500}
                              height={600}
                              className="object-cover aspect-[16/9] md:aspect-auto md:h-[26rem]"
                           />
                        </Link>
                     </SwiperSlide>
                  );
               })}
            </Swiper>
         )}
      </>
   );
}
