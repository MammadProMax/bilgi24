import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Dot } from "lucide-react";

type FooterContent = {
   title: string;
   subtitles: string[];
};

const footerContent: FooterContent[] = [
   {
      title: "Our Services",
      subtitles: ["Mixed Ads", "Elmas", "Altın", "Gümüş"],
   },
   {
      title: "Application",
      subtitles: ["Android", "iOS"],
   },
   {
      title: "Account",
      subtitles: ["Bireysel", "Kurumsal"],
   },
   {
      title: "Follow Us",
      subtitles: ["instagram", "Facebook"],
   },
   {
      title: "Contact Us",
      subtitles: ["7/24 Destek", "Mesaj Gönder"],
   },
];

export default function Footer() {
   return (
      <div className="w-full bg-primary h-60 pt-9 hidden md:block">
         <MaxWidthWrapper>
            <div className="w-full flex justify-around">
               {footerContent.map((content, index) => (
                  <div key={index} className="flex flex-col gap-y-3">
                     <h6 className="text-lg font-semibold text-primary-foreground">
                        {content.title}
                     </h6>
                     {content.subtitles.map((subtitle, index) => (
                        <div
                           key={index}
                           className="text-sm font-light text-slate-200 flex items-center gap-2"
                        >
                           <div className="rounded-full bg-secondary w-1.5 h-1.5"></div>
                           {subtitle}
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         </MaxWidthWrapper>
      </div>
   );
}
