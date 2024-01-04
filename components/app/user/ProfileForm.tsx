"use client";

import React from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Dropzone from "react-dropzone";
import { UserProfile } from "@/types/user";

import { Camera } from "lucide-react";
import {
   Form,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ProfileFormField from "./ProfileFormField";
import ProfileCombobox from "./ProfileCombobox";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/config";
import { City } from "@/types/global";

type ProfileFormProps = {
   userData: UserProfile;
   locale: string;
};

const frameworks = [
   {
      value: "next.js",
      label: "Next.js",
      id: 1,
   },
   {
      value: "sveltekit",
      label: "SvelteKit",
      id: 2,
   },
   {
      value: "nuxt.js",
      label: "Nuxt.js",
      id: 3,
   },
   {
      value: "remix",
      label: "Remix",
      id: 12,
   },
   {
      value: "astro",
      label: "Astro",
      id: 23,
   },
];

const formSchema = z.object({
   firstName: z.string().min(3).max(40),
   lastName: z.string().min(3).max(40),
   name: z.string().min(3).max(40),
   number: z
      .string()
      .max(20)
      .regex(/^05[0-9]{9}$/, "Phone number is not valid"),
   fixedNumber: z.string().max(20).nullable(),
   whatsapp: z.string().max(30).nullable(),
   instagram: z.string().max(30).nullable(),
   facebook: z.string().max(30).nullable(),
   telegram: z.string().max(30).nullable(),
   cityId: z.coerce.number(),
   stateId: z.coerce.number(),
   districtId: z.coerce.number(),
});

export type FormSchema = z.infer<typeof formSchema>;

export default function ProfileForm({ userData, locale }: ProfileFormProps) {
   const { data } = useQuery({
      queryKey: ["getCities"],
      queryFn: async () => {
         const request = await fetch(
            API_URL + `data/location?lang=${locale}&country_id=64`
         );
         const res = await request.json();
         return res.data as City[];
      },
   });
   const citiesList =
      data?.map((city) => ({
         value: city.name,
         label: city.name,
         id: city.id,
      })) || [];

   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstName: userData.firstName,
         lastName: userData.lastName,
         name: userData.user_nicename,
         fixedNumber: userData.fixedNumber,
         number: userData.number,
         facebook: userData.facebook,
         instagram: userData.instagram,
         whatsapp: userData.whatsapp,
         telegram: userData.telegram,
         cityId: userData.cityId,
      },
   });

   const handleSubmitForm = async (values: FormSchema) => {
      console.log(alert(JSON.stringify(values, null, 3)));
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <div className="grid p-6 gap-4">
               <div className="w-full bg-accent flex items-center justify-center pt-2 rounded-md">
                  <div className="p-1 border border-border w-fit place-self-center row-span-2 rounded-md relative">
                     <Image
                        src={userData.user_photo}
                        alt="profile image"
                        width={150}
                        height={150}
                     />
                     <Camera className="w-5 h-5 absolute top-1 left-1 text-secondary" />
                  </div>
               </div>

               <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                     <ProfileFormField
                        field={field}
                        label="First name"
                        placeholder="eg. john"
                     />
                  )}
               />

               <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                     <ProfileFormField
                        field={field}
                        label="Last name"
                        placeholder="eg. Doe"
                     />
                  )}
               />
               <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                     <ProfileFormField
                        field={field}
                        label="Phone number"
                        placeholder="eg. 05123456789"
                     />
                  )}
               />
               <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                     <ProfileFormField
                        field={field}
                        label="Landline number"
                        placeholder="eg. 05123456789"
                     />
                  )}
               />
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <ProfileFormField
                        field={field}
                        label="nickname"
                        placeholder="eg. 05123456789"
                     />
                  )}
               />
               <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                     <ProfileFormField
                        field={field}
                        label="Facebook"
                        placeholder="eg. username"
                     />
                  )}
               />
               <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                     <ProfileFormField
                        field={field}
                        label="Whatsapp"
                        placeholder="eg. username"
                     />
                  )}
               />
               <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                     <ProfileFormField
                        field={field}
                        label="Instagram"
                        placeholder="eg. username"
                     />
                  )}
               />
               <FormField
                  control={form.control}
                  name="telegram"
                  render={({ field }) => (
                     <ProfileFormField
                        field={field}
                        label="Telegram"
                        placeholder="eg. username"
                     />
                  )}
               />
               <div className="flex flex-col gap-3">
                  <FormField
                     control={form.control}
                     name="cityId"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>City</FormLabel>
                           <ProfileCombobox
                              id={field.value}
                              onChange={field.onChange}
                              label="City"
                              list={citiesList}
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {/* <FormField
                     control={form.control}
                     name="stateId"
                     render={({ field }) => (
                        <FormItem>
                           <ProfileCombobox
                              onChange={field.onChange}
                              id={field.value}
                              label="State"
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="districtId"
                     render={({ field }) => (
                        <FormItem>
                           <ProfileCombobox
                              onChange={field.onChange}
                              id={field.value}
                              label="District"
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  /> */}
               </div>
            </div>
            <Button className="mx-6 mb-3" type="submit">
               submit
            </Button>
         </form>
      </Form>
   );
}
