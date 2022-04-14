import React from 'react';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';
import HeroFragment from './HeroFragment';
import { BlogPreviewContainer } from '../../components/BlogPreviewContainer';
import { CenterDetailsDialog } from '../../components/CenterDetailsDialog';
import { CentersFragment } from './CentersFragment';
import { SearchFragment } from './SearchFragment';

export default () => {
  return (
    <Layout hero={<HeroFragment />}>
      <SearchFragment />
      <CentersFragment />

      <BlogPreviewContainer title={<Trans>Blog</Trans>} />

      <CenterDetailsDialog />
    </Layout>
  );
};
