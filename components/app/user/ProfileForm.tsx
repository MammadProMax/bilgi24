"use client";

import React, { useEffect, useState } from "react";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/lib/config";
import { City, District, State } from "@/types/global";
import { useLocation } from "@/hooks/useLocation";

type ProfileFormProps = {
   userData: UserProfile;
   locale: string;
};

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
   const [locationIds, setLocationIds] = useState({
      stateId: userData.state.id,
      districtId: userData.city.id,
      neighborId: userData.district.id,
   });

   const { districtList, neighborList, stateList } = useLocation({
      stateId: locationIds.stateId,
      districtId: locationIds.districtId,
   });

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
         // there is issue in backend where data of city and districts and state passed misplaced
         cityId: userData.city.id,
         districtId: userData.district.id,
         stateId: userData.state.id,
      },
   });

   const handleSubmitForm = async (values: FormSchema) => {
      alert(JSON.stringify(values, null, 3));
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmitForm)} className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 md gap-4">
               <div className="w-full md:row-span-3 bg-accent flex items-center justify-center pt-2 rounded-md">
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
            </div>
            <div className="flex flex-wrap md:col-span-3 gap-5 mb-4 mt-6">
               {/*there is issue in backend where data of city and districts and state passed  misplaced */}
               <FormField
                  control={form.control}
                  name="stateId"
                  render={({ field }) => (
                     <FormItem className="flex flex-col">
                        <FormLabel>City</FormLabel>
                        <ProfileCombobox
                           id={locationIds.stateId}
                           onChange={field.onChange}
                           onLocationChange={(stateId) =>
                              setLocationIds({
                                 stateId,
                                 districtId: 0,
                                 neighborId: 0,
                              })
                           }
                           label="City"
                           list={stateList}
                        />
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {!!locationIds.stateId && (
                  <FormField
                     control={form.control}
                     name="cityId"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>District</FormLabel>
                           <ProfileCombobox
                              id={locationIds.districtId}
                              onChange={field.onChange}
                              onLocationChange={(districtId) =>
                                 setLocationIds({
                                    ...locationIds,
                                    districtId,
                                    neighborId: 0,
                                 })
                              }
                              label="District"
                              list={districtList}
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               )}
               {!!locationIds.districtId && (
                  <FormField
                     control={form.control}
                     name="districtId"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>Neighborhood</FormLabel>
                           <ProfileCombobox
                              id={locationIds.neighborId}
                              onChange={field.onChange}
                              onLocationChange={(neighborId) =>
                                 setLocationIds({ ...locationIds, neighborId })
                              }
                              label="Neighborhood"
                              list={neighborList}
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               )}
            </div>
            <Button type="submit">submit</Button>
         </form>
      </Form>
   );
}
