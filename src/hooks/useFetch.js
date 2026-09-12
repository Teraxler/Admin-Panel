import { useCallback, useEffect, useRef, useState } from "react";

export const useFetch = ({ fn, dependencies }) => {
  const requestId = useRef(0);

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const reset = () => {
    setStatus("idle");
    setError(null);
    setData(null);
  };

  const fetchData = useCallback(async () => {
    const id = ++requestId.current;
    const retry = 2;
    let backOffTime;

    setStatus("pending");
    setError(null);
    setData(null);

    for (let attempt = 1; attempt <= retry; attempt++) {
      try {
        const result = await fn();

        if (!result) throw new Error("Failed to fetch inside ", fn.name);

        if (id !== requestId.current) return;

        setData(result);
        setStatus("success");
        break;
      } catch (error) {
        if (attempt === retry) {
          if (id !== requestId.current) break;
          setError(error);
          setStatus("failed");
          break;
        }

        backOffTime = 2 ** (attempt - 1) * 1000;

        await new Promise((resolve) => setTimeout(resolve, backOffTime));
      }
    }
  }, [...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, status, error, setData, refetch: fetchData, reset };
};

// export const useFetchRecursive = (url) => {
//   const [status, setStatus] = useState("idle");
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchData(retry = 3, backOffTime = 1000) {
//       try {
//         setError(null);
//         setStatus("pending");

//         const response = await fetch(url, {
//           signal: controller.signal,
//         });

//         if (!response.ok) throw Error(`Http Error: ${response.statusText}`);

//         const result = await response.json();

//         setData(result);
//         setError(null);
//         setStatus("successfull");
//       } catch (error) {
//         console.log("Try", retry, "Failed...", backOffTime);
//         if (retry > 1) {
//           await new Promise(() =>
//             setTimeout(
//               () => fetchData(retry - 1, backOffTime * 2),
//               backOffTime,
//             ),
//           );
//         }

//         setError(error);
//         setStatus("failed");
//       }
//     }

//     fetchData();

//     return () => {
//       controller.abort();
//     };
//   }, [url]);

//   return { data, status, error, setData, refetch: fetchData };
// };
