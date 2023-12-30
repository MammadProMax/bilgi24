"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";

// context
import { mainPageContext } from "./context/MainPage.context";
import ShowcaseCard from "./ShowcaseCard";

// coponents

type ShowcaseViewProps = {
   // wheater we should display linear or gridLayout cards
   isGridLayout: boolean;
};

export default function ShowcaseView({ isGridLayout }: ShowcaseViewProps) {
   // get posts from apiContext
   const { fetchedData, isLoadingContent } = useContext(mainPageContext);
   const [pagination, setPagination] = useState(1);

   //    display posts if loading state is false
   const posts = fetchedData?.recent_posts ?? [];
   const postsLength = posts.length;

   const startIndex = (pagination - 1) * 9;
   const endIndex = pagination * 9;

   const displayPosts = posts.slice(startIndex, endIndex);

   return isLoadingContent ? (
      "loading"
   ) : (
      <>
         {/* linear cards div */}
         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {displayPosts.map((post) => (
               <ShowcaseCard key={post.id} post={post} />
            ))}
         </div>
      </>
   );
}
