import React from 'react';
import { Trans } from '@lingui/macro';

import { Hero } from '../../components/Hero';

import heroImage from '../../images/home_hero.png';

export default () => {
  return <Hero heroImage={heroImage} title={<Trans>Centers list</Trans>} />;
};
