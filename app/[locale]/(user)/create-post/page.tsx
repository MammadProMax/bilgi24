import React from "react";
import dynamic from "next/dynamic";
import CreatePostForms from "@/components/app/create-post/CreatePostForms";

export default function CreatePostPage() {
   return (
      <section>
         <CreatePostForms />
      </section>
   );
}
