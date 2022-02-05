import React, { useState } from 'react';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';
import HeroFramgment from './HeroFragment';
import BlogPostDetailsFragment from './BlogPostDetailsFragment/BlogPostDetailsFragment';
import BlogPreview from '../../components/BlogPreview';

export default () => {
  const [postDetails, setPostDetails] = useState({});

  return (
    <Layout hero={<HeroFramgment postDetails={postDetails} />}>
      <BlogPostDetailsFragment handlePostLoaded={setPostDetails} />
      <BlogPreview title={<Trans>Other articles</Trans>} postSlug={postDetails.slug} />
    </Layout>
  );
};
