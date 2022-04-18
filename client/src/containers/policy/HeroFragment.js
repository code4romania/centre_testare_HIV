import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Hero } from '../../components/Hero';

const { Paragraph } = Typography;

export default () => {
  return (
    <Hero title={<Trans>Politica de confidențialitate</Trans>}>
      <Paragraph>
        <Trans>
          Acest website folosește cookie-uri pentru a furniza vizitatorilor o experiență mult mai
          bună de navigare și servicii adaptate nevoilor și interesului fiecăruia.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          “Cookie“-urile au rolul de a facilita accesul și livrarea serviciilor folosite de
          utilizator de internet, cum ar fi personalizarea anumitor setări (limba, țara, prețuri
          afișate în moneda națională. “Cookie“-urile, pe baza informațiilor pe care le adună despre
          utilizatori, îi ajută pe deținătorii de site-uri să își eficientizeze produsul astfel
          încât acesta să fie cât mai ușor accesat de către utilizatori, de asemenea cresc gradul de
          eficiență a publicității online și nu în ultimul rând pot permite aplicațiilor multimedia
          sau de alt tip de pe alte site-uri să fie incluse într-un anumit site pentru a face
          navigarea mai utilă.
        </Trans>
      </Paragraph>
    </Hero>
  );
};
