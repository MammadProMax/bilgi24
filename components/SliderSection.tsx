"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import type { Banner } from "@/types/banners";
import Link from "next/link";

type QueryData = {
   data: {
      banners: Banner[];
   };
};

export default function SliderSection() {
   const pathname = usePathname();
   const language = pathname.slice(1, 3);

   const { data, isLoading } = useQuery({
      queryKey: ["getMainPageBanners"],
      queryFn: async () => {
         const requset = await fetch(
            `https://bilgi24.net/api/v1/page/home?lang=${language}`
         );
         const data = await requset.json();
         return (data as QueryData).data;
      },
   });

   const loadingContent = (
      <SkeletonTheme baseColor="#07333f" highlightColor="#2d879e">
         <Skeleton className="w-full md:h-[26rem] aspect-video md:aspect-auto" />
      </SkeletonTheme>
   );

   return (
      <>
         {isLoading ? (
            loadingContent
         ) : (
            <Swiper
               autoplay={{ delay: 4500, disableOnInteraction: false }}
               pagination={{ clickable: true }}
               navigation
               modules={[Navigation, Pagination, Autoplay]}
               className="hero-section-slider-change-button"
            >
               {data?.banners.map((banner) => {
                  const url = new URL(banner.link);
                  const categoryId = url.searchParams.get("categoryId");

                  return (
                     <SwiperSlide key={banner.id} className="">
                        <Link
                           href={categoryId ? `/category/${categoryId}` : "/"}
                        >
                           <Image
                              alt="banner of main page"
                              src={banner.image}
                              width={1500}
                              height={600}
                              className="object-cover aspect-[16/9] md:aspect-auto md:h-[26rem]  rounded-lg"
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
