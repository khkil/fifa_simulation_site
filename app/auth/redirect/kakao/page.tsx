"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import customFetch from "@/app/_service";

export default function KakaoLoginRedirectPage() {
  const params = useSearchParams();
  const { push } = useRouter();

  const code = useMemo(() => params.get("code"), [params]);

  useEffect(() => {
    if (!code) {
      alert("카카오 로그인에 실패 하였습니다.");
      push("/");
    } else {
      alert(code);
    }
  }, [code]);

  return <></>;
}
