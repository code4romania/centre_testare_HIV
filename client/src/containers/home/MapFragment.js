import React, { useCallback, useEffect, useRef } from 'react';
import { Col, Row } from 'antd';
import { CenterDetails } from '../../components/CenterDetails';
import { InteractiveMap } from '../../components/InteractiveMap';
import { useCreateMap } from '../../hooks/map/useCreateMap';
import { useMap, useSelectedCenterPk, usePhoneNumber } from '../../store';
import { useTestingCenterByIdQuery } from '../../queries';
import { useClearSelectedMarkers } from '../../hooks/map/useClearSelectedMarkers';
import { useGlobalContext } from '../../context';

export const MapFragment = () => {
  const mapRef = useRef(null);
  const { currentLanguage } = useGlobalContext();

  useCreateMap(mapRef);
  const { map, isMapLoading } = useMap();

  const { selectedCenterPk, clearSelectedCenterPk } = useSelectedCenterPk();
  const clearSelectedMarkers = useClearSelectedMarkers();
  const { showPhoneNumber, setShowPhoneNumber } = usePhoneNumber();

  const {
    data: centerDetails,
    isLoading: isLoadingCenter,
    refetch: refetchCenterDetails,
  } = useTestingCenterByIdQuery(
    { pk: selectedCenterPk, language: currentLanguage },
    {
      enabled: Boolean(selectedCenterPk),
    },
  );

  const showRightPanel = Boolean(selectedCenterPk);

  const onCloseRightPanel = useCallback(() => {
    clearSelectedCenterPk();
    clearSelectedMarkers();
  }, [clearSelectedCenterPk, clearSelectedMarkers]);

  const onCallCenterHandler = useCallback(() => {
    setShowPhoneNumber();
  }, [setShowPhoneNumber]);

  useEffect(() => {
    if (!map) return;

    map.getViewPort().resize();
  }, [map, showRightPanel]);

  useEffect(() => {
    refetchCenterDetails();
  }, [refetchCenterDetails, currentLanguage]);

  return (
    <div style={{ height: '422px', position: 'relative' }}>
      <Row type="flex" gutter={30}>
        <Col
          xs={{ span: showRightPanel ? 0 : 24 }}
          sm={{ span: showRightPanel ? 12 : 24 }}
          lg={{ span: showRightPanel ? 16 : 24 }}
        >
          <InteractiveMap mapRef={mapRef} isMapLoading={isMapLoading} />
        </Col>
        <Col
          xs={{ span: showRightPanel ? 24 : 0 }}
          sm={{ span: showRightPanel ? 12 : 0 }}
          lg={{ span: showRightPanel ? 8 : 0 }}
        >
          <CenterDetails
            details={centerDetails}
            onClose={onCloseRightPanel}
            isLoading={isLoadingCenter}
            showPhoneNumber={showPhoneNumber}
            onClick={onCallCenterHandler}
          />
        </Col>
      </Row>
    </div>
  );
};

export default { MapFragment };
