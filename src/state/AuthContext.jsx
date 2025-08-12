import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../utils/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // On mount, try to fetch current user using cookie-based session
    (async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
        setAccessToken("cookie");
      } catch {}
    })();
  }, []);

  useEffect(() => {
    // no-op: tokens are cookie-based now
  }, [user, accessToken, refreshToken]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      setAccessToken("cookie");
      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      setUser(res.data.user);
      setAccessToken("cookie");
      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.response?.data?.message || "Register failed",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      role: user?.role || "guest",
      accessToken,
      refreshToken,
      loading,
      setAccessToken,
      setRefreshToken,
      setUser,
      login,
      register,
      logout,
    }),
    [user, accessToken, refreshToken, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
