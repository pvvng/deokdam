import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { paperlogy } from "./@fonts/paperlogy";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { KakaoProvider } from "@/components/Kakao";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "덕담 DEOKDAM",
    template: "%s | 덕담",
  },
  description:
    "추석엔 마음을 나누는 덕담 한 마디. 덕담에서 가족·친구·연인에게 당신의 따뜻한 말을 전하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${paperlogy.variable} antialiased`}
      >
        <div id="portal" />
        <KakaoProvider>
          <div className="p-5 font-paperlogy max-w-screen-sm mx-auto">
            <Navbar />
            {children}
          </div>
        </KakaoProvider>
      </body>
    </html>
  );
}
