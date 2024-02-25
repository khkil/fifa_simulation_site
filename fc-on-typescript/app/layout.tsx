import Header from "@/app/_components/layout/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import KakaoBanner from "@/app/_components/banner/KakaoBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FC-ON",
  description: "FC온라인 전적 및 스쿼드 조회",
};

const globalSWRConfig = {
  revalidateOnFocus: false, // 다른 탭에서 돌아올 때마다 fetch를 비활성화
  // 다른 SWR 설정 옵션들도 필요한 경우 추가
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
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
