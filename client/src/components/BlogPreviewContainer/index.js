import React, { useEffect, useMemo } from 'react';
import { useBlogPostsQuery } from '../../queries/posts-queries';
import { BlogPreview } from '../BlogPreview';
import { useGlobalContext } from '../../context';

const SLICE_START = 0;
const SLICE_END = 3;

export const BlogPreviewContainer = () => {
  const { currentLanguage } = useGlobalContext();
  const { data, isLoading, isError, refetch } = useBlogPostsQuery(null, currentLanguage);

  const blogPreviewPosts = useMemo(() => data?.results.slice(SLICE_START, SLICE_END) ?? [], [data]);

  useEffect(() => {
    refetch();
  }, [currentLanguage, refetch]);

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
