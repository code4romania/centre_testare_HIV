import React from 'react';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';

import ParagraphFragment from './ParagraphFragment';
import { SearchMapFragment } from './SearchMapFragment';
import HeroFragment from './HeroFragment';
import { BlogPreviewContainer } from '../../components/BlogPreviewContainer';
import StatisticFragment from './StatisticFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <SearchMapFragment />
    <StatisticFragment />
    <ParagraphFragment />
    <BlogPreviewContainer title={<Trans>Blog</Trans>} />
  </Layout>
);
