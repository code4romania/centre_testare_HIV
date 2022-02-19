import { useCallback } from 'react';
import { useMap } from '../../store';
import ClusterLayerBuilder from './ClusterLayerBuilder';

export const useZoomToMarker = () => {
  const { map } = useMap();

  return useCallback(
    (marker, markerZoom = 15) => {
      if (!marker) return;

      const mapZoom = map.getZoom();
      const zoom = mapZoom > markerZoom ? mapZoom : markerZoom;
      const position = { ...marker.getData().getPosition() };

      map.getViewModel().setLookAtData({ position, zoom }, true);
      ClusterLayerBuilder.highlightMarker(marker);
    },
    [map],
  );
};

export default { useZoomToMarker };
