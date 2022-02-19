export const createMapSlice = (set) => ({
  map: null,
  mapPlatform: null,
  isMapLoading: true,
  setMapLoaded: ({ map, mapPlatform }) => set({ map, mapPlatform, isMapLoading: false }),
});

export default { createMapSlice };
