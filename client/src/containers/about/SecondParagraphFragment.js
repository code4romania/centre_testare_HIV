import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph, Text, Title } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ textAlign: 'left' }}>
      <Col span={24}>
        <Title level={2}>
          <Trans>About Semper Musica</Trans>
        </Title>
        <Paragraph>
          <Trans>
            Semper Musica Association was born out of a desire to make a change for the better. We
            work mainly in the field of education for HIV prevention among high school students and
            young people nationwide. We guide our activities according to our vision and mission.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Vision:{' '}
            <Text strong>
              A society without new HIV cases among young people, where discrimination against
              HIV-positive people does not exist
            </Text>
            .
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Mission:{' '}
            <Text strong>
              We fight for free access of young people to education and protection for HIV
              prevention and against discrimination of HIV positive people
            </Text>
            .
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            We have some strong values and we do not distance ourselves from them:{' '}
            <Text strong>innovation</Text>, <Text strong>diversity</Text>,{' '}
            <Text strong>responsibility and quality</Text>,{' '}
            <Text strong>involvement and action</Text>.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Our projects have brought a change for young people in Romania, and their involvement
            and quality have propelled us to various galas and competitions, totaling no less than
            10 awards since our creation. Since its inception, we have been involved in educating
            young people from disadvantaged backgrounds about HIV prevention and sexual and
            reproductive health.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
