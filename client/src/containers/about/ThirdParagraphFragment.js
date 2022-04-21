import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph, Title } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ textAlign: 'left', marginBottom: '6rem' }}>
      <Col span={24}>
        <Title level={2}>
          <Trans>About TestHIV</Trans>
        </Title>
        <Paragraph>
          <Trans>
            TestHIV - is the first application in Romania for HIV testing, where there are
            centralized institutions from 11 counties in Romania that offer HIV testing. In the
            application we provide details such as the location of the institution, the work
            schedule, the cost of a test and details needed to test for HIV infection, how to test
            people under 16 and provide counseling for people who need more information.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
