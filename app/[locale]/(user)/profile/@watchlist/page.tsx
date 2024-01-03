import React from "react";

type WatchlistProps = {
   params: {
      locale: string;
   };
   searchParams: {
      tab: string;
   };
};

export default function WatchlistPage({ searchParams }: WatchlistProps) {
   if (searchParams.tab === "watchlist") return <div>watchlist</div>;
   else return null;
}
