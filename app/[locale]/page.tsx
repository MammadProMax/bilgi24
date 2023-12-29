import { useTranslations } from "next-intl";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SliderSection from "@/components/SliderSection";
import CategoriesSection from "@/components/CategoriesSection";

import MainPageContext from "@/components/context/MainPage.context";
import { Locale } from "@/types/global";

type PageProps = {
   params: {
      locale: Locale;
   };
};

export default function Home({ params }: PageProps) {
   const t = useTranslations("Index");

   return (
      <MainPageContext locale={params.locale}>
         {/* page context */}
         <main>
            <section className="text-accent pt-4 pb-12 bg-primary">
               <MaxWidthWrapper>
                  <SliderSection />
               </MaxWidthWrapper>
            </section>
            <section>
               <MaxWidthWrapper className="max-w-[1800px] md:px-0 xl:px-6">
                  <CategoriesSection />
               </MaxWidthWrapper>
            </section>
         </main>
      </MainPageContext>
   );
}
