import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { Hero } from '../../components/Hero';

const { Paragraph, Text } = Typography;

export default () => {
  return (
    <Hero title={<Trans>Termeni și condiții de utilizare</Trans>}>
      <Paragraph>
        <Trans>
          Termenii și Condițiile generale de utilizare stabilesc termenii și condițiile generale de
          utilizare a site-ului <Link to="/">centrehiv.edreptultau.ro</Link> de către potențialii
          vizitatori sau beneficiari.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          <Link to="/">centrehiv.edreptultau.ro</Link> (în continuare denumit „Site”, „Platformă”,
          ”centrehiv.edreptultau.ro”) are ca scop a spori accesul tinerilor din categoria de vârstă
          15-35 ani din zonele defavorizate la educație pentru sănătatea sexuală și a reproducerii
          după model norvegian, adoptând sloganul Active Citizens Fund România{' '}
          <Text strong>Lucrăm împreună pentru o Europă incluzivă</Text>.
        </Trans>
      </Paragraph>
    </Hero>
  );
};
