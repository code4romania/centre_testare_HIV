import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph, Text, Title } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ marginTop: '4rem', textAlign: 'left' }}>
      <Col span={24}>
        <Title level={2}>
          <Trans>About the project phases</Trans>
        </Title>
        <Paragraph>
          <Trans>
            We collect information from young people aged 15-35 about their access to sexual and
            reproductive health education. We want to find out what they know about contraception
            and HIV infection as well as testing methods.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            We present the results of the survey to local authorities through press conferences to
            make them aware of the needs of young people.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            We are implementing Romania's <Text strong>first HIV testing app</Text>, where details
            of location, schedule and cost of HIV testing will be available, provide pre- and
            post-test counseling for people who need further information, provide details of how to
            test people under 16.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            We organise outreach to students and young people through non-formal sessions following
            the Norwegian model of sexual and reproductive health education.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            We are setting up advocacy actions with local authorities based on the results of the
            Norwegian <Text strong>Services for Young People in Romania programme - PILOT</Text> -
            with the aim to bring to the attention of the authorities the need to invest in services
            that aim to provide young people with access to sexual and reproductive health
            information, easy access to contraceptives and HIV testing.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
