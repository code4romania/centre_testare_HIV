import { useCallback, useEffect, useState } from 'react';
import { mapKeysToCamelCase } from '../utils';

const useBasicFetch = (url, options) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(url, options);

      if (!res.ok) throw new Error(res.statusText);

      const resData = await res.json();

      setData(mapKeysToCamelCase(resData));
      setIsLoading(false);
    } catch (error) {
      setData(null);
      setIsError(true);
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isError, isLoading };
};

const defaultGetOptions = { method: 'GET' };

export const useGet = (url, options = defaultGetOptions) => {
  return useBasicFetch(url, { ...defaultGetOptions, ...options });
};

const defaultGetOptsOptions = { method: 'OPTIONS' };

export const useGetOptions = (url, options = defaultGetOptsOptions) => {
  const { data, isLoading, isError } = useBasicFetch(url, { ...defaultGetOptsOptions, ...options });

  return { postActions: data?.actions.post, isLoading, isError };
};
