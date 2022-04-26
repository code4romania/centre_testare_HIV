import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';

import { Hero } from '../../components/Hero';

import heroImage from '../../images/home_hero.png';

const { Paragraph, Text } = Typography;

export default () => {
  return (
    <Hero heroImage={heroImage} title={<Trans>Contact us</Trans>}>
      <Paragraph>
        <Trans>
          We don't like being alone. We believe in success with other NGOs with common values and
          good people. We want to know opinions and give rise to discussions and impressions that
          will make a difference, but also to offer in our turn. Every problem has a solution, and
          the solution lies in the community. For any question, suggestion, recommendation, or even
          reproach, do not hesitate to contact us. Networking is just a click away!
        </Trans>
      </Paragraph>
      <Paragraph>
        Email:{' '}
        <Text strong>
          <a href="mailto:office@sempermusica.org">office@sempermusica.org</a>
        </Text>
      </Paragraph>
      <Paragraph>
        Tel:{' '}
        <Text strong>
          <a href="tel:0770437537">0770437537</a>
        </Text>
      </Paragraph>
    </Hero>
  );
};
