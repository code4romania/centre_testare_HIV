import config from '../config';
import { mapKeysToCamelCase } from '../utils';
import { useGet } from './requests';

const { CENTER_URL, CENTERS_URL, CENTER_QUESTIONS_URL } = config;

export const getTestingCenters = async (language = 'ro') => {
  const res = await fetch(CENTER_URL(language));
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return mapKeysToCamelCase(data);
};

export const getDetailedTestingCenters = async (params, language = 'ro') => {
  let url;
  if (params) {
    const queryParams = new URLSearchParams(params);
    url = `${CENTERS_URL(language)}?${queryParams}`;
  } else {
    url = CENTERS_URL(language);
  }

  const res = await fetch(url);
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
  } = useGet(`${CENTER_URL('ro')}search/`, { enabled: false });

  return { searchResults, searchTestingCenters, ...rest };
};

export const getCenterReviewQuestions = async (language = 'ro') => {
  const res = await fetch(CENTER_QUESTIONS_URL(language));

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return mapKeysToCamelCase(data);
};
