import React, { useCallback, useMemo } from 'react';
import { Button, Card, Col, Icon, Row, Descriptions, Empty, Tag } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { CenterDetailsTitle } from '../CenterDetailsTitle';
import { useCenterDetailsDialog } from '../../store';

const numberOfTypesToShow = 2;

export const CenterDetails = ({ onClose, isLoading, details }) => {
  const { openDialog } = useCenterDetailsDialog();

  const onOpenDialogHandler = useCallback(() => {
    openDialog(details);
  }, [details, openDialog]);

  const detailsItems = useMemo(() => {
    if (!details) {
      return [];
    }

    const hasTestTypes = details.testTypes?.length > 0;

    const testTypes = hasTestTypes ? (
      <>
        {details.testTypes.slice(0, numberOfTypesToShow).map((type) => (
          <Tag key={type} color="#be3386">
            {type}
          </Tag>
        ))}
        {details.testTypes.length > numberOfTypesToShow && (
          <Tag>+{details.testTypes.length - numberOfTypesToShow}</Tag>
        )}
      </>
    ) : null;

    return [
      {
        label: <Trans>Opening hours</Trans>,
        value:
          details.scheduleStart && details.scheduleEnd ? (
            <span>
              {details.scheduleStart} - {details.scheduleEnd}
            </span>
          ) : null,
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
  }, [details]);

  const hasDetailItems = detailsItems.length > 0;

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
          averageRating={details?.averageRating}
          totalRatings={details?.numberOfRatings}
        />
        <Col span={2}>
          <Icon type="close" onClick={onClose} />
        </Col>
      </Row>

      {hasDetailItems ? (
        <Descriptions layout="vertical" size="small">
          {detailsItems.map(({ label, value }) => (
            <Descriptions.Item key={label} label={label} span={3}>
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
        size="large"
        type="primary"
        ghost
        block
        onClick={onOpenDialogHandler}
      >
        <span>
          <Trans>Detalii centru</Trans>
        </span>
      </Button>

      {/* {showPhoneNumber ? (
        <Button
          className="call-center-btn"
          icon="phone"
          size="large"
          type="primary"
          ghost
          block
          disabled={!hasDetailItems || !details?.phoneNumber}
          href={`tel:${details?.phoneNumber}`}
        >
          <span>{details?.phoneNumber ?? <Trans>Phone number missing</Trans>}</span>
        </Button>
      ) : (
        <Button
          className="call-center-btn"
          size="large"
          type="primary"
          ghost
          block
          disabled={!hasDetailItems || !details?.phoneNumber}
          onClick={onClick}
        >
          <span>
            <Trans>Call center</Trans>
          </span>
        </Button>
      )} */}
    </Card>
  );
};

export default { CenterDetails };
