import React, { useCallback, useMemo, useState } from 'react';
import { Trans, t } from '@lingui/macro';
import { message } from 'antd';
import { MapFragment } from './MapFragment';
import { SearchFragment } from './SearchFragment';
import { useGeoCodeSearch } from '../../hooks/map/useGeoCodeSearch';
import { zoomToNearestPointToPosition } from '../../utils';
import { useSearchCentersQuery, useTestingCentersQuery } from '../../queries';
import { useMap, useSelectedCenterPk } from '../../store';
import { useCreateMapClusters } from '../../hooks/map/useCreateMapClusters';
import { useShowCenterOnMap } from '../../hooks/map/useShowCenterOnMap';
import { useClearSelectedMarkers } from '../../hooks/map/useClearSelectedMarkers';

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
  const [searchOption, setSearchOption] = useState(SEARCH_OPTIONS.byLocation);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const { map, mapPlatform, isMapLoading } = useMap();

  const createMapClusters = useCreateMapClusters();
  const { setSelectedCenterPk, clearSelectedCenterPk } = useSelectedCenterPk();
  const showCenterOnMap = useShowCenterOnMap();
  const clearSelectedMarkers = useClearSelectedMarkers();

  const { data: testingCenters } = useTestingCentersQuery({
    enabled: !isMapLoading,
    onSuccess: (points) => {
      createMapClusters(points);
    },
  });

  const {
    searchResults,
    isLoading: isLoadingTestingCenters,
    searchTestingCenters,
  } = useSearchCentersQuery();

  const isLoading = isLoadingTestingCenters || isLoadingLocation;

  const data = useMemo(() => {
    if (searchOption.value === SEARCH_OPTIONS.byLocation.value) {
      return [{ value: 'Current location', text: t({ message: 'Use current location' }) }];
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
        clearSelectedMarkers();
        clearSelectedCenterPk();
        setIsLoadingLocation(true);
        geoCodeSearch(searchText);
      } else {
        searchTestingCenters({ query: searchText });
      }
    },
    [
      clearSelectedCenterPk,
      clearSelectedMarkers,
      geoCodeSearch,
      searchOption.value,
      searchTestingCenters,
    ],
  );

  const onSelectResultHandler = useCallback(
    (event) => {
      clearSelectedMarkers();
      if (searchOption.value === SEARCH_OPTIONS.byLocation.value) {
        clearSelectedCenterPk();
        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            setIsLoadingLocation(false);
            zoomToNearestPointToPosition(
              map,
              { lat: coords.latitude, lng: coords.longitude },
              testingCenters,
            );
          },
          () => {
            setIsLoadingLocation(false);
            message.warning(
              t({
                message:
                  'Location is blocked. To use this option grant location permission and try again.',
              }),
            );
          },
        );
      } else {
        showCenterOnMap(event);
        setSelectedCenterPk(event);
      }
    },
    [
      clearSelectedCenterPk,
      clearSelectedMarkers,
      map,
      searchOption.value,
      setSelectedCenterPk,
      showCenterOnMap,
      testingCenters,
    ],
  );

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
      <MapFragment />
    </>
  );
};

export default { SearchMapFragment };
