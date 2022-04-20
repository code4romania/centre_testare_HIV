import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';

import { Hero } from '../../components/Hero';

import heroImage from '../../images/home_hero.png';

const { Paragraph, Text } = Typography;

export default () => {
  return (
    <Hero heroImage={heroImage} title={<Trans>Support the project</Trans>}>
      <Paragraph strong>
        <Trans>Donate by bank transfer</Trans>
      </Paragraph>
      <Paragraph>
        <Trans>RON Account:</Trans> <Text strong>RO44BACX0000000947270000</Text>
      </Paragraph>
    </Hero>
  );
};
