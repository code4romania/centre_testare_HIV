import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph, Text, Title } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ marginTop: '4rem', textAlign: 'left' }}>
      <Col span={24}>
        <Title level={2}>
          <Trans>About the project stages</Trans>
        </Title>
        <Paragraph>
          <Trans>
            We collect information from young people aged 15-35 on their access to sexual and
            reproductive health education. We want to know what they know about contraceptive
            methods and HIV infection as well as testing methods.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            We present the results of the analysis of the local authorities through press
            conferences to make them aware of the needs of young people.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            We are implementing the <Text strong>first application in Romania</Text> for HIV
            testing, where details regarding the location, schedule and cost of testing for HIV
            infection will be available, we provide counseling before and after testing for people
            who need additional information, we provide details on how to test people under the age
            of 16.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            We organize a process of informing students and young people through non-formal sessions
            following the Norwegian model of sexual and reproductive health education.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            We are setting up advocacy actions with local authorities based on the results of the{' '}
            <Text strong>Services for youth from Norway in Romania – PILOT</Text> program in order
            to bring to the attention of the authorities the need to invest in services aimed at
            ensuring young people access to information on sexual and reproductive health, easy
            access to contraception and testing for HIV infection.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
