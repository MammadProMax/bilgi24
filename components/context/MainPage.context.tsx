"use client";

import { QueryData } from "@/types/main";
import React, { createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/lib/config";
import type { MainPageContext as Context } from "@/types/main";
import type { Locale } from "@/types/global";

type ContextProps = {
   children: React.ReactNode;
   locale: Locale;
};

export const mainPageContext = createContext<Context>({
   isLoadingContent: false,
   fetchedData: {
      banners: [],
      categories: [],
      recent_posts: [],
   },
   locale: "tr",
});

export default function MainPageContext({ children, locale }: ContextProps) {
   const { data, isLoading, refetch, isRefetching } = useQuery({
      queryKey: ["mainPageQuery"],
      queryFn: async () => {
         const request = await fetch(`${API_URL}page/home?lang=${locale}`);
         const data = await request.json();
         return (data as QueryData).data;
      },
      staleTime: Infinity,
   });

   useEffect(() => {
      refetch();
   }, [locale, refetch]);

   return (
      <mainPageContext.Provider
         value={{
            fetchedData: data,
            isLoadingContent: isLoading || isRefetching,
            locale: locale,
         }}
      >
         {children}
      </mainPageContext.Provider>
   );
}
