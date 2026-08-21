import "./globals.css";


import Navbar from "@/Components/Navbar/Navbar";
import { Toaster } from "sonner";
import Footer from "@/Components/Footer/Footer";

export const metadata = {
  title : {
    default : "StudyNook",
    template : "%s - StudyNook" 
  }
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    > 
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
