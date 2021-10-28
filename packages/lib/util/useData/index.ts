import { useState, useEffect, useRef } from "react";

interface Data<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

export function useData<T>(fetchPromise: Promise<T>) {
  const isMounted = useRef(true);
  const [result, setResult] = useState<Data<T>>({
    loading: true,
  });

  useEffect(() => {
    fetchPromise
      .then((data) => {
        if (isMounted.current) {
          setResult({
            data,
            loading: false,
          });
        }
      })
      .catch((e: Error) => {
        setResult({ loading: false, error: e.message });
      });

    return () => {
      isMounted.current = false;
    };
  }, [fetchPromise]);

  return result;
}
