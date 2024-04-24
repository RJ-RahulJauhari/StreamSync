import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
            logoImageUrl:'/icons/yoom-logo.svg',
            colorText:"#fff",
            colorTextOnPrimaryBackground:"#fff"
          }
        }
        }>
        <body className={`${inter.className} bg-dark-2`}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
