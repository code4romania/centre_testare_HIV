import { useQuery } from 'react-query';
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

export const useDetailedTestingCentersQuery = (params, options = defaultOptions) => {
  return useQuery('detailed-testing-centers', () => getDetailedTestingCenters(params), {
    ...defaultOptions,
    ...options,
  });
};

export const useTestingCenterByIdQuery = ({ pk, language }, options = defaultOptions) => {
  return useQuery(['testing-center', pk], () => getTestingCenterById(pk, language), {
    ...defaultOptions,
    ...options,
  });
};
