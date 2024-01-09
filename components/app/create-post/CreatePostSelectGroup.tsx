import React from "react";

import {
   Select,
   SelectItem,
   SelectTrigger,
   SelectValue,
   SelectGroup,
   SelectContent,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/utils";

type SelectableItem = {
   value: string | number;
   key: string | number;
   label: string;
};

type SelectGroupProps = {
   selectList: SelectableItem[];
   label: string;
   value: string | undefined;
   onChange: (val: number) => void;
   isLoadingList: boolean;
};

export default function CreatePostSelectGroup({
   selectList,
   label,
   onChange,
   value,
   isLoadingList,
}: SelectGroupProps) {
   return (
      <Select onValueChange={(val) => onChange(+val)} value={value}>
         <SelectTrigger className="sm:w-full md:w-[250px]">
            <SelectValue placeholder={`Select a ${label}`} />
         </SelectTrigger>
         <SelectContent className="max-h-[20rem]">
            {isLoadingList ? (
               <div className="py-3 grid place-content-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
               </div>
            ) : (
               <SelectGroup>
                  {selectList.map((select) => (
                     <SelectItem key={select.key} value={`${select.value}`}>
                        {capitalizeFirstLetter(select.label)}
                     </SelectItem>
                  ))}
               </SelectGroup>
            )}
         </SelectContent>
      </Select>
   );
}
