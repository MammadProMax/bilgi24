import React from "react";
import {
   FormControl,
   FormField,
   FormLabel,
   FormMessage,
   FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormSchema } from "./ProfileForm";
import type { ControllerRenderProps } from "react-hook-form";

type Props = {
   field: ControllerRenderProps<FormSchema, any>;
   label: string;
   placeholder: string;
};

export default function ProfileFormField({ label, placeholder, field }: Props) {
   return (
      <FormItem>
         <FormLabel>{label}</FormLabel>
         <FormControl>
            <Input {...field} placeholder={placeholder} />
         </FormControl>
         <FormMessage />
      </FormItem>
   );
}
