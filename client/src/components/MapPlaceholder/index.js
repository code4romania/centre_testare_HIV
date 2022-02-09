import { Trans } from '@lingui/macro';
import { Empty, Spin, Typography } from 'antd';
import { bool } from 'prop-types';
import React from 'react';

const { Text } = Typography;

const MapPlaceholder = ({ noMargin }) => (
  <Empty
    image={<Spin size="large" />}
    imageStyle={{ height: 'auto' }}
    description={
      <Text>
        <Trans>Map loading…</Trans>
      </Text>
    }
    style={{
      position: 'absolute',
      zIndex: 99,
      backgroundColor: 'white',
      height: '100%',
      left: 0,
      margin: noMargin ? 0 : '0 15px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      right: 0,
      borderRadius: '10px',
    }}
  />
);

MapPlaceholder.defaultProps = {
  noMargin: false,
};

MapPlaceholder.propTypes = {
  noMargin: bool,
};

export default MapPlaceholder;
