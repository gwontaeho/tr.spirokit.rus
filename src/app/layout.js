import "./globals.css";
import { Inter } from "next/font/google";

import { QueryProvider } from "@/query";
import { RecoilProvider } from "@/recoil";
import { LocaleProvider } from "@/locale/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "[The SpiroKit]",
  openGraph: {
    title: "[The SpiroKit]",
    description: "AI 폐기능 검사기로 더욱 편하게 폐기능을 검사하세요",
    url: process.env.NEXT_PUBLIC_HOST_PROD,
    siteName: "[The SpiroKit]",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_HOST_PROD}/meta.jpeg`,
        width: 800,
        height: 600,
      },
      {
        url: `${process.env.NEXT_PUBLIC_HOST_PROD}/meta.jpeg`,
        width: 1800,
        height: 1600,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,300,0..1,-50..200"
        />
      </head>
      <QueryProvider>
        <RecoilProvider>
          <LocaleProvider>
            <body className={inter.className}>{children}</body>
          </LocaleProvider>
        </RecoilProvider>
      </QueryProvider>
    </html>
  );
}
