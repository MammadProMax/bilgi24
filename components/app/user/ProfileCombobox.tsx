import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";

//  searchs are based on values
//  setItem are based on ids
//  labels are for interface

type ComboboxItem = {
   value: string;
   id: number;
   label: string;
};

type ProfileComboboxProps = {
   id: number;
   onChange: (id: number) => void;
   list: ComboboxItem[];
   label: string;
   onLocationChange: (val: number) => void;
};

export default function ProfileCombobox({
   id,
   onChange,
   list,
   label,
   onLocationChange,
}: ProfileComboboxProps) {
   const [open, setOpen] = React.useState(false);

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="w-[200px] justify-between"
            >
               {id
                  ? list.find((item) => item.id === id)?.label
                  : `Select ${label}...`}
               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[200px] p-0">
            <Command>
               <CommandInput placeholder={`Search ${label}...`} />
               {list.length !== 0 && (
                  <CommandEmpty>No {label} found.</CommandEmpty>
               )}
               <CommandGroup className="max-h-56 overflow-auto scroll-scondary">
                  {list.map((item) => (
                     <CommandItem
                        key={item.id}
                        value={item.value}
                        onSelect={() => {
                           const currentId = item.id;
                           onChange(currentId === id ? 0 : currentId);
                           onLocationChange(currentId === id ? 0 : currentId);
                           setOpen(false);
                        }}
                     >
                        <Check
                           className={cn(
                              "mr-2 h-4 w-4",
                              id === item.id ? "opacity-100" : "opacity-0"
                           )}
                        />
                        {item.label}
                     </CommandItem>
                  ))}

                  {list.length === 0 && (
                     <div className="text-sm text-center my-6">
                        No {label} found.
                     </div>
                  )}
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   );
}
