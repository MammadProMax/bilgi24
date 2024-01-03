import React from "react";

type ProfilePageProps = {
   params: {
      locale: string;
   };
   searchParams: {
      tab: string;
   };
};

export default function ProfilePage({
   params,
   searchParams,
}: ProfilePageProps) {
   if (searchParams.tab === undefined) return <div>page</div>;
   else return null;
}
