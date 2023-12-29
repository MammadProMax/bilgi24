// type files are based on pages

import { Locale } from "./global";

export type Banner = {
   id: number;
   image: string;
   link: string;
   name: string;
};

export type Category = {
   id: number;
   name: "emlak";
   icon: {
      path: string;
      thumb: string;
      alt: string;
      size: string;
   };
   parent_id: string;
   count: number;
};

export type QueryData = {
   data: {
      banners: Banner[];
      categories: Category[];
   };
};

export type MainPageContext = {
   isLoadingContent: boolean;
   fetchedData: QueryData["data"] | undefined;
   locale: Locale;
};
