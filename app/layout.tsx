
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { cn } from "@/lib/utils";
// import Header from "./components/Header";
// import { useEffect } from "react";


// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Deborah Adebayo | Author • Speaker • Founder",
//   description: "Meeting you at the intersection of Grit, Grace, and Truth.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <body className={cn(
//         inter.className,
//         "bg-gray-50 text-gray-900 antialiased"
//       )}>
//         <Header/>
//         {children}
//       </body>
//     </html>
//   );
// }






// "use client"; // ← Add this at the top to make it a Client Component

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
  // Auto-run drip cron check every 60 seconds — ONLY in development
  // useEffect(() => {
  //   if (process.env.NODE_ENV !== "development") return; // Safety: don't run in production

  //   const interval = setInterval(async () => {
  //     console.log(`[${new Date().toISOString()}] Auto-running drip check...`);
  //     try {
  //       const res = await fetch("/api/cron-send-drips");
  //       const data = await res.json();
  //       console.log("Auto cron result:", data);
  //     } catch (err) {
  //       console.error("Auto cron failed:", err);
  //     }
  //   }, 60 * 1000); // every 1 minute

  //   // Cleanup when component unmounts
  //   return () => clearInterval(interval);
  // }, []); // empty dependency array = run once on mount

  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "bg-gray-50 text-gray-900 antialiased")}>
        <Header />
        {children}
      </body>
    </html>
  );
}