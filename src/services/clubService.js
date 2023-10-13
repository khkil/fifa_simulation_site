import axios from "./axios";

export const fetchAllClubs = async (params) => {
  const { data } = await axios.get(`/api/clubs`, {
    params,
  });
  return data;
};
