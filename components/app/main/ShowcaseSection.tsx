"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

import ShowcaseSorting from "@/components/app/main/ShowcaseSorting";
import ShowcaseLoading from "./ShowcaseLoading";

// lazyloading components
const ShowcaseView = dynamic(
   () => import("@/components/app/main/ShowcaseView"),
   {
      loading: () => <ShowcaseLoading />,
   }
);

export default function ShowcaseSection() {
   const [selectValue, setSelectValue] = useState("newest");
   const [layoutGrid, setLayoutGrid] = useState(false);

   return (
      <>
         {/* header */}
         <div className="py-6 flex flex-col">
            <h2 className="bg-primary text-primary-foreground text-2xl py-4 px-3 font-base font-sans rounded-t-sm">
               Home Page Showcase
            </h2>
            <ShowcaseSorting
               grid={layoutGrid}
               onValueChange={(val) => setSelectValue(val)}
               onGridChange={(val) => setLayoutGrid(val)}
               selectValue={selectValue}
            />
         </div>

         {/* vitrin */}
         <div className="pb-6">
            <ShowcaseView isGridLayout={layoutGrid} />
         </div>
      </>
   );
}
