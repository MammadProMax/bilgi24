import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavbar from "@/components/BottomNavbar";

// fonts

export default function RootLayout({
   children,
   params,
}: {
   children: React.ReactNode;
   params: {
      locale: string;
   };
}) {
   return (
      <>
         <nav className="fixed inset-x-0 top-0 z-50">
            <Navbar locale={params.locale} />
         </nav>
         {/* seperator */}
         <div className="pt-[72px] w-full bg-primary" />
         {/* seperator */}

         {children}
         <Footer />

         {/* todo : add a bottom navbar  */}
         <div className="pb-14 md:hidden"></div>
         <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
            <BottomNavbar locale={params.locale} />
         </div>
      </>
   );
}
