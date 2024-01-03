import React from "react";
type MessagePageProps = {
   params: {
      locale: string;
   };
   searchParams: {
      tab: string;
   };
};
export default function MessagePage({ searchParams }: MessagePageProps) {
   if (searchParams.tab === "messages") return <div>MessagePage</div>;
   else return null;
}
