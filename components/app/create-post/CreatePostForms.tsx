"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CreatePostCategoryForm from "./CreatePostCategoryForm";

const CreatePostRoadmap = dynamic(
   () => import("@/components/app/create-post/CreatePostRoadmap"),
   {
      ssr: false,
      loading: () => <div className="pb-12" />,
   }
);

type Props = {};

const formSchema = z.object({
   categories: z.string(),
});
type FormSchema = z.infer<typeof formSchema>;
const stepperList = ["Category", "Title", "Detail", "Features", "Photo"];

export default function CreatePostForms({}: Props) {
   const [formIndex, setFormIndex] = useState(0);
   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         categories: "",
      },
   });

   const handleSubmitForm = (values: FormSchema) => console.log(values);

   return (
      <>
         <CreatePostRoadmap activeIndex={formIndex} list={stepperList} />
         <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
               {formIndex === 0 && (
                  <CreatePostCategoryForm
                     changeFormIndex={setFormIndex}
                     form={form}
                  />
               )}
            </form>
         </Form>
      </>
   );
}
