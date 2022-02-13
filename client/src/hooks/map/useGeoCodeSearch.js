import { useCallback } from 'react';

const defaultGeoCodeSearchOptions = {
  onSuccess: () => {},
  onError: () => {},
};

export const useGeoCodeSearch = (
  platform,
  { onSuccess, onError } = defaultGeoCodeSearchOptions,
) => {
  return useCallback(
    (searchText) => {
      if (!platform) return;

      const searchService = platform.getSearchService();

      const searchParameter = {
        q: searchText,
        in: 'countryCode:ROU',
      };

      searchService.geocode(searchParameter, onSuccess, onError);
    },
    [onError, onSuccess, platform],
  );
};

export default { useGeoCodeSearch };
