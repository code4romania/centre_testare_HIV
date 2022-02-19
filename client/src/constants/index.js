const { H } = window;

export const DEFAULT_MAP_OPTIONS = {
  center: { lat: 45.9432, lng: 24.9668 },
  enableMapBehaviors: true,
  enableMapUi: true,
  // Romanias most extreme points https://en.wikipedia.org/wiki/List_of_extreme_points_of_Romania
  mapBounds: new H.geo.Rect(48.15, 20.19, 43.4, 29.4),
  zoom: 0,
};

export default { defaultMapOptions: DEFAULT_MAP_OPTIONS };
