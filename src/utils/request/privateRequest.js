import axios from "axios";
import refreshTokenFn from "./refreshToken";
import localStorage from "../../utils/localStorage";
import StorageKey from "../../constants/storageKeys";
import { toast } from "react-toastify";
import { SERVER_HOST } from "../../constants/config";
import HttpStatusCode from "../../constants/httpStatusCode";

axios.defaults.baseURL = SERVER_HOST;

axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(StorageKey.ACCESS_TOKEN);

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error?.config;
    if (
      error?.response?.status === HttpStatusCode.UNAUTHORIZED &&
      !config?.sent
    ) {
      config.sent = true;
      const newAccessToken = await refreshTokenFn();

      if (newAccessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return axios(config);
      }
      //logout without sending the refresh token back to server
      toast.warn("Session expired. Please login again.");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

const privateRequest = axios;

export default privateRequest;
