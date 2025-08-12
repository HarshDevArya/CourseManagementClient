import { useEffect } from "react";
import { bindAuth } from "./api.js";

export default function useBindAuth(
  getAuth,
  setAccessToken,
  getRefreshToken,
  logout
) {
  useEffect(() => {
    bindAuth({
      getAuthState: getAuth,
      setAccessTokenFn: setAccessToken,
      getRefreshTokenFn: getRefreshToken,
      logoutFn: logout,
    });
  }, [getAuth, setAccessToken, getRefreshToken, logout]);
}
