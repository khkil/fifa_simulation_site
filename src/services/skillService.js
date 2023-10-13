import axios from "./axios";

export const fetchAllSkills = async (params) => {
  const { data } = await axios.get(`/api/skills`, {
    params,
  });
  return data;
};
