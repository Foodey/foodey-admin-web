import axios from "axios";
import refreshTokenFn from "./refreshToken";
import localStorage from "../../utils/localStorage";
import StorageKey from "../../constants/storageKeys";
import { SERVER_HOST } from "../../constants/config";
import HttpStatusCode from "../../constants/httpStatusCode";

const privateRequest = axios.create();

privateRequest.defaults.baseURL = SERVER_HOST;

privateRequest.interceptors.request.use(
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

privateRequest.interceptors.response.use(
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
        return privateRequest(config);
      }
      //logout without sending the refresh token back to server
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default privateRequest;
