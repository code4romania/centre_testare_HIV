import React from 'react';
import Layout from '../../components/Layout';

import HeroFragment from './HeroFragment';
import { SupportFragment } from './SupportFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <SupportFragment />
  </Layout>
);
