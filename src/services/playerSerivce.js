import axiosInstance from "./axios";

export const fetchAllPlayers = async (params) => {
  const { data } = await axiosInstance.get(`/api/players`, {
    params,
  });
  return data;
};
