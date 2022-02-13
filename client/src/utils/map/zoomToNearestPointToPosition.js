import { getNearestPoint, sortCoordinates } from '../utils';
import { HereMapDomIcons } from './hereMapDomIcons';

const { H } = window;

const BOUNDS_OFFSET = 0.03;

const createDomMakerAtPosition = (position) => {
  const { userPinDomIcon } = HereMapDomIcons;

  return new H.map.DomMarker(position, { icon: userPinDomIcon });
};

const getBoundsByTwoPoints = (x, y) => {
  const [left, right, bottom, top] = sortCoordinates(x, y);

  return new H.geo.Rect(
    top + BOUNDS_OFFSET,
    left - BOUNDS_OFFSET,
    bottom - BOUNDS_OFFSET,
    right + BOUNDS_OFFSET,
  );
};

const markersGroup = new H.map.Group();

const addMarkersToMap = (marker, map) => {
  markersGroup.removeAll();
  markersGroup.addObject(marker);
  map.addObject(markersGroup);
};

export const zoomToNearestPointToPosition = (map, position, pointsOnMap) => {
  const marker = createDomMakerAtPosition(position);
  addMarkersToMap(marker, map);

  const { nearestPoint } = getNearestPoint(position, pointsOnMap);
  const bounds = getBoundsByTwoPoints(position, nearestPoint);

  map.getViewModel().setLookAtData(
    {
      bounds,
    },
    true,
  );
};

export default { zoomToNearestPointToPosition };
