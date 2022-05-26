import React from 'react';
import { Col, Icon, Row, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { CenterDetailsTitleType } from '../../types/centers';
import { ReactComponent as StarIcon } from '../../images/star-solid.svg';
import { getDeviceType } from '../../utils';

const { Paragraph, Text } = Typography;

const { isIos } = getDeviceType();

export const CenterDetailsTitle = ({
  streetName,
  streetNumber,
  locality,
  countyCode,
  lat,
  lng,
  averageRating,
  totalRatings,
}) => {
  const showSubtext = locality || countyCode;

  const coordinates = `${parseFloat(lat, 10)},${parseFloat(lng, 10)}`;

  const locationHref = isIos
    ? `http://maps.apple.com/?ll=${coordinates}`
    : `https://maps.google.com?q=${coordinates}`;

  return (
    <Col span={22} className="center-details-title">
      <Row>
        <Col span={2}>
          <Icon type="environment" />
        </Col>
        <Col span={22}>
          <Paragraph className="center-details-title__text">
            {streetName} {streetNumber}{' '}
          </Paragraph>

          <Paragraph>
            {showSubtext && (
              <Text className="center-details-title__subtext">
                {locality && countyCode ? `${locality}, ${countyCode}` : locality ?? countyCode}
              </Text>
            )}{' '}
            <Text className="center-details-title__link" underline>
              (
              <Link to={{ pathname: locationHref }} target="_blank">
                <Trans>see how to get there</Trans>
              </Link>
              )
            </Text>
          </Paragraph>

          {Boolean(averageRating) && (
            <Text className="center-details-rating">
              <StarIcon /> {Math.round(averageRating * 10) / 10} <span>({totalRatings})</span>
            </Text>
          )}
        </Col>
      </Row>
    </Col>
  );
};

CenterDetailsTitle.defaultProps = {
  streetNumber: null,
  locality: null,
  countyCode: null,
};

CenterDetailsTitle.propTypes = CenterDetailsTitleType;

export default { CenterDetailsTitle };
