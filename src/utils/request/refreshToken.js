import publicRequest from "./publicRequest";
import localStorage from "../localStorage";
import Endpoint from "../../endpoints";
import StorageKey from "../../constants/storageKeys";

const refreshTokenFn = async () => {
  const refreshToken = localStorage.getItem(StorageKey.REFRESH_TOKEN);

  if (!refreshToken) {
    return null;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const response = await publicRequest.post(
      Endpoint.REFRESH_TOKEN,
      null,
      config,
    );

    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;

    localStorage.setItem(StorageKey.REFRESH_TOKEN, newRefreshToken);
    localStorage.setItem(StorageKey.ACCESS_TOKEN, newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.log("Error when refreshing token:", error);
    localStorage.removeItem(StorageKey.REFRESH_TOKEN);
    localStorage.removeItem(StorageKey.ACCESS_TOKEN);
    return null;
  }
};

export default refreshTokenFn;
