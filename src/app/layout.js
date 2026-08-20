import Navbar from "@/Components/Navbar/Navbar";
import "./globals.css";
import { Toaster } from "sonner";
import HomeBanner from "@/Components/HomeBanner/HomeBanner";
import Footer from "@/Components/Footer/Footer";


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
