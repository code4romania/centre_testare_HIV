import { useCallback } from 'react';
import { useMap, useSelectedCenterPk } from '../../store';
import ClusterLayerBuilder from './ClusterLayerBuilder';
import { useClearSelectedMarkers } from './useClearSelectedMarkers';
import { useZoomToMarker } from './useZoomToMarker';

export const useCreateMapClusters = () => {
  const { map } = useMap();
  const { setSelectedCenterPk } = useSelectedCenterPk();
  const zoomToMarker = useZoomToMarker();
  const clearSelectedMarkers = useClearSelectedMarkers();

  const onClusterClick = useCallback(
    (marker) => {
      map.getViewModel().setLookAtData(
        {
          position: marker.getData().getPosition(),
          zoom: map.getZoom() + 2,
        },
        true,
      );
    },
    [map],
  );

  const onMarkerClick = useCallback(
    (marker) => {
      if (!marker) return;

      clearSelectedMarkers();

      zoomToMarker(marker);

      setSelectedCenterPk(marker.getData().getData().pk);
    },
    [clearSelectedMarkers, setSelectedCenterPk, zoomToMarker],
  );

  return useCallback(
    (points) => {
      if (!map) return;

      map.addLayer(ClusterLayerBuilder.buildClusterLayer(points, onClusterClick, onMarkerClick));
    },
    [map, onClusterClick, onMarkerClick],
  );
};

export default { useCreateMapClusters };
