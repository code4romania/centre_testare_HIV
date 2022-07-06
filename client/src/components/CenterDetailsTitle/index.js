import React from 'react';
import { Col, Icon, Row, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { CenterDetailsTitleType } from '../../types/centers';
import { ReactComponent as StarIcon } from '../../images/star-solid.svg';
import { mapCoordinatesToLocationHref } from '../../utils';

const { Paragraph, Text } = Typography;

export const CenterDetailsTitle = ({ details }) => {
  const showSubtext = details?.locality || details?.countyCode;

  const urlQuery = details?.name.replaceAll(' ', '+') ?? '';
  const locationHref = mapCoordinatesToLocationHref(details?.lat ?? 0, details?.lng ?? 0, urlQuery);

  return (
    <Col span={22} className="center-details-title">
      <Row>
        <Col span={2}>
          <Icon type="environment" />
        </Col>
        <Col span={22}>
          <Paragraph className="center-details-title__text">
            {details?.streetName} {details?.streetNumber}{' '}
          </Paragraph>

          <Paragraph>
            {showSubtext && (
              <Text className="center-details-title__subtext">
                {details?.locality && details?.countyCode
                  ? `${details?.locality}, ${details?.countyCode}`
                  : details?.locality ?? details?.countyCode}
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

          {Boolean(details?.averageRating) && (
            <Text className="center-details-rating">
              <StarIcon /> {Math.round(details.averageRating * 10) / 10}{' '}
              <span>({details?.numberOfRatings})</span>
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
