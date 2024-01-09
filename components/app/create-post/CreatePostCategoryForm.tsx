import React, { useState } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/actions/user";

import { Loader2 } from "lucide-react";
import { Category } from "@/types/main";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Selectgroup from "./CreatePostSelectGroup";
import { UseFormReturn } from "react-hook-form";

type PostCategoryProps = {
   changeFormIndex: React.Dispatch<React.SetStateAction<number>>;
   form: UseFormReturn<
      {
         categories: string;
      },
      any,
      undefined
   >;
};

const extendCategory = (categories: Category[]) =>
   categories.map((category) => ({
      value: category.id,
      label: category.name,
      key: category.id,
   }));

export default function CreatePostCategoryForm({
   changeFormIndex,
   form,
}: PostCategoryProps) {
   // states
   const locale = useLocale();
   const { data: mainCategories, isLoading: isCategoryLoading } = useQuery({
      queryKey: ["getCategories"],
      queryFn: () => getCategories(locale),
   });
   const [categoryIds, setCategoryIds] = useState<(number | undefined)[]>([
      undefined,
   ]);
   const [subcategories, setSubcategories] = useState<Category[][]>([]);
   const [isFetchingCategory, setIsFetchingCategory] = useState(false);
   const [finishedCategory, setFinishedCategory] = useState(false);

   // operators
   const createSubCategory = async (id: number, startIndex: number) => {
      // fetch data from backend
      setFinishedCategory(false);
      setIsFetchingCategory(true);
      try {
         const data = await getCategories(locale, id);
         if (data.length === 0) {
            setIsFetchingCategory(false);
            setFinishedCategory(true);
            return;
         }

         const newSubCategories = subcategories.toSpliced(
            startIndex,
            subcategories.length - startIndex,
            data
         );

         setIsFetchingCategory(false);
         setSubcategories(newSubCategories);
      } catch (error) {
         toast.error("something went wrong");
      }
   };

   // jsx
   return (
      <div className="max-w-4xl mx-auto px-8 space-y-8">
         <div className="flex flex-wrap gap-3">
            <Selectgroup
               label="Category"
               selectList={extendCategory(mainCategories ?? []) ?? []}
               onChange={(val) => {
                  setCategoryIds([val]);
                  createSubCategory(val, 0);
               }}
               value={categoryIds[0]?.toString()}
               isLoadingList={isCategoryLoading}
            />

            {subcategories.map((categories, index) => (
               <Selectgroup
                  key={categories[0].id}
                  label="Subcategory"
                  selectList={extendCategory(categories) ?? []}
                  onChange={(val) => {
                     const newCategoryIds = categoryIds.toSpliced(
                        index + 1,
                        1,
                        val
                     );
                     setCategoryIds(newCategoryIds);
                     createSubCategory(val, index + 1);
                  }}
                  value={categoryIds[index + 1]?.toString()}
                  isLoadingList={isCategoryLoading}
               />
            ))}

            {isFetchingCategory && (
               <div className="flex justify-center items-center w-20">
                  <Loader2 className="w-5 h-5 animate-spin" />
               </div>
            )}
         </div>
         {finishedCategory && (
            <Button
               type="button"
               className="px-16"
               onClick={() => {
                  changeFormIndex((pre) => pre + 1);
                  form.setValue("categories", `[${categoryIds}]`);
               }}
            >
               Next
            </Button>
         )}
      </div>
   );
}
