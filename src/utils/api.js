import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

let getAuth, setAccessToken, getRefreshToken, logout;

export function bindAuth({
  getAuthState,
  setAccessTokenFn,
  getRefreshTokenFn,
  logoutFn,
}) {
  getAuth = getAuthState;
  setAccessToken = setAccessTokenFn;
  getRefreshToken = getRefreshTokenFn;
  logout = logoutFn;
}

api.interceptors.request.use((config) => config);

let isRefreshing = false;
let queue = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          })
          .catch((err) => Promise.reject(err));
      }

      original._retry = true;
      isRefreshing = true;
      try {
        const resp = await axios.post(
          (import.meta.env.VITE_API_URL || "http://localhost:4000/api") +
            "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newAccess = "cookie"; // access token now in cookie; no header needed
        setAccessToken?.(newAccess);
        queue.forEach((p) => p.resolve(newAccess));
        queue = [];
        return api(original);
      } catch (e) {
        queue.forEach((p) => p.reject(e));
        queue = [];
        logout?.();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
