"use client";

import { useEffect } from "react";

export default function KakaoLoginButton() {
  return (
    <button className={"w-full flex items-center justify-center bg-[#ffde00] rounded-lg p-3 text-lg font-bold"}>
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#3C1E1E" viewBox="0 0 21 21" data-v-fec5834d="">
        <path
          fill="current"
          d="M10.5 3.217c4.514 0 8 2.708 8 6.004 0 3.758-4.045 6.184-8 5.892-1.321-.093-1.707-.17-2.101-.23-1.425.814-2.728 2.344-3.232 2.334-.325-.19.811-2.896.533-3.114-.347-.244-3.157-1.329-3.2-4.958 0-3.199 3.486-5.928 8-5.928Z"
        ></path>
      </svg>
      <p className={"ml-2"}>카카오로 시작하기</p>
    </button>
  );
}
