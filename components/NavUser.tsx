import { Session } from "@/auth/server";
import React from "react";
import Image from "next/image";

import {
   CreditCard,
   Heart,
   LogOut,
   LucideIcon,
   Mail,
   ShoppingCart,
   User,
   Wallet,
} from "lucide-react";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

type NavUserProps = { session: Session; locale: string };

type UserNavOption = {
   title: string;
   Icon: LucideIcon;
   href: string;
   iconClassName?: string;
   isCompany?: boolean;
};
const userNavOptions = (locale: string): UserNavOption[] => [
   {
      title: "Messages",
      href: `/${locale}/profile/messages`,
      Icon: Mail,
   },
   {
      title: "Watchlist",
      href: `/${locale}/profile/watchlist`,
      Icon: Heart,
   },
   {
      title: "Purchases",
      href: `/${locale}/profile/purchases`,
      Icon: CreditCard,
   },
   {
      title: "Wallet",
      href: `/${locale}/profile/wallet`,
      Icon: Wallet,
   },
   {
      title: "My Ads",
      href: `/${locale}/profile/my-ads`,
      Icon: ShoppingCart,
      isCompany: false,
   },
   {
      title: "My shop",
      href: `/${locale}/profile/my-shop`,
      Icon: ShoppingCart,
      isCompany: true,
   },
];

export default function NavUser({ session, locale }: NavUserProps) {
   return (
      <Popover>
         <Button
            asChild
            variant={"ghost"}
            size="sm"
            className="gap-x-1.5 border-gray-300 border"
         >
            <PopoverTrigger>
               <span className="hidden lg:block max-w-[100px] truncate">
                  {session.firstName} {session.lastName}{" "}
               </span>
               <User className="w-5 h-5" />
            </PopoverTrigger>
         </Button>

         <PopoverContent className="flex flex-col space-y-2 bg-white p-2 rounded-lg shadow-lg max-w-60">
            <Link
               href={`/${locale}/profile`}
               className="flex items-center space-x-4 bg-accent absolute top-0 inset-x-0 py-2 px-3 rounded-md"
            >
               <div className="flex-shrink-0">
                  <Image
                     alt="user image"
                     src={session.image}
                     width={45}
                     height={45}
                     className="rounded-full aspect-square"
                  />
               </div>
               <div>
                  <div className="font-semibold">
                     {formatCurrency(session.balance)}
                  </div>
                  <p className="text-muted-foreground text-sm">
                     Wallet Balance
                  </p>
               </div>
            </Link>
            <div className="w-full pt-[52px]"></div>
            {userNavOptions(locale).map((option, index) => {
               if (
                  typeof option.isCompany === "boolean" &&
                  option.isCompany !== session.isCompany
               )
                  return null;

               return (
                  <div
                     key={index}
                     className="group flex items-center gap-x-2 p-2 rounded-md hover:bg-muted transition-colors duration-200 ease-in-out cursor-pointer"
                  >
                     <option.Icon
                        className="text-muted-foreground w-5 h-5
                  transition duration-200 group-hover:text-foreground/40 group-hover:fill-secondary"
                     />
                     <span className="text-muted-foreground text-sm group-hover:text-primary">
                        {option.title}
                     </span>
                  </div>
               );
            })}
         </PopoverContent>
      </Popover>
   );
}
