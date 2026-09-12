import { useEffect, useMemo, useRef } from "react";

function debounce(callback, delay) {
  let timerId;

  return function (...args) {
    timerId && clearTimeout(timerId);

    timerId = setTimeout(() => callback.apply(this, args), delay);
  };
}

function useDeBounce(callback, delay) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    function fn() {
      callbackRef.current?.();
    }

    return debounce(fn, delay);
  }, [delay]);

  return debouncedCallback;
}

export default useDeBounce;
