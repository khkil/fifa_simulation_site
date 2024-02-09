import customFetch from "@/app/_service/index";
import { SUCCESS_STATUS } from "@/app/_constants";

export const fetchSeasons = async () => {
  const { status, data, message } = await customFetch({ url: "/api/seasons" });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};
