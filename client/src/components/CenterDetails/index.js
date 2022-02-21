import React, { useCallback, useMemo, useState } from 'react';
import { Button, Card, Col, Icon, Row, Descriptions, Empty } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { CenterDetailsTitle } from '../CenterDetailsTitle';
import { useGlobalContext } from '../../context';

export const CenterDetails = ({ onClose, isLoading, details }) => {
  const { currentLanguage } = useGlobalContext();

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const detailsItems = useMemo(() => {
    if (!details) {
      return [];
    }

    const hasTestTypes = details.testTypes?.length > 0;

    const testTypes = hasTestTypes
      ? details.testTypes
          .map(({ nameRo, nameEn }) => (currentLanguage === 'ro' ? nameRo : nameEn))
          .join(', ')
      : null;

    return [
      {
        label: <Trans>Opening hours</Trans>,
        value: details.schedule,
      },
      {
        label: <Trans>Test types</Trans>,
        value: testTypes,
      },
      {
        label: <Trans>Website</Trans>,
        value: details.website ? (
          <Link to={{ pathname: details.website }} target="_blank">
            {details.website}
          </Link>
        ) : null,
      },
    ].filter(({ value }) => value);
  }, [currentLanguage, details]);

  const hasDetailItems = detailsItems.length > 0;

  const onCallCenterHandler = useCallback(() => setShowPhoneNumber(true), []);

  return (
    <Card className="center-details" loading={isLoading}>
      <Row type="flex" gutter={10} className="center-details-header">
        <CenterDetailsTitle
          streetName={details?.streetName ?? ''}
          streetNumber={details?.streetNumber}
          locality={details?.locality}
          countyCode={details?.countyCode}
          lat={details?.lat}
          lng={details?.lng}
          ratings={details?.ratings}
        />
        <Col span={2}>
          <Icon type="close" onClick={onClose} />
        </Col>
      </Row>

      {hasDetailItems ? (
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

      <Button
        className="call-center-btn"
        icon="phone"
        size="large"
        type="primary"
        ghost
        block
        disabled={!hasDetailItems || !details?.phoneNumber}
        href={`tel:${details?.phoneNumber}`}
        onClick={onCallCenterHandler}
      >
        <span>{!showPhoneNumber ? <Trans>Call center</Trans> : details?.phoneNumber}</span>
      </Button>
    </Card>
  );
};

export default { CenterDetails };
