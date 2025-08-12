import { useAuth } from "./AuthContext.jsx";
import useBindAuth from "../utils/bindAuthEffect.js";

export default function AuthBinder() {
  const { accessToken, setAccessToken, logout } = useAuth();
  useBindAuth(
    () => ({ accessToken }),
    (t) => setAccessToken(t),
    () => null,
    () => logout()
  );
  return null;
}
