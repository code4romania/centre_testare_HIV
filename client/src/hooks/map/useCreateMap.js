import { useLayoutEffect, useState } from 'react';
import config from '../../config';

const { H } = window;

const { MAP_API_KEY } = config;

const defaultMapOptins = {
  center: { lat: 45.9432, lng: 24.9668 },
  enableMapBehaviors: true,
  enableMapUi: true,
  // Romanias most extreme points https://en.wikipedia.org/wiki/List_of_extreme_points_of_Romania
  mapBounds: new H.geo.Rect(48.15, 20.19, 43.4, 29.4),
  zoom: 0,
};

export function useCreateMap(mapRef, options = defaultMapOptins) {
  const [map, setMap] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const { center, mapBounds: bounds, enableMapBehaviors, enableMapUi, zoom } = options;

  useLayoutEffect(() => {
    if (!mapRef.current || !MAP_API_KEY) return undefined;

    const platform = new H.service.Platform({ apikey: MAP_API_KEY });
    const layer = platform.createDefaultLayers();

    const hMap = new H.Map(mapRef.current, layer.vector.normal.map, {
      center,
      bounds,
      zoom,
    });

    const events = new H.mapevents.MapEvents(hMap);

    if (enableMapBehaviors) {
      // eslint-disable-next-line no-unused-vars
      const behavior = new H.mapevents.Behavior(events);
    }

    if (enableMapUi) {
      // eslint-disable-next-line no-unused-vars, new-cap
      const ui = new H.ui.UI.createDefault(hMap, layer);
    }

    const onResizeWindow = () => {
      hMap.getViewPort().resize();
    };

    const mapEngine = hMap.getEngine();

    const onMapRendered = (event) => {
      if (mapEngine === event.target) {
        setIsMapLoading(false);
      }
    };

    mapEngine.addEventListener('render', onMapRendered);
    window.addEventListener('resize', onResizeWindow);

    setMap(hMap);

    return () => {
      mapEngine.removeEventListener('render', onMapRendered);
      window.removeEventListener('resize', onResizeWindow);
      hMap.dispose();
    };
  }, [bounds, center, enableMapBehaviors, enableMapUi, mapRef, setMap, zoom]);

  return { map, isMapLoading };
}

export default useCreateMap;
