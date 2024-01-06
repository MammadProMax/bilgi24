"use server";

import { FormSchema as UpdateProfileSchema } from "@/components/app/user/ProfileForm";
import { API_URL } from "@/lib/config";
import { cookies } from "next/headers";

export const updateProfile = async (values: UpdateProfileSchema) => {
   const token = cookies().get("user-token")?.value;
   await fetch(API_URL + "auth/update?lang=EN", {
      body: JSON.stringify({
         ...values,
         auth: token,
      }),
      headers: {
         "Content-Type": "application/json",
      },
      method: "POST",
   });
};
export const updateProfileImage = async (formData: FormData) => {
   const token = cookies().get("user-token")?.value;
   formData.append("auth", token ?? "");
   const req = await fetch(API_URL + "auth/update-image", {
      body: formData,
      method: "POST",
   });

   const data = await req.json();
   return data;
};
