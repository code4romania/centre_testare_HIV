import React from 'react';
import { Card, Skeleton, Row, Descriptions, Empty } from 'antd';
import { Trans } from '@lingui/macro';
import BuildingDetailsTitle from './BuildingDetailsTitle';
import BuildingDetailsFooter from './BuildingDetailsFooter';

const BuildingDetails = ({ onClose, isLoading, details }) => {
  const detailsItems = details
    ? [
        {
          label: <Trans>Schedule</Trans>,
          value: details.schedule,
        },
        {
          label: <Trans>Test types</Trans>,
          value: details.test_types,
        },
      ].filter(({ value }) => value)
    : [];

  return (
    <Card className="building-details">
      <Skeleton loading={isLoading}>
        <BuildingDetailsTitle
          address={details?.street_name}
          streetNumber={details?.street_number}
          locality={details?.locality}
          countyCode={details?.county_code}
          onClose={onClose}
        />
        {detailsItems.length > 0 ? (
          <Descriptions column={1}>
            {detailsItems.map(({ label, value }) => (
              <Descriptions.Item key={label} label={label}>
                {value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        ) : (
          <Row type="flex" align="middle" justify="space-around" style={{ height: '100%' }}>
            <Empty description={<Trans>Information missing</Trans>} />
          </Row>
        )}
        <BuildingDetailsFooter />
      </Skeleton>
    </Card>
  );
};

export default BuildingDetails;
