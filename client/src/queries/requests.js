import { useCallback, useEffect, useState } from 'react';
import { mapKeysToCamelCase } from '../utils';

const useBasicFetch = (url, { enabled, ...options }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(
    async (params = null) => {
      try {
        setIsLoading(true);
        let queryUrl = url;

        if (params) {
          queryUrl += `?${new URLSearchParams(params).toString()}`;
        }
        const res = await fetch(queryUrl, options);

        if (!res.ok) throw new Error(res.statusText);

        const resData = await res.json();

        setData(mapKeysToCamelCase(resData));
        setIsLoading(false);
      } catch (error) {
        setData(null);
        setIsError(true);
        setIsLoading(false);
      }
    },
    [url, options],
  );

  useEffect(() => {
    if (!enabled) return;

    fetchData();
  }, [enabled, fetchData, url]);

  return { data, isError, isLoading, fetchData };
};

const defaultGetOptions = { method: 'GET', enabled: true };

export const useGet = (url, options = defaultGetOptions) => {
  return useBasicFetch(url, { ...defaultGetOptions, ...options });
};

const defaultGetOptsOptions = { method: 'OPTIONS' };

export const useGetOptions = (url, options = defaultGetOptsOptions) => {
  const { data, isLoading, isError } = useBasicFetch(url, { ...defaultGetOptsOptions, ...options });

  return { postActions: data?.actions.post, isLoading, isError };
};
