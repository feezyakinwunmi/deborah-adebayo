import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./components/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deborah Adebayo | Author • Speaker • Founder",
  description: "Meeting you at the intersection of Grit, Grace, and Truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        inter.className,
        "bg-gray-50 text-gray-900 antialiased"
      )}>
        <Header/>
        {children}
      </body>
    </html>
  );
}