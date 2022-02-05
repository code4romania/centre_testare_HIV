import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ marginTop: '4rem', textAlign: 'left' }}>
      <Col span={24}>
        <Paragraph style={{ paddingBottom: '2rem' }}>
          {/* @TODO replace lorem text */}
          <Trans id="about.first_paragraph" />
        </Paragraph>
        <Paragraph>
          {/* @TODO replace lorem text */}
          <Trans id="about.second_paragraph" />
        </Paragraph>
      </Col>
    </Row>
  );
};
