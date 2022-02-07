import React, { useState } from 'react';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';
import HeroFramgment from './HeroFragment';
import BlogPostDetailsFragment from './BlogPostDetailsFragment/BlogPostDetailsFragment';
import { BlogPreviewContainer } from '../../components/BlogPreviewContainer';

export default () => {
  const [postDetails, setPostDetails] = useState({});

  return (
    <Layout hero={<HeroFramgment postDetails={postDetails} />}>
      <BlogPostDetailsFragment handlePostLoaded={setPostDetails} />
      <BlogPreviewContainer title={<Trans>Other articles</Trans>} postSlug={postDetails.slug} />
    </Layout>
  );
};
