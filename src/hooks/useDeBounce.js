import React, { useEffect } from "react";

export const useDeBounce = (fn, delay, dependencyList = []) => {
  useEffect(() => {
    const timeoutId = setTimeout(fn, delay);

    return () => clearTimeout(timeoutId);
  }, [...dependencyList]);
};
