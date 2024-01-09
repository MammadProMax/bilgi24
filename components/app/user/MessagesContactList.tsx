"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

import { User } from "lucide-react";

import { messagesContext } from "@/components/context/Messages.context";
import Image from "next/image";

type Props = {};

export default function MessagesContactList({}: Props) {
   const { data: chats, isLoadingChats } = useContext(messagesContext);
   const locale = useLocale();
   return (
      <>
         {isLoadingChats ? (
            <div>loading</div>
         ) : (
            chats?.map((chat) => (
               <Link
                  key={chat.id}
                  href={`/${locale}/profile/messages?messageId=${chat.id}`}
                  className="flex justify-between items-center w-full p-3 rounded-md hover:bg-muted shadow-sm border border-border"
               >
                  <div className="flex gap-3">
                     <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-full flex justify-center items-center">
                        {chat.contact.user_photo ? (
                           <Image
                              src={chat.contact.user_photo}
                              alt="contact profile image"
                              width={100}
                              height={100}
                              className="w-full h-full object-cover ring-1 ring-blue-500 rounded-full"
                           />
                        ) : (
                           <User />
                        )}
                     </div>
                     {/*  */}
                     <div className="flex-col">
                        <h3 className="text-sm sm:text-lg font-semibold">
                           hello world
                        </h3>
                        <p className="text-xs text-muted-foreground">
                           latest message
                        </p>
                     </div>
                  </div>
                  <div className="h-fit self-start mt-1 text-[0.6rem] sm:text-xs text-muted-foreground">
                     <span className="h-fit">01/10/2024</span>
                  </div>
               </Link>
            ))
         )}
      </>
   );
}
