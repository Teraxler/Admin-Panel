import { createContext } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useCookie } from "@/hooks/useCookie";
import { getUser } from "@/features/user/userService";
import { loginUser } from "@/features/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setCookie] = useCookie("userId");

  const {
    data: user,
    status,
    error,
    setData: setUser,
    refetch,
    reset,
  } = useFetch({ fn: async () => await getUser(userId), dependencies: [userId] });

  const login = async ({ username, password }) => {
    const user = await loginUser({ username, password });

    setCookie(user.userId);
    setUser(user);
    // await refetch();
  };

  const logout = () => {
    setCookie(null);
    reset();
  };

  return (
    <AuthContext
      value={{
        user,
        status,
        error,
        setUser,
        logout,
        login,
        refreshUser: refetch,
      }}
    >
      {children}
    </AuthContext>
  );
};

export default AuthContext;
