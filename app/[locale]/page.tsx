import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { useTranslations } from "next-intl";

export default function Home() {
   const t = useTranslations("Index");
   return (
      <main className="">
         <MaxWidthWrapper>
            <h1>{t("İlan Paylaş")}</h1>
         </MaxWidthWrapper>
      </main>
   );
}
