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
   name: string;
   icon: {
      path: string;
      thumb: string;
      alt: string;
      size: string;
   };
   parent_id: string;
   count: number;
};

export type Post = {
   id: string;
   title: string;
   state: { name: string };
   city: { name: string };
   price: number;
   createdAt: string;
   image: string;
};

export type QueryData = {
   data: {
      banners: Banner[];
      categories: Category[];
      recent_posts: Post[];
   };
};

export type MainPageContext = {
   isLoadingContent: boolean;
   fetchedData: QueryData["data"] | undefined;
   locale: Locale;
};
