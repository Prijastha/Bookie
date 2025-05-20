"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });
// export const metadata: Metadata = {
//   title: "Book tracker",
//   description: "Track your reads with ease",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
