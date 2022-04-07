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
      title={<Trans>Servicii din Norvegia pentru tinerii din România - PILOT</Trans>}
    >
      <Paragraph>
        <Trans>
          Scopul proiectului{' '}
          <Text strong>Servicii din Norvegia pentru tinerii din România - PILOT</Text> este acela de
          a spori accesul tinerilor din categoria de vârstă 15-35 ani din zonele defavorizate la
          educație pentru sănătatea sexuală și a reproducerii după model norvegian, adoptând
          sloganul Active Citizens Fund România{' '}
          <Text strong>Lucrăm împreună pentru o Europă incluzivă</Text>.
        </Trans>
      </Paragraph>
      <Share />
    </Hero>
  );
};
