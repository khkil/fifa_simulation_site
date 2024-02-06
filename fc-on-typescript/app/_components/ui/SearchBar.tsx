"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";

interface Props {
  pathname?: string;
}

const NicknameSearchBox = ({ pathname }: Props) => {
  const router = useRouter();
  const originPathname = usePathname();
  const searchParams = useSearchParams();

  const [nickname, setNickname] = useState<string>(searchParams.get("nickname") || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    router.push(`${pathname || originPathname}?nickname=${nickname}`);
  };

  return (
    <div className="relative w-full ">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ring-0"
        placeholder="유저 닉네임을 입력해주세요."
        value={nickname}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button
        type="button"
        className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-slate-700 rounded-e-lg border"
        onClick={onSubmit}
      >
        <svg className="w-10 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};

export default NicknameSearchBox;