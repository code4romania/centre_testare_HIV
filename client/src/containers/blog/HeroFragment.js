import React from 'react';
// import { Typography } from 'antd';
import { Trans } from '@lingui/macro';

import { Hero } from '../../components/Hero';

import heroImage from '../../images/blog_hero.png';

export default () => {
  return <Hero heroImage={heroImage} title={<Trans>Centre HIV Blog</Trans>} />;
};
