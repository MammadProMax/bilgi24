import { Session } from "@/auth/server";
import React from "react";
import Image from "next/image";

import {
   CreditCard,
   Heart,
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

type NavUserProps = { session: Session; locale: string };

type UserNavOption = {
   title: string;
   Icon: LucideIcon;
   href: string;
   iconClassName?: string;
};
const userNavOptions = (locale: string): UserNavOption[] => [
   {
      title: "Messages",
      href: `/${locale}/profile?tab=message`,
      Icon: Mail,
   },
   {
      title: "Watchlist",
      href: `/${locale}/profile?tab=message`,
      Icon: Heart,
   },
   {
      title: "Purchases",
      href: `/${locale}/profile?tab=message`,
      Icon: CreditCard,
   },
   {
      title: "Wallet",
      href: `/${locale}/profile?tab=message`,
      Icon: Wallet,
   },
   {
      title: "My shop",
      href: `/${locale}/profile?tab=message`,
      Icon: ShoppingCart,
   },
];

export default function NavUser({ session, locale }: NavUserProps) {
   return (
      <Popover>
         <Button asChild variant={"ghost"} size="sm" className="gap-x-1.5">
            <PopoverTrigger>
               <span className="hidden lg:block">
                  {session.firstName} {session.lastName}{" "}
               </span>
               <User className="w-5 h-5" />
            </PopoverTrigger>
         </Button>

         <PopoverContent className="flex flex-col space-y-2 bg-white p-2 rounded-lg shadow-lg max-w-60">
            <div className="flex items-center space-x-4 bg-accent absolute top-0 inset-x-0 p-2 rounded-md">
               <div className="flex-shrink-0">
                  <Image
                     alt="user image"
                     src={session.image}
                     width={45}
                     height={45}
                     className="rounded-full"
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
            </div>
            <div className="w-full pt-[52px]"></div>
            {userNavOptions(locale).map((option, index) => (
               <div
                  key={index}
                  className="flex items-center gap-x-2 p-2 rounded-md hover:bg-muted transition-colors duration-200 ease-in-out cursor-pointer"
               >
                  <option.Icon className="text-muted-foreground w-5 h-5" />
                  <span className="text-muted-foreground text-sm">
                     {option.title}
                  </span>
               </div>
            ))}
         </PopoverContent>
      </Popover>
   );
}
