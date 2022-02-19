import React from 'react';

import MapPlaceholder from '../MapPlaceholder';

export const InteractiveMap = ({ mapRef, isMapLoading }) => {
  return (
    <>
      {isMapLoading && <MapPlaceholder />}
      <div className="map-container" ref={mapRef} />
    </>
  );
};

export default { InteractiveMap };
