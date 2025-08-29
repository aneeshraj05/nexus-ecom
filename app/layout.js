  import { Outfit } from "next/font/google";
  import "./globals.css";
  import { AppContextProvider } from "@/context/AppContext";
  import { Toaster } from "react-hot-toast";
  import { ClerkProvider } from "@clerk/nextjs";
  import SaveUser from "@/components/SaveUser"; // 👈 import your component

  const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

  export const metadata = {
    title: "Nexus-Aneesh",
    description: "E-Commerce with Next.js ",
  };

  export default function RootLayout({ children }) {
    return (
      <ClerkProvider>
        <html lang="en" data-scroll-behavior="smooth">
          <body className={`${outfit.className} antialiased text-gray-700`}>
            <Toaster />
            <AppContextProvider>
              {/* 👇 Runs automatically after login */}
              <SaveUser />  
              {children}
            </AppContextProvider>
          </body>
        </html>
      </ClerkProvider>
    );
  }
