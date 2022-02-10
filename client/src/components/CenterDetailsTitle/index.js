import React from 'react';
import { Col, Icon, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { CenterDetailsTitleType } from '../../types/centers';

const { Text } = Typography;

export const CenterDetailsTitle = ({
  streetName,
  streetNumber,
  locality,
  countyCode,
  lat,
  lng,
}) => {
  const showSubtext = locality || countyCode;

  return (
    <Col className="center-details-title">
      <Icon type="environment" />
      <Text className="center-details-title__text">
        {streetName} {streetNumber}
      </Text>
      {showSubtext && (
        <Text className="center-details-title__subtext">
          {locality && countyCode ? `${locality}, ${countyCode}` : locality ?? countyCode}
        </Text>
      )}
      <Text className="center-details-title__link" underline>
        (
        <Link
          to={{
            pathname: `https://maps.google.com?q=${parseFloat(lat, 10)},${parseFloat(lng, 10)}`,
          }}
          target="_blank"
        >
          <Trans>see how to get there</Trans>
        </Link>
        )
      </Text>
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
