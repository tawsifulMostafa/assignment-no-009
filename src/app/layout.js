import Navbar from "@/Components/Navbar/Navbar";
import "./globals.css";
import { Toaster } from "sonner";
import HomeBanner from "@/Components/HomeBanner/HomeBanner";


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        
        <Navbar></Navbar>
   
        <main>
          {children}
        </main>
        <Toaster position="top-right"></Toaster>


      </body>
    </html>
  );
}
