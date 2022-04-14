import { Col, Row, Spin } from 'antd';
import React, { useCallback } from 'react';
import { Trans } from '@lingui/macro';
import { CenterDetailsCard } from '../../components/CenterDetailsCard';
import { useDetailedTestingCentersQuery } from '../../queries';
import { useCenterDetailsDialog } from '../../store';

export const CentersFragment = () => {
  const { data, isLoading } = useDetailedTestingCentersQuery({
    limit: 4,
    offset: 0,
  });
  const { openDialog } = useCenterDetailsDialog();

  const onShowCenterDetailsHandler = useCallback(() => {
    openDialog();
  }, [openDialog]);

  return (
    <Row gutter={[12, 16]} style={{ paddingTop: '12px' }}>
      {data?.results?.map(({ pk, name, streetName, streetNumber, locality, county }) => (
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CenterDetailsCard key={pk} title={name} onActionClick={onShowCenterDetailsHandler}>
            <Trans>Adresa: </Trans>
            {streetName} {streetNumber}, {locality}, {county}
          </CenterDetailsCard>
        </Col>
      ))}
      {isLoading && (
        <Col style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </Col>
      )}
    </Row>
  );
};

export default { CentersFragment };
