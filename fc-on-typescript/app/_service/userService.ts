import customFetch from "@/app/_service/index";

export const fetchUserInfo = async (params: { nickname: string }) => {
  try {
    return customFetch({ url: `/api/user/info`, params });
  } catch (e) {
    console.error(e);
    throw new Error("선수 목록을 가져오는데 실패하였습니다.");
  }
};

export const fetchUserSquad = async (nickname: string) => {
  try {
    return customFetch({ url: `/api/user/squad`, params: { nickname } });
  } catch (e) {
    console.error(e);
    throw new Error("선수 목록을 가져오는데 실패하였습니다.");
  }
};
