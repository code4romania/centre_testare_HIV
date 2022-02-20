import { useQuery } from 'react-query';
import { getTestingCenters, getTestingCenterById } from './centers-service';

const defaultOptions = {
  refetchOnWindowFocus: false,
  refetchInterval: 5 * 60 * 1000,
  refetchIntervalInBackground: false,
};

export const useTestingCentersQuery = (options = defaultOptions) => {
  return useQuery('testing-centers', getTestingCenters, { ...defaultOptions, ...options });
};

export const useTestingCenterByIdQuery = (pk, options = defaultOptions) => {
  return useQuery(['testing-center', pk], () => getTestingCenterById(pk), {
    ...defaultOptions,
    ...options,
  });
};
