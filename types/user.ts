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
   };
   city: {
      id: number;
   };
   district: {
      id: number;
   };
};
