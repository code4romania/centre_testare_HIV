import React, { useRef } from 'react';
import { number, shape } from 'prop-types';
import MapPlaceholder from '../MapPlaceholder';
import { useCreateMap } from '../../hooks/map/useCreateMap';
import useDecoratedClusteredMap from '../../hooks/map/useDecoratedClusteredMap';
import { useMap } from '../../store';

const mapOptions = { enableMapBehaviors: false, enableMapUi: false, zoom: 15 };

export const HereMapFixedLocation = ({ coordinates }) => {
  const mapRef = useRef(null);

  useCreateMap(mapRef, { ...mapOptions, center: coordinates });
  const { map, isMapLoading } = useMap();

  useDecoratedClusteredMap(map, [coordinates]);

  return (
    <div style={{ position: 'relative' }}>
      {isMapLoading && <MapPlaceholder noMargin />}
      <div className="map-container" ref={mapRef} />
    </div>
  );
};

HereMapFixedLocation.propTypes = {
  coordinates: shape({
    lat: number,
    lng: number,
  }).isRequired,
};

export default { HereMapFixedLocation };
