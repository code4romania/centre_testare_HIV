import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { Hero } from '../../components/Hero';

const { Paragraph, Text } = Typography;

export default () => {
  return (
    <Hero title={<Trans>Terms and conditions of use</Trans>}>
      <Paragraph>
        <Trans>
          The General Terms and Conditions of Use establish the general terms and conditions of use
          of the site <Link to="/">centrehiv.edreptultau.ro</Link> by potential visitors or
          beneficiaries.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          <Link to="/">centrehiv.edreptultau.ro</Link> (hereinafter referred to as “Site”,
          “Platform”, “centrehiv.edreptultau.ro”) aims to increase the access of young people in the
          age group 15-35 years from disadvantaged areas to education for sexual health and
          reproduction according to the Norwegian model, adopting the slogan Active Citizens Fund
          Romania <Text strong>Working together for an inclusive Europe</Text>.
        </Trans>
      </Paragraph>
    </Hero>
  );
};
