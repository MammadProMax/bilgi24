"use server";

import { API_URL } from "@/lib/config";
import { cookies } from "next/headers";

export type Session = {
   userId: string;
   email: string;
   firstName: string;
   lastName: string;
   image: string;
   balance: number;
   isCompany: boolean;
};

// returns server side authorization session
export const getServerSession: () => Promise<
   Session | undefined
> = async () => {
   const cookie = cookies();
   const token = cookie.get("user-token")?.value;

   const authRequest = await fetch(API_URL + `auth/user?lang=EN&auth=${token}`);
   const authResponse = await authRequest.json();

   const data = authResponse.data;

   return {
      userId: data.id,
      email: data.user_email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.user_photo,
      balance: data.balance,
      isCompany: data.isCompany,
   };
};
