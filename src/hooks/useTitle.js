import { useEffect } from "react";

export const useTitle = (title = "Admin Panel") => {
  useEffect(() => {
    document.title = title;
  }, []);
};
