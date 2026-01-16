import React, { useEffect } from "react";

const useDeBounce = (fn, delay, dependencyList = []) => {
  useEffect(() => {
    const timeoutId = setTimeout(fn, delay);

    return () => clearTimeout(timeoutId);
  }, [...dependencyList]);
};

export default useDeBounce;
