import React from 'react';
import { Row, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { HereMapFixedLocation } from '../../components/HereMapFixedLocation';

const { Paragraph, Title } = Typography;

// @TODO replace with actual NGO coordinates
const ngoCoordinates = { lat: 44.4268, lng: 26.1025 };

export const MapFragment = () => {
  return (
    <Row>
      <Title level={2} className="form-title">
        <Trans>Our address</Trans>
      </Title>
      <Title level={4} className="form-subtitle">
        {/* @TODO replace with actual NGO address */}
        <Trans>23 Grigore Pamfil, Sector 1, Bucharest</Trans>
      </Title>
      <Paragraph>
        (
        <Trans>
          <Link
            to={{
              pathname: `https://maps.google.com?q=${ngoCoordinates.lat},${ngoCoordinates.lng}`,
            }}
            target="_blank"
          >
            open in Google Maps
          </Link>
        </Trans>
        )
      </Paragraph>
      <HereMapFixedLocation coordinates={ngoCoordinates} />
    </Row>
  );
};

export default { MapFragment };
