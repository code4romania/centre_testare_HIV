import React from 'react';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';
import HeroFragment from './HeroFragment';
import { BlogPreviewContainer } from '../../components/BlogPreviewContainer';

const NotFound = () => {
  return (
    <Layout hero={<HeroFragment />}>
      <BlogPreviewContainer title={<Trans>Blog</Trans>} />
    </Layout>
  );
};
export default NotFound;
