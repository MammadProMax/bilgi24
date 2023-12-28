"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from "@/components/ui/popover";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

type Language = {
   title: string;
   IconPublicHref: any;
   href: string;
};

const languages: Language[] = [
   {
      title: "TR",
      href: "/tr",
      IconPublicHref: "/images/flags/tr.png",
   },
   {
      title: "EN",
      href: "/en",
      IconPublicHref: "/images/flags/en.png",
   },
   {
      title: "FA",
      href: "/fa",
      IconPublicHref: "/images/flags/fa.png",
   },
   {
      title: "AR",
      href: "/ar",
      IconPublicHref: "/images/flags/ar.png",
   },
   {
      title: "RU",
      href: "/ru",
      IconPublicHref: "/images/flags/ru.png",
   },
   {
      title: "DE",
      href: "/de",
      IconPublicHref: "/images/flags/de.png",
   },
   {
      title: "FR",
      href: "/fr",
      IconPublicHref: "/images/flags/fr.png",
   },
];

export default function NavLang() {
   const [open, setOpen] = useState(false);

   const pathname = usePathname();
   const detectedLanguage = languages.find(
      (lang) => lang.title.toLowerCase() === pathname.slice(1, 3)
   );

   // close popover on click if included in url
   const handleLanguageClick = (href: string) => {
      if (pathname.includes(href)) setOpen(false);
   };

   return (
      <Popover open={open} onOpenChange={(ev) => setOpen(ev)}>
         <Button asChild variant={"ghost"}>
            <PopoverTrigger>
               {detectedLanguage ? (
                  <div className="flex items-center justify-center gap-2">
                     {detectedLanguage.title}
                     <Image
                        alt="image for language selection"
                        src={detectedLanguage.IconPublicHref}
                        width={120}
                        height={120}
                        className="w-6 h-6"
                     />
                  </div>
               ) : null}
            </PopoverTrigger>
         </Button>

         <PopoverContent className="w-20 translate-y-2 p-0">
            <div className="flex flex-col items-center">
               {languages.map((lang) => (
                  <Link
                     onClick={() => handleLanguageClick(lang.href)}
                     href={lang.href}
                     key={lang.title}
                     className="w-full transition flex gap-x-2 hover:bg-muted justify-center items-center py-2"
                  >
                     <div>{lang.title}</div>
                     <Image
                        alt="image for language selection"
                        src={lang.IconPublicHref}
                        width={120}
                        height={120}
                        className="w-6 h-6"
                     />
                  </Link>
               ))}
            </div>
         </PopoverContent>
      </Popover>
   );
}
