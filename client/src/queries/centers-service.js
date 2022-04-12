import config from '../config';
import { mapKeysToCamelCase } from '../utils';
import { useGet } from './requests';

const { CENTER_URL } = config;

export const getTestingCenters = async (language = 'ro') => {
  const res = await fetch(CENTER_URL(language));
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return mapKeysToCamelCase(data);
};

export const getTestingCenterById = async (pk, language = 'ro') => {
  const res = await fetch(`${CENTER_URL(language)}${pk}/`);

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
