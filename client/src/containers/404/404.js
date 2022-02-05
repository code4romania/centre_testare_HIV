import React from 'react';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';
import HeroFragment from './HeroFragment';
import BlogPreview from '../../components/BlogPreview';

const NotFound = () => {
  return (
    <Layout hero={<HeroFragment />}>
      <BlogPreview title={<Trans>Blog</Trans>} />
    </Layout>
  );
};
export default NotFound;
