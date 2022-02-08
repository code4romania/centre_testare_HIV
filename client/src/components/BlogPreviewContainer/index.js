import React from 'react';
import { useBlogPreviewPostsQuery } from '../../queries/posts-service';
import { BlogPreview } from '../BlogPreview';

export const BlogPreviewContainer = () => {
  const { blogPreviewPosts, isLoading, isError } = useBlogPreviewPostsQuery();

  return (
    <BlogPreview
      title="Blog"
      posts={blogPreviewPosts}
      isLoadingPosts={isLoading}
      isErrorLoadingPosts={isError}
    />
  );
};

export default { BlogPreviewContainer };
