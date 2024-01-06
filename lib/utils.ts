import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

// returns turkish currency formatted
export function formatCurrency(value: number) {
   return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 1,
   }).format(value);
}

export const formatDate = (
   value: string,
   option?: Intl.DateTimeFormatOptions
) => new Date(value).toLocaleDateString("en-US");

export const convertToBase64 = (
   file: File,
   callback: (base64: string | ArrayBuffer | null | undefined) => any
) => {
   const reader = new FileReader();
   reader.onload = (ev) => {
      const base64String = ev.target?.result;
      callback(base64String);
   };

   reader.readAsDataURL(file);
};
