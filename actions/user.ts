"use server";

import { FormSchema as UpdateProfileSchema } from "@/components/app/user/ProfileForm";
import { API_URL } from "@/lib/config";
import { Category } from "@/types/main";
import { Chat } from "@/types/user";
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

export const getMessages = async (token: String) => {
   const req = await fetch(API_URL + `chat/list/?lang=EN&auth=${token}`);
   const res = await req.json();
   return res.data.chats as Chat[];
};

export const getCategories = async function (locale: string, id: number = 0) {
   try {
      const req = await fetch(API_URL + `data/categories/${id}?lang=${locale}`);
      const res = await req.json();
      return res.data as Category[];
   } catch (error) {
      throw new Error("something went Wrong");
   }
};
