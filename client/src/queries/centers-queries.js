import { useInfiniteQuery, useQuery } from 'react-query';
import {
  getTestingCenters,
  getTestingCenterById,
  getDetailedTestingCenters,
} from './centers-service';

const defaultOptions = {
  refetchOnWindowFocus: false,
  refetchInterval: 5 * 60 * 1000,
  refetchIntervalInBackground: false,
};

export const useTestingCentersQuery = (options = defaultOptions) => {
  return useQuery('testing-centers', () => getTestingCenters(), { ...defaultOptions, ...options });
};

const LIMIT = 20;

export const useDetailedTestingCentersQuery = (options = defaultOptions) => {
  return useInfiniteQuery(
    'detailed-testing-centers',
    ({ pageParam = { limit: LIMIT, offset: 0 } }) => {
      return getDetailedTestingCenters(pageParam);
    },
    {
      ...defaultOptions,
      ...options,
      getNextPageParam: (lastPage) => {
        if (lastPage.next) {
          const searchParams = new URLSearchParams(lastPage.next);
          return { limit: LIMIT, offset: searchParams.get('offset') };
        }

        return null;
      },
    },
  );
};

export const useTestingCenterByIdQuery = ({ pk, language }, options = defaultOptions) => {
  return useQuery(['testing-center', pk], () => getTestingCenterById(pk, language), {
    ...defaultOptions,
    ...options,
  });
};
