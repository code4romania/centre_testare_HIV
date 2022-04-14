import React from 'react';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';

import HeroFragment from './HeroFragment';
import { BlogPreviewContainer } from '../../components/BlogPreviewContainer';
import { CenterDetailsDialog } from '../../components/CenterDetailsDialog';
import { CentersFragment } from './CentersFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <CentersFragment />

    <BlogPreviewContainer title={<Trans>Blog</Trans>} />

    <CenterDetailsDialog />
  </Layout>
);
