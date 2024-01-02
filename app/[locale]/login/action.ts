"use server";

import { API_URL } from "@/lib/config";
import { cookies as Cookie } from "next/headers";
import { redirect } from "next/navigation";

export const confirmLogin = async (formData: FormData) => {
   const rawFormData = {
      username: formData.get("username"),
      password: formData.get("password"),
   };

   try {
      const requset = await fetch(API_URL + "auth/login", {
         method: "POST",
         body: JSON.stringify(rawFormData),
         headers: {
            "Content-Type": "application/json",
         },
      });

      const res = await requset.json();
      console.log(res);

      const cookies = Cookie();

      cookies.set({
         name: "user-token",
         value: res.data.token,
         httpOnly: true,
         sameSite: "lax",
         maxAge: 60 * 60 * 24 * 15,
         //  secure : true in production
      });
   } catch (error) {
      console.log(error);
      //   notFound();
   }

   redirect("/");
};
