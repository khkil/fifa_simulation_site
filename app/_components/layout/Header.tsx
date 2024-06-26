"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Key, useEffect } from "react";
import { log } from "node:util";

interface Menu {
  title: string;
  url: string;
}

const menus: Menu[] = [
  {
    title: "선수 조회",
    url: "/players",
  },
  {
    title: "스쿼드 조회",
    url: "/user/squad",
  },
  {
    title: "경기 기록",
    url: "/user/match",
  },
  {
    title: "선수 강화",
    url: "/upgrade",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-300">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 p-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <img src="/images/common/logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-700">FC-ON</span>
          </Link>
          <div className="flex items-center lg:order-2 border-2 rounded-lg px-4 py-1 hover:bg-gray-100">
            <Link href="/auth/login" className="text-gray-800 font-bold text-lg">
              로그인
            </Link>
          </div>
          <div className="hidden justify-center items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {menus.map(({ title, url }: Menu, index: Key) => (
                <li key={index}>
                  <Link
                    href={url}
                    className={`block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"}`}
                    aria-current="page"
                  >
                    <p className={`font-semibold hover:text-gray-300 text-xl ${pathname.includes(url) ? "text-gray-300" : "text-gray-800"}`}>
                      {title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
