import { useLayoutEffect } from 'react';
import { useMap } from '../../store';
import config from '../../config';
import { DEFAULT_MAP_OPTIONS } from '../../constants';

const { H } = window;

const { MAP_API_KEY } = config;

export function useCreateMap(mapRef, options = DEFAULT_MAP_OPTIONS) {
  const { setMapLoaded, unloadMap } = useMap();
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
        setMapLoaded({ map: hMap, mapPlatform: platform });
      }
    };

    mapEngine.addEventListener('render', onMapRendered);
    window.addEventListener('resize', onResizeWindow);

    return () => {
      mapEngine.removeEventListener('render', onMapRendered);
      window.removeEventListener('resize', onResizeWindow);
      hMap.dispose();
      unloadMap();
    };
  }, [bounds, center, enableMapBehaviors, enableMapUi, mapRef, setMapLoaded, unloadMap, zoom]);
}

export default useCreateMap;
