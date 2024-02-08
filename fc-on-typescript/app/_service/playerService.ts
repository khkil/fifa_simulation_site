import { Pageable, Response } from "@/app/_types";
import { SUCCESS_STATUS } from "@/app/_constants";
import customFetch from ".";

export const fetchPlayers = async (params?: Pageable) => {
  const { status, data, message }: Response = await customFetch({ url: "/api/players", params });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};

export const fetchPlayerPriceRank = async (params?: Pageable) => {
  try {
    return customFetch({ url: "/api/players/price-rank", params });
  } catch (e) {
    console.error(e);
    throw new Error("선수 시세순위를 가져오는데 실패하였습니다.");
  }
};

/* export const fetchPlayersByOverall = async ({ overall }) => {
  const { data } = await axios.get(`/api/price/overall/${overall}`);
  return data;
};

export const fetchPlayerDetail = async (playerId) => {
  const { data } = await axios.get(`/api/players/${playerId}`);
  return data;
};

export const fetchPlayerPriceWave = async (params) => {
  const { data } = await axios.get(`/api/players/price-rank`, {
    params,
  });
  return data;
};

export const fetchPlayerPriceByOverall = async ({ overall }) => {
  const { data } = await axios.get(`/api/price/overall/${overall}`, {
    params,
  });
  return data;
}; */
