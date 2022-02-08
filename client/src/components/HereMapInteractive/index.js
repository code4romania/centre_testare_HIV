import React, { useRef } from 'react';
import { Col, Row } from 'antd';

import BuildingDetailsFragment from '../BuildingDetailsFragment';
import MapPlaceholder from '../MapPlaceholder';

import useDecoratedClusteredMap from '../../hooks/map/useDecoratedClusteredMap';
import { useCreateMap } from '../../hooks/map/useCreateMap';

const HereMapInteractive = (props) => {
  const { points } = props;

  const mapRef = useRef(null);

  const { map: currentMap, isMapLoading } = useCreateMap(mapRef);

  const { buildingDetails, onHideBuilding } = useDecoratedClusteredMap(currentMap, points);

  const showSearchResults = buildingDetails;
  const showRightPanel = showSearchResults || buildingDetails;
  mapRef?.current?.addEventListener('wheel', (e) => e.preventDefault());

  return (
    <div style={{ height: '422px', position: 'relative' }}>
      <Row type="flex" gutter={30}>
        <Col
          xs={{ span: showRightPanel ? 0 : 24 }}
          sm={{ span: showRightPanel ? 12 : 24 }}
          lg={{ span: showRightPanel ? 16 : 24 }}
        >
          {isMapLoading && <MapPlaceholder />}
          <div className="map-container" ref={mapRef} />
        </Col>
        <Col
          xs={{ span: showRightPanel ? 24 : 0 }}
          sm={{ span: showRightPanel ? 12 : 0 }}
          lg={{ span: showRightPanel ? 8 : 0 }}
        >
          <BuildingDetailsFragment onClose={onHideBuilding} incompleteDetails={buildingDetails} />
        </Col>
      </Row>
    </div>
  );
};

export default HereMapInteractive;
