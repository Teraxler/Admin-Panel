import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@/contexts/AuthContext";
import Loader from "@/components/Loader";

const loginPath = "/auth/login";

const options = {
  state: {
    message: "Please login to access panel",
    messageType: "error",
  },
  replace: true,
};

const ProtectedRoute = ({ children }) => {
  const { user, isUserLoaded } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoaded && (user == null || user.role !== "ADMIN"))
      navigate(loginPath, options);
  }, [isUserLoaded]);

  return user?.role === "ADMIN" ? children : <Loader />;
};

export default ProtectedRoute;
