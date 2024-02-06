import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1" />
        <title>FC온라인 스쿼드, 전적 검색 FC-ON</title>
        <meta
          name="description"
          content="FC온라인 스쿼드 조회, 상대와 내 스쿼드 비교, 전적 등을 조회할수 있는 사이트 입니다. 상대방 스쿼드와 내 스쿼드를 비교해 전략을 구상해보세요."
        />
        <meta property="og:url" content="https://fc-on.com" />
        <meta property="og:title" content="FC온라인 전적 검색 FC-ON" />
        <meta property="og:site_name" content="FC온라인 스쿼드 검색 FC-ON" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="FC온라인 스쿼드 조회, 상대와 내 스쿼드 비교, 전적 등을 조회할수 있는 사이트 입니다. 상대방 스쿼드와 내 스쿼드를 비교해 전략을 구상해보세요."
        />
        <meta name="next-head-count" content="9" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta
          name="keywords"
          content="FC-ON, 피파온라인, 피파온라인4, FC온라인, 스쿼드, FC 스쿼드, FC 전적, 피파 전적, 피파 전적 검색, 경기 정보, 경기 상세 정보, 통계, 경기 평균, 플레이 스타일, 선수 기록, 최고 등급, 구단 정보, 스쿼드, 선수 랭킹"
        />
        <meta property="og:image" content="https://fc-on.com/logo.jpg" />
        <meta name="google-adsense-account" content="ca-pub-7047139092050725"></meta>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2820184336962070" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
