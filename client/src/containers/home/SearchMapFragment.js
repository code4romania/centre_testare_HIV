import React, { useCallback, useRef } from 'react';
import HereMapInteractive from '../../components/HereMapInteractive';
import SearchFragment from './SearchFragment';
import { useCreateMap } from '../../hooks/map/useCreateMap';
import { useGeoCodeSearch } from '../../hooks/map/useGeoCodeSearch';
import { zoomToNearestPointToPosition } from '../../utils';
import { useTestingCentersQuery } from '../../queries';

export const SearchMapFragment = () => {
  const mapRef = useRef(null);

  const { map, mapPlatform, isMapLoading } = useCreateMap(mapRef);

  const { testingCenters } = useTestingCentersQuery();

  const geoCodeSearch = useGeoCodeSearch(mapPlatform, {
    onSuccess({ items }) {
      if (!map || items.length === 0) return;

      const [firstItem] = items;
      const { position } = firstItem;

      zoomToNearestPointToPosition(map, position, testingCenters);
    },
  });

  const onSearchHandler = useCallback(
    (searchText) => {
      geoCodeSearch(searchText);
    },
    [geoCodeSearch],
  );

  return (
    <>
      <SearchFragment onSearch={onSearchHandler} />
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
