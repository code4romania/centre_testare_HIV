import React, { useMemo } from 'react';
import { Col, Icon, Row, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { CenterDetailsTitleType } from '../../types/centers';
import { ReactComponent as StarIcon } from '../../images/star-solid.svg';

const { Paragraph, Text } = Typography;

export const CenterDetailsTitle = ({
  streetName,
  streetNumber,
  locality,
  countyCode,
  lat,
  lng,
  ratings,
}) => {
  const showSubtext = locality || countyCode;

  const averageRating = useMemo(() => {
    const total = ratings?.reduce((sum, { rating }) => sum + rating, 0);
    const ratingsCount = ratings?.length;
    const average = total / ratingsCount;
    return Math.round(average * 10) / 10;
  }, [ratings]);

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
              <Link
                to={{
                  pathname: `https://maps.google.com?q=${parseFloat(lat, 10)},${parseFloat(
                    lng,
                    10,
                  )}`,
                }}
                target="_blank"
              >
                <Trans>see how to get there</Trans>
              </Link>
              )
            </Text>
          </Paragraph>

          {Boolean(averageRating) && (
            <Text className="center-details-rating">
              <StarIcon /> {averageRating} <span>({ratings?.length})</span>
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
