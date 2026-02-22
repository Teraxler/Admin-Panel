import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/localStorage.util";

function useLocalStorage(key, initValue = null) {
  const [state, setState] = useState(() => getFromLocalStorage(key, initValue));

  useEffect(() => {
    if (state == null) localStorage.removeItem(key);
    if (state !== null) localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

export { useLocalStorage };
