import { useContext, useEffect } from "react";
import { toast } from "sonner";
import AuthContext from "@/context/AuthContext";
import { Loader } from "@/components/ui";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { user, status } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (status === "failed") {
      toast.error("Please login to access panel");
      router.replace("/auth/login");
      return;
    }

    console.log("🚀 ~ ProtectedRoute ~ status:", status)
    console.log("🚀 ~ ProtectedRoute ~ user:", user)

    if (status === "success" && user.role !== "ADMIN") {
      toast.error("Only admin have permission access to panel");
      router.replace("/auth/login");
      return;
    }
  }, [status, user, router]);

  return user?.role === "ADMIN" ? children : <Loader />;
};

export default ProtectedRoute;
