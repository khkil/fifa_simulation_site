import customFetch from "@/app/_service/index";
import { SUCCESS_STATUS } from "@/app/_constants";
import { PageResponse } from "@/app/_types/pageable";
import { UserSquad } from "@/app/_types/user";

export const fetchUserInfo = async (params: { nickname: string }) => {
  try {
    return customFetch({ url: `/api/platform/user`, params });
  } catch (e) {
    console.error(e);
    throw new Error("선수 목록을 가져오는데 실패하였습니다.");
  }
};

export const fetchUserSquad = async (nickname: string): Promise<UserSquad> => {
  const { status, data, message } = await customFetch({ url: `/api/platform/squad`, params: { nickname } });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};

export const fetchUserMatches = async (params: { nickname: string; page: number; matchType: number }) => {
  const { status, data, message } = await customFetch({ url: `/api/platform/matches`, params });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};

export const fetchUserMatchDetail = async (matchId: string) => {
  const { status, data, message } = await customFetch({ url: `/api/platform/matches/${matchId}` });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};
