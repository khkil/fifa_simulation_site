import Header from "@/app/_components/layout/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import KakaoBanner from "@/app/_components/banner/KakaoBanner";
import { ReactNode } from "react";
import "./globals.css";
import Image from "next/image";
import type { TemplateString } from "next/dist/lib/metadata/types/metadata-types";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FC-ON",
  description: "FC온라인 전적 및 스쿼드 조회",
  keywords: "FC-ON, FC온라인, FC온라인 전적검색, FC온라인 스쿼드 조회, FC온라인 강화",
  openGraph: {
    title: "FC온라인 전적검색, 스쿼드 조회 FC-ON ",
    siteName: "FC온라인 전적검색, 스쿼드 조회 FC-ON ",
    description: "FC온라인 스쿼드 조회, 전적 등을 조회 및 강화 시뮬레이션을 사용해보세요",
    images: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`,
    },
  },
};

const globalSWRConfig = {
  revalidateOnFocus: false, // 다른 탭에서 돌아올 때마다 fetch를 비활성화
  // 다른 SWR 설정 옵션들도 필요한 경우 추가
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Script
          async
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
          integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh"
          crossOrigin="anonymous"
        />
        <Header />
        <div className="bg-slate-100 w-full min-h-screen space-y-10">
          <div className={"flex justify-center pt-10"}>
            <KakaoBanner width={720} height={90} unit={"DAN-RDzqKJqyvW8vJI9e"} />
          </div>
          <div className="md:container md:mx-auto">{children}</div>
          <div className={"flex justify-center p-10"}>
            <KakaoBanner width={720} height={90} unit={"DAN-EuSY9A38xFhSj6Dc"} />
          </div>
        </div>
      </body>
    </html>
  );
}
