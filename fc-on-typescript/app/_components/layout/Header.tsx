import Link from "next/link";
import { Key } from "react";
interface Menu {
  title: string;
  url: string;
}
const menus: Array<Menu> = [
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
  return (
    <header className="border-b border-gray-300">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 p-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <img src="/images/common/logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-700">FC-ON</span>
          </Link>
          <div className="flex items-center lg:order-2">
            <a href="#" className="text-gray-800 ">
              로그인
            </a>
          </div>
          <div className="hidden justify-start items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {menus.map(({ title, url }: Menu, index: Key) => (
                <li key={index}>
                  <Link
                    href={url}
                    className="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                    aria-current="page"
                  >
                    <p className="font-semibold hover:text-gray-400 text-xl">{title}</p>
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
