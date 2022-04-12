import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';

import { Hero } from '../../components/Hero';

import heroImage from '../../images/home_hero.png';
import logo from '../../logo.svg';

const { Paragraph, Text, Title } = Typography;

export default () => {
  return (
    <Hero heroImage={heroImage} logo={<img width="160px" src={logo} />}>
      <Title level={3} style={{ marginTop: 0 }}>
        <Trans>Lucrăm împreună pentru o Europă incluzivă</Trans>
      </Title>
      <Paragraph>
        <Trans>
          <Text strong>TestHIV</Text> este prima aplicație din România de testare HIV, unde sunt
          centralizate instituții din 11 județe din România care oferă testare HIV. În cadrul
          aplicației oferim detalii precum localizarea instituției, programul de lucru, costul unui
          test cât și detalii necesare pentru testarea infecției cu HIV, modalitățile de testare a
          persoanelor sub 16 ani și asigurarea consilierii pentru persoanele care au nevoie de mai
          multe informații.
        </Trans>
      </Paragraph>
    </Hero>
  );
};
