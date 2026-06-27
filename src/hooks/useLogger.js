import { useEffect } from "react";

export const useLogger = (name, value) => {
  useEffect(() => {
    console.info(`[useLogger] ${name} Update = ${value}`);
  }, [value]);
};
