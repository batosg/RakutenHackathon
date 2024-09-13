import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components";
import "./globals.css";
import { SearchProvider } from '@/feature/recipes';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lifeline Recipe",
  description: "災害時の食材をもとに、おすすめのレシピを検索できるサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <SearchProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </body>
      </SearchProvider>
    </html>
  );
}
