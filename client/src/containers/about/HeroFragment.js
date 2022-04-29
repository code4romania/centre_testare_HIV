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
      title={<Trans>Services from Norway for young people in Romania - PILOT</Trans>}
    >
      <Paragraph>
        <Trans>
          The aim of the project{' '}
          <Text strong>Services from Norway for Young People in Romania - PILOT</Text> is to
          increase access to sexual and reproductive health education for young people aged 15-35 in
          disadvantaged areas, following the Norwegian model, adopting the slogan Active Citizens
          Fund Romania <Text strong>Working together for an inclusive Europe</Text>.
        </Trans>
      </Paragraph>
      <Share />
    </Hero>
  );
};
