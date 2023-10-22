import { useState, useEffect } from 'react';

interface Response<T> {
  loading: boolean;
  error: boolean;
  data: T | null;
  dataLoaded: boolean;
}

export const useFetch = <T>(url: string): Response<T> => {
  const [response, setResponse] = useState<Response<T>>({
    loading: false,
    error: false,
    data: null,
    dataLoaded: false,
  })

  useEffect(() => {
    setResponse({ ...response, loading: true });

    fetch(url)
      .then((response) => response.json())
      .then((data: T) => {
        setResponse({
          ...response,
          loading: false,
          dataLoaded: true,
          data
        })
      })
      .catch((err) => {
        setResponse({
          ...response,
          loading: false,
          error: true,
        })

        console.error('Failed to fetch data', err);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return response;
};