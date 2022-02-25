import { getDistanceBetweenTwoPoints, getNearestPoint, sortCoordinates } from '../utils';
import { HereMapDomIcons } from './hereMapDomIcons';

const { H } = window;

const BOUNDS_OFFSET = {
  topMin: 0.04,
  topMax: 0.13,
  bottom: 0.01,
  left: 0.04,
  right: 0.04,
};

const createDomMakerAtPosition = (position) => {
  const { userPinDomIcon } = HereMapDomIcons;

  return new H.map.DomMarker(position, { icon: userPinDomIcon });
};

const getBoundsByTwoPoints = (x, y) => {
  const [left, right, bottom, top] = sortCoordinates(x, y);

  const dist = getDistanceBetweenTwoPoints(x, y);
  const topOffset = dist > 0.7 ? BOUNDS_OFFSET.topMax : BOUNDS_OFFSET.topMin;

  return new H.geo.Rect(
    top + topOffset,
    left - BOUNDS_OFFSET.left,
    bottom - BOUNDS_OFFSET.bottom,
    right + BOUNDS_OFFSET.right,
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
