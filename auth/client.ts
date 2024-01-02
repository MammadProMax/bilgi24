import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Session, getServerSession } from "./server";

// returns client side authorization session
export function useSession() {
   const [session, setSession] = useState<Session | undefined>(undefined);

   const pathname = usePathname();

   useEffect(() => {
      const handleAsync = async () => {
         const _session = await getServerSession();
         setSession(_session);
      };

      handleAsync();

      // refetch for user auth for each path
   }, [pathname]);

   return { session };
}
