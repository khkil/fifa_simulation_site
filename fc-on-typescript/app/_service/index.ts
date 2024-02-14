import { Response } from "@/app/_types";

interface Props {
  url: string;
  method?: string;
  params?: object;
}

interface Options {
  method: string;
  headers: HeadersInit;
  body?: BodyInit;
}

export default async function customFetch<Response>({ url, method = "GET", params = {} }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  let headers = {
    "Content-Type": "application/json",
  };

  /* if (session?.user?.accessToken) {
    headers[AUTHRIZATION] = `${session.user.accessToken}`;
  } */

  let options: Options = {
    method,
    headers,
  };

  if ("GET" === method) {
    // @ts-ignore
    url += "?" + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  try {
    const response = await fetch(`${baseUrl}${url}`, options);
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "응답 데이터를 받아오는데 실패 하였습니다.");
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    throw new Error("서버오류가 발생하였습니다.");
  }
}
