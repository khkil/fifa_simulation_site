import axios from "./axios";

export const fetchPlayers = async (params) => {
  const { data } = await axios.get(`/api/players`, {
    params,
  });
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
};
