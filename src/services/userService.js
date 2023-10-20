import axios from "./axios";

export const fetchUserInfo = async (params) => {
  const { data } = await axios.get(`/api/user/info`, {
    params,
  });
  return data;
};

export const fetchUserTrades = async (params) => {
  const { data } = await axios.get(`/api/user/trades`, {
    params,
  });
  return data;
};

export const fetchUserSquad = async (params) => {
  const { data } = await axios.get(`/api/user/squad`, {
    params,
  });
  return data;
};
