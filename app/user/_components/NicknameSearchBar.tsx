"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import SearchBar from "@/app/_components/ui/SearchBar";

interface Props {
  pathname?: string;
}

const NicknameSearchBar = ({ pathname }: Props) => {
  const router = useRouter();
  const originPathname = usePathname();
  const searchParams = useSearchParams();

  const onSubmit = (nickname: string) => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    router.push(`${pathname || originPathname}?nickname=${nickname}`);
  };

  return <SearchBar defaultValue={searchParams.get("nickname")} onSubmit={onSubmit} placeholder={"유저 닉네임을 입력해주세요."} />;
};

export default NicknameSearchBar;
