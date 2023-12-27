import React from "react";
import { cn } from "@/lib/utils";

type WrapperProps = React.HTMLAttributes<HTMLDivElement> & {
   children: React.ReactNode;
};

// wrap children with maximum width 1280px
export default function MaxWidthWrapper({
   children,
   className,
   ...props
}: WrapperProps) {
   return (
      <div
         className={cn("max-w-screen-xl mx-auto px-2.5 md:px-20", className)}
         {...props}
      >
         {children}
      </div>
   );
}
