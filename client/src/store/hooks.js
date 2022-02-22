import { useStore } from './useStore';

export const useSelectedCenterPk = () => {
  const selectedCenterPk = useStore((state) => state.selectedCenterPk);
  const setSelectedCenterPk = useStore((state) => state.setSelectedCenterPk);
  const clearSelectedCenterPk = useStore((state) => state.clearSelectedCenterPk);

  return { selectedCenterPk, setSelectedCenterPk, clearSelectedCenterPk };
};

export const useMap = () => {
  const map = useStore((state) => state.map);
  const mapPlatform = useStore((state) => state.mapPlatform);
  const isMapLoading = useStore((state) => state.isMapLoading);
  const setMapLoaded = useStore((state) => state.setMapLoaded);
  const unloadMap = useStore((store) => store.unloadMap);

  return { map, mapPlatform, isMapLoading, setMapLoaded, unloadMap };
};

export const usePhoneNumber = () => {
  const showPhoneNumber = useStore((state) => state.showPhoneNumber);
  const setShowPhoneNumber = useStore((state) => state.setShowPhoneNumber);

  return { showPhoneNumber, setShowPhoneNumber };
};
