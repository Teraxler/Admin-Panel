import { createContext, useContext } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useCookie } from "@/hooks/useCookie";
import { loginUser } from "@/features/auth";
import { useStorageContext } from "@/context/StorageContext";
import { getUser } from "@/features/user/userService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storageContext = useStorageContext();
  const [userId, setCookie] = useCookie("userId");

  const {
    data: user,
    status,
    error,
    setData: setUser,
    refetch,
    reset,
  } = useFetch({
    fn: async () => await getUser(storageContext, userId),
    dependencies: [userId],
  });

  const login = async ({ username, password }) => {
    const user = await loginUser(storageContext, { username, password });

    setCookie(user.userId);
    setUser(user);
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

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context == null)
    throw new Error("useAuthContext must use within AuthProvider");

  return context;
};

export { AuthProvider, useAuthContext };

export default AuthContext;
