import React from 'react';
import { Col, Row } from 'antd';

import CenterDetailsFragment from '../CenterDetailsFragment';
import MapPlaceholder from '../MapPlaceholder';

import useDecoratedClusteredMap from '../../hooks/map/useDecoratedClusteredMap';

const HereMapInteractive = ({ map, points, mapRef, isMapLoading }) => {
  const { buildingDetails: centerDetails, onHideBuilding: onHideCenter } = useDecoratedClusteredMap(
    map,
    points,
  );

  const showRightPanel = centerDetails;
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
          <CenterDetailsFragment onClose={onHideCenter} incompleteDetails={centerDetails} />
        </Col>
      </Row>
    </div>
  );
};

export default HereMapInteractive;
