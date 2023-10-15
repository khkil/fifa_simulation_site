import axios from "./axios";

export const fetchUserTrades = async (params) => {
  const { data } = await axios.get(`/api/user/trades`, {
    params,
  });
  return data;
};
