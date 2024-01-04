import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProfileForm from "@/components/app/user/ProfileForm";
import { API_URL } from "@/lib/config";
import { UserProfile } from "@/types/user";
import { cookies } from "next/headers";
import React from "react";

type ProfilePageProps = {
   params: {
      locale: string;
   };
};

const userProfile = async () => {
   const token = cookies().get("user-token")?.value;
   const request = await fetch(API_URL + `auth/user?lang=en&auth=${token}`, {
      next: {
         tags: ["user-profile"],
      },
   });
   const data = await request.json();
   return data.data as UserProfile;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
   const userData = await userProfile();

   return (
      <section className="py-6 px-3 md:px-0 md:py-12">
         <MaxWidthWrapper className="max-w-screen-2xl">
            <h1 className="text-3xl font-semibold">Edit your Profile</h1>
            <div className="border border-border shadow-md rounded-md w-full mt-10">
               <ProfileForm userData={userData} locale={params.locale} />
            </div>
         </MaxWidthWrapper>
      </section>
   );
}
