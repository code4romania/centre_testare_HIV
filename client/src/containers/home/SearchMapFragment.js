import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Trans } from '@lingui/macro';
import HereMapInteractive from '../../components/HereMapInteractive';
import { SearchFragment } from './SearchFragment';
import { useCreateMap } from '../../hooks/map/useCreateMap';
import { useGeoCodeSearch } from '../../hooks/map/useGeoCodeSearch';
import { zoomToNearestPointToPosition } from '../../utils';
import { useSearchCentersQuery, useTestingCentersQuery } from '../../queries';

const SEARCH_OPTIONS = {
  byLocation: {
    value: 'byLocation',
    text: <Trans>By location</Trans>,
  },
  byAddress: {
    value: 'byAddress',
    text: <Trans>By testing center address</Trans>,
  },
};

export const SearchMapFragment = () => {
  const mapRef = useRef(null);
  const [searchOption, setSearchOption] = useState(SEARCH_OPTIONS.byLocation);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const { map, mapPlatform, isMapLoading } = useCreateMap(mapRef);

  const { testingCenters } = useTestingCentersQuery();
  const {
    searchResults,
    isLoading: isLoadingTestingCenters,
    searchTestingCenters,
  } = useSearchCentersQuery();

  const isLoading = isLoadingTestingCenters || isLoadingLocation;

  const data = useMemo(() => {
    if (searchOption.value === SEARCH_OPTIONS.byLocation.value) {
      return [{ value: 'Current location', text: 'Use current location' }];
    }
    return searchResults?.map((item) => {
      return {
        value: item.pk,
        text: item.fullAddress,
      };
    });
  }, [searchOption.value, searchResults]);

  const geoCodeSearch = useGeoCodeSearch(mapPlatform, {
    onSuccess({ items }) {
      setIsLoadingLocation(false);
      if (!map || items.length === 0) return;

      const [firstItem] = items;
      const { position } = firstItem;

      zoomToNearestPointToPosition(map, position, testingCenters);
    },
  });

  const onSearchHandler = useCallback(
    (searchText) => {
      if (searchOption.value === SEARCH_OPTIONS.byLocation.value) {
        setIsLoadingLocation(true);
        geoCodeSearch(searchText);
      } else {
        searchTestingCenters({ query: searchText });
      }
    },
    [geoCodeSearch, searchOption.value, searchTestingCenters],
  );

  const onSelectResultHandler = useCallback(() => {
    if (searchOption.value === SEARCH_OPTIONS.byLocation.value) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setIsLoadingLocation(false);
        zoomToNearestPointToPosition(
          map,
          { lat: coords.latitude, lng: coords.longitude },
          testingCenters,
        );
      });
    }
    // @TODO add result select handler for byAddress search option
  }, [map, searchOption.value, testingCenters]);

  const onChangeSearchOptionHandler = useCallback(({ target }) => {
    setSearchOption(SEARCH_OPTIONS[target.value]);
  }, []);

  return (
    <>
      <SearchFragment
        data={data ?? []}
        defaultSearchOption={searchOption.value}
        isLoading={isLoading}
        onChangeSearchOption={onChangeSearchOptionHandler}
        onSearch={onSearchHandler}
        onSelectResult={onSelectResultHandler}
        searchOptions={SEARCH_OPTIONS}
      />
      <div>
        <HereMapInteractive
          map={map}
          mapRef={mapRef}
          points={testingCenters}
          isMapLoading={isMapLoading}
        />
      </div>
    </>
  );
};

export default { SearchMapFragment };
