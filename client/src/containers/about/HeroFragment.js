import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';

import { Hero } from '../../components/Hero';
import Share from '../../components/Sharing';

import heroImage from '../../images/about_hero.png';

const { Paragraph, Text } = Typography;

export default () => {
  return (
    <Hero
      heroImage={heroImage}
      title={<Trans>Services for youth from Norway in Romania – PILOT</Trans>}
    >
      <Paragraph>
        <Trans>
          The aim of the project{' '}
          <Text strong>Services for youth from Norway in Romania – PILOT</Text> is to increase the
          access of young people aged 15-35 from disadvantaged areas to education for sexual health
          and reproduction according to the Norwegian model, adopting the Active Citizens Fund
          Romania slogan <Text strong>Working together for an inclusive Europe</Text>.
        </Trans>
      </Paragraph>
      <Share />
    </Hero>
  );
};
