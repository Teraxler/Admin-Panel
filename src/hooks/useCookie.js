import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieUtil";

export const useCookie = (key, maxAgeDay = 30) => {
  const maxAge = maxAgeDay * 24 * 60 * 60;
  const [cookie, setCookie] = useState(() => getCookie(key) ?? "");

  const updateCookie = () => setCookie(() => getCookie(key) ?? "");

  useEffect(() => {
    document.cookie = `${key}=${cookie}; max-age=${maxAge}; path=/; secure;`;
  }, [key, cookie, maxAge]);

  return [cookie, setCookie, updateCookie];
};
