import { useCallback } from 'react';
import { DEFAULT_MAP_OPTIONS } from '../../constants';
import { useMap } from '../../store';
import { useZoomToMarker } from './useZoomToMarker';

const { mapBounds } = DEFAULT_MAP_OPTIONS;

export const useShowCenterOnMap = () => {
  const { map } = useMap();
  const zoomToMarker = useZoomToMarker();

  return useCallback(
    (pk) => {
      const markers = map
        .getLayers()
        .asArray()
        .filter((layer) => layer.getProvider().providesDomMarkers())
        .map((layer) => layer.getProvider().requestDomMarkers(mapBounds, 20));

      const foundMarker = markers
        .flat()
        .find(
          (marker) =>
            marker.getData().getData && marker.getData().getData().pk === parseInt(pk, 10),
        );

      if (foundMarker) {
        zoomToMarker(foundMarker);
      }
    },
    [map, zoomToMarker],
  );
};

export default { useShowCenterOnMap };
