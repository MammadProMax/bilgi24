import { Post } from "./main";

export type UserProfile = {
   id: number;
   number: string;
   fixedNumber: string;
   balance: number;
   whatsapp: string;
   telegram: string;
   instagram: string;
   facebook: string;
   user_email: string;
   user_nicename: string;
   user_photo: string;
   firstName: string;
   lastName: string;
   isCompany: Boolean;
   state: {
      id: number;
   } | null;
   city: {
      id: number;
   } | null;
   district: {
      id: number;
   } | null;
};

export type Message = {
   id: number;
   content: string;
   lang: string;
   type: string;
   reply: number;
   isRead: boolean;
   isDeleted: boolean;
   isMe: boolean;
   date: number;
   time: string;
   chatId: number;
   createdAt: string;
};

export type Chat = {
   id: number;
   user: UserProfile;
   contact: UserProfile;
   ad: Post;
   isArchived: 0 | 1;
   messages: Message[];
};
