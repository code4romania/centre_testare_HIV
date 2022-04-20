import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Hero } from '../../components/Hero';

const { Paragraph } = Typography;

export default () => {
  return (
    <Hero title={<Trans>Privacy policy</Trans>}>
      <Paragraph>
        <Trans>
          This website uses cookies to provide visitors with a much better browsing experience and
          services tailored to the needs and interests of everyone.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          "Cookies" are intended to facilitate the access and delivery of services used by the
          Internet user, such as personalization of certain settings (language, country, prices
          displayed in the national currency. "Cookies", based on the information they collect about
          users, it helps site owners to make their product more efficient so that it is more easily
          accessible to users, they also increase the efficiency of online advertising and last but
          not least they can enable multimedia or other applications from other sites to be included
          in a particular site to make browsing more useful.
        </Trans>
      </Paragraph>
    </Hero>
  );
};
