import useSWR from "swr";
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function useSquad(nickname: string) {
  //const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/user/squad?nickname=${nickname}`, fetcher);
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/players`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
