import { Col, Row } from 'antd';
import React, { useCallback } from 'react';
import { CenterDetailsCard } from '../../components/CenterDetailsCard';
import { useTestingCentersQuery } from '../../queries';
import { useCenterDetailsDialog } from '../../store';

export const CentersFragment = () => {
  const { data: testingCenters } = useTestingCentersQuery();
  const { openDialog } = useCenterDetailsDialog();

  const onShowCenterDetailsHandler = useCallback(() => {
    openDialog();
  }, [openDialog]);

  return (
    <Row gutter={[12, 16]} style={{ paddingTop: '12px' }}>
      {testingCenters?.map(({ pk }) => (
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CenterDetailsCard
            key={pk}
            title="Nume centru de testare"
            onActionClick={onShowCenterDetailsHandler}
          >
            Adresa centru de testare
          </CenterDetailsCard>
        </Col>
      ))}
    </Row>
  );
};

export default { CentersFragment };
