import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

export const useToastMessage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      toast.success(location.state.message);

      navigate(location.pathname, { replace: true, state: null });
    }
  }, []);
};
