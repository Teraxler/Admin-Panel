import { useEffect, useState } from "react";

function useFetch2(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) throw Error(`Http Error: ${response.statusText}`);

        const result = await response.json();

        setData(result);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoaded(true);
      }
    }

    setIsLoaded(false);
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return [data, isLoaded, error, setData];
}

export default function useFetch3(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      const retry = 3;
      let backOffTime;

      for (let attempt = 1; attempt <= retry; attempt++) {
        try {
          const response = await fetch(url, {
            signal: controller.signal,
          });

          if (!response.ok) throw Error(`Http Error: ${response.statusText}`);

          const result = await response.json();

          setData(result);
          setError(null);
          break;
        } catch (error) {
          if (attempt === retry) {
            setError(error);
            break;
          }

          backOffTime = 2 ** (attempt - 1) * 1000;

          await new Promise((resolve) => setTimeout(resolve, backOffTime));
        } finally {
          setIsLoaded(true);
        }
      }
    }

    setIsLoaded(false);
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return [data, isLoaded, error, setData];
}

function useFetch(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData(retry = 3, backOffTime = 1000) {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) throw Error(`Http Error: ${response.statusText}`);

        const result = await response.json();

        setData(result);
        setError(null);
      } catch (error) {
        console.log("Try", retry, "Failed...", backOffTime);
        if (retry > 1) {
          await new Promise(() =>
            setTimeout(() => fetchData(retry - 1, backOffTime * 2), backOffTime)
          );
        }

        setError(error);
      } finally {
        setIsLoaded(true);
      }
    }

    setIsLoaded(false);
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return [data, isLoaded, error, setData];
}
