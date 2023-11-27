import axios from "./axios";

export const fetchAllPlayers = async (params) => {
  const { data } = await axios.get(`/api/players`, {
    params,
  });
  return data;
};

export const fetchPlayerPriceWave = async (params) => {
  const { data } = await axios.get(`/api/players/price-wave`, {
    params,
  });
  return data;
};
