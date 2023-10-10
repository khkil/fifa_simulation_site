import axios from "axios";
import { FAIL_STATUS } from "../constants";

const axiosInstance = axios.create({
  //timeout: 5000,
});

axiosInstance.defaults.paramsSerializer = function (paramObj) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    params.append(key, paramObj[key]);
  }

  return params.toString();
};
axiosInstance.interceptors.request.use(async (config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data?.status === FAIL_STATUS) {
      return null;
    }
    return data;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
