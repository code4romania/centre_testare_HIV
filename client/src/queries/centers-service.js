import config from '../config';
import { useGet } from './requests';

const { CENTER_URL } = config;

export const useTestingCentersQuery = () => {
  const { data, ...rest } = useGet(CENTER_URL);

  return { testingCenters: data ?? [], ...rest };
};

export const useBuildingByIdQuery = (pk) => {
  const { data: center, ...rest } = useGet(`${CENTER_URL}${pk}/`);

  return { center, ...rest };
};

export const useSearchCentersQuery = () => {
  const {
    data: searchResults,
    fetchData: searchTestingCenters,
    ...rest
  } = useGet(`${CENTER_URL}search/`, { enabled: false });

  return { searchResults, searchTestingCenters, ...rest };
};
