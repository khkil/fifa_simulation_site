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

export default async function customFetch({ url, method = "GET", params = {} }: Props) {
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
    url += "?" + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  const response = await fetch(`${baseUrl}${url}`, options);
  if (response.ok) {
    return await response.json();
  }
}
