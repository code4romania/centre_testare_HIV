import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';

import { Hero } from '../../components/Hero';

import heroImage from '../../images/home_hero.png';
import logo from '../../logo.svg';

const { Paragraph, Text, Title } = Typography;

export default () => {
  return (
    <Hero
      heroImage={heroImage}
      logo={<img width="160px" src={logo} style={{ marginBottom: '24px' }} />}
    >
      <Title level={3} style={{ marginTop: 0 }}>
        <Trans>Working together for an inclusive Europe</Trans>
      </Title>
      <Paragraph>
        <Trans>
          <Text strong>Centre HIV</Text> is the first application in Romania for HIV testing, where
          institutions from 11 counties in Romania that offer HIV testing are centralized. In the
          application we provide details such as the location of the institution, the work schedule,
          the cost of a test and details needed to test for HIV infection, how to test people under
          16 and provide counseling for people who need more information.
        </Trans>
      </Paragraph>
    </Hero>
  );
};
