import config from '../config';
import { mapKeysToCamelCase } from '../utils';
import { useGet } from './requests';

const { CENTER_URL } = config;

export const getTestingCenters = async () => {
  const res = await fetch(CENTER_URL);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return mapKeysToCamelCase(data);
};

export const getTestingCenterById = async (pk) => {
  const res = await fetch(`${CENTER_URL}${pk}/`);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return mapKeysToCamelCase(data);
};

export const useSearchCentersQuery = () => {
  const {
    data: searchResults,
    fetchData: searchTestingCenters,
    ...rest
  } = useGet(`${CENTER_URL}search/`, { enabled: false });

  return { searchResults, searchTestingCenters, ...rest };
};
