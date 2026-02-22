import { getCookie } from "@/utils/cookie.util";
import { useEffect, useState } from "react";

export const useCookie = (key, maxAgeDay = 30) => {
  const maxAge = maxAgeDay * 24 * 60 * 60;
  const [cookie, setCookie] = useState(() => getCookie(key) ?? "");

  useEffect(() => {
    document.cookie = `${key}=${cookie}; max-age=${maxAge}; path=/; secure;`;
  }, [cookie]);

  return [cookie, setCookie];
};
