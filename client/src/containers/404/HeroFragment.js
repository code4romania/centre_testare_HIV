import React from 'react';
import { Button, Typography } from 'antd';
import { Trans } from '@lingui/macro';

import { Hero } from '../../components/Hero';

import heroImage from '../../images/home_hero.png';

const { Paragraph } = Typography;

export default () => {
  return (
    <Hero heroImage={heroImage} title={<Trans id="404.title" />}>
      <Paragraph>
        <Trans id="404.sorry_message" />
      </Paragraph>
      <Paragraph>
        <Trans id="404.contact_message" />
        <a href="mailto:office@sempermusica.org">office@sempermusica.org</a>.
      </Paragraph>
      <Button type="primary" className="hero-btn-primary" href="/">
        <Trans>Back to home page</Trans>
      </Button>
      <Button type="default" href="/despre">
        <Trans>About project</Trans>
      </Button>
    </Hero>
  );
};
