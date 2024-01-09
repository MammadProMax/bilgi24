"use client";

import React, { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Session } from "@/auth/server";

import { getMessages } from "@/actions/user";
import { Chat } from "@/types/user";

type MessagesContextProps = { session: Session; children: React.ReactNode };

export const messagesContext = createContext<{
   data: Chat[] | undefined;
   isLoadingChats: boolean;
}>({
   data: [],
   isLoadingChats: false,
});

export default function MessagesContext({
   session,
   children,
}: MessagesContextProps) {
   const { data, isLoading } = useQuery({
      queryKey: ["getUserMessages", session.userId],
      queryFn: () => getMessages(session.token),
   });

   return (
      <messagesContext.Provider value={{ data, isLoadingChats: isLoading }}>
         {children}
      </messagesContext.Provider>
   );
}
