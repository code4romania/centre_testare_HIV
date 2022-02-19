import { useCallback } from 'react';
import { DEFAULT_MAP_OPTIONS } from '../../constants';
import { useMap } from '../../store';
import ClusterLayerBuilder from './ClusterLayerBuilder';

const { mapBounds } = DEFAULT_MAP_OPTIONS;

export const useClearSelectedMarkers = () => {
  const { map } = useMap();

  return useCallback(() => {
    const markers = map
      .getLayers()
      .asArray()
      .filter((layer) => layer.getProvider().providesDomMarkers())
      .map((layer) => layer.getProvider().requestDomMarkers(mapBounds, 20))
      .flat()
      .filter((marker) => marker.getData());

    markers.forEach((marker) => {
      ClusterLayerBuilder.unhighlightMarker(marker);
    });
  }, [map]);
};

export default { useClearSelectedMarkers };
