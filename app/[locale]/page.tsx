import AdsSVG from "@/public/images/offer-pic.svg";
import { useTranslations } from "next-intl";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SliderSection from "@/components/SliderSection";
import CategoriesSection from "@/components/CategoriesSection";

import MainPageContext from "@/components/context/MainPage.context";
import { Locale } from "@/types/global";
import Image from "next/image";
import ShowcaseSection from "@/components/ShowcaseSection";

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
         <>
            <section className="text-accent pt-[88px] pb-12 bg-primary">
               <MaxWidthWrapper>
                  <SliderSection />
               </MaxWidthWrapper>
            </section>
            <section>
               <MaxWidthWrapper className="max-w-screen-xl">
                  <CategoriesSection />
                  <div className="bg-muted w-full h-28 mb-5 flex flex-row-reverse items-center justify-between px-2.5 sm:px-10 pt-2">
                     <h5 className="font-semibold text-foreground text-xl">
                        Comming soon
                     </h5>
                     <Image
                        src={"/images/offer-pic.svg"}
                        alt="Offer Ads icon"
                        width={168}
                        height={82}
                     />
                  </div>
               </MaxWidthWrapper>
            </section>
            <section>
               <MaxWidthWrapper className="max-w-screen-xl">
                  <ShowcaseSection />
               </MaxWidthWrapper>
            </section>
         </>
      </MainPageContext>
   );
}
