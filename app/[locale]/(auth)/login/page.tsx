"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/auth/client";

import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

type Props = {
   params: {
      locale: string;
   };
};

import { confirmLogin } from "./action";

export default function LoginPage({ params }: Props) {
   const { session, isPending } = useSession();
   const formAction = confirmLogin.bind(null, params.locale);

   const router = useRouter();

   useEffect(() => {
      if (session?.userId && !isPending) {
         router.push("/");
      }
   }, [session, isPending, router]);

   return (
      <MaxWidthWrapper className="min-h-screen">
         <div className="w-64 mx-auto">
            <form action={formAction} className="flex flex-col gap-4">
               <div>
                  <label htmlFor="username">username</label>
                  <Input type="text" name="username" />
               </div>
               <div>
                  <label htmlFor="password">password</label>
                  <Input type="password" name="password" />
               </div>
               <Button>confirm</Button>
            </form>
         </div>
      </MaxWidthWrapper>
   );
}
