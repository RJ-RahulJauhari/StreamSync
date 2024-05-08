import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stream Sync",
  description: "Created by Rahul Jauhari",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{
          variables:{
            colorText:"#fff",
            colorPrimary:"#0E78F9",
            colorBackground:"#1c1f2e",
            colorInputBackground:"#252a41",
            colorInputText:"#fff",
            colorTextOnPrimaryBackground:"#fff"
          },
          layout:{
            logoImageUrl:'/icons/side-text-logo.png',
            colorText:"#fff",
            colorTextOnPrimaryBackground:"#fff"
          }
        }
        }>
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster></Toaster>
        </body>
      </ClerkProvider>
    </html>
  );
}
