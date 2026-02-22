import { createContext } from "react";
import { API_URL } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { useCookie } from "@/hooks/useCookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useCookie("userId");

  const {
    data: user,
    isLoaded: isUserLoaded,
    error,
    setData: setUser,
  } = useFetch(`${API_URL}/users/${userId}`);

  return (
    <AuthContext value={{ user, isUserLoaded, error, setUser }}>
      {children}
    </AuthContext>
  );
};

export default AuthContext;
