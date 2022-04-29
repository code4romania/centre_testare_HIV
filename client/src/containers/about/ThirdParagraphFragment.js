import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph, Title } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ textAlign: 'left', marginBottom: '6rem' }}>
      <Col span={24}>
        <Title level={2}>
          <Trans>About HIV Centers</Trans>
        </Title>
        <Paragraph>
          <Trans>
            Centre HIV - is the first HIV testing app in Romania, where institutions from 11
            counties in Romania offering HIV testing are centralized. Within the app we provide
            details such as the location of the institution, opening hours, cost of a test as well
            as details needed for HIV testing, how to test people under 16 and provide counseling
            for people who need more information.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
