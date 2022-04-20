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
            The Semper Musica Association was born from the desire to make a change for the better.
            We act mainly in the field of education for the prevention of HIV infection among high
            school students and young people nationwide. We guide our activities according to our
            vision and mission.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Vision:{' '}
            <Text strong>
              A society without new HIV cases among young people, in which discrimination against
              HIV-positive people does not exist
            </Text>
            .
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Mission:{' '}
            <Text strong>
              We fight for the free access of young people to education and protection for HIV
              prevention and against discrimination of people living with HIV
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
            The projects we have carried out have brought a change for young people in Romania, and
            their involvement and quality have propelled us to various galas and competitions,
            totaling from the establishment until today no less than 10 awards. Since its inception,
            we have been educating young people from disadvantaged backgrounds on HIV prevention and
            sexual and reproductive health.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
