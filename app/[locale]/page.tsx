import { useTranslations } from "next-intl";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SliderSection from "@/components/SliderSection";
import { Suspense } from "react";

export default function Home() {
   const t = useTranslations("Index");

   return (
      <main className="bg-primary">
         <MaxWidthWrapper>
            <section className="text-accent pt-4 pb-12">
               <SliderSection />
            </section>
         </MaxWidthWrapper>
      </main>
   );
}
