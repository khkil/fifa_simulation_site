import axios from "./axios";

export const fetchAllPlayers = async (params) => {
  const { data } = await axios.get(`/api/players`, {
    params,
  });
  return data;
};
