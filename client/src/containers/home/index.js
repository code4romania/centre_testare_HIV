import React from 'react';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';

import MapFragment from './MapFragment';
import ParagraphFragment from './ParagraphFragment';
import SearchFragment from './SearchFragment';
import HeroFragment from './HeroFragment';
import BlogPreview from '../../components/BlogPreview';
import StatisticFragment from './StatisticFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <SearchFragment />
    <MapFragment />
    <StatisticFragment />
    <ParagraphFragment />
    <BlogPreview title={<Trans>Blog</Trans>} />
  </Layout>
);
