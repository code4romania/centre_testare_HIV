import { useEffect, useMemo } from 'react';
import { useGet } from './requests';
import config from '../config';

const { POST_URL } = config;

export const usePostsQuery = () => {
  const { data, fetchData: getPosts, ...rest } = useGet(POST_URL, { enabled: false });

  return { data, getPosts, ...rest };
};

const blogPreviewPostsQueryParams = {
  limit: 4,
  ordering: '-published',
};
const SLICE_START = 0;
const SLICE_END = 3;

export const useBlogPreviewPostsQuery = (postSlug) => {
  const { data, getPosts, isError, ...rest } = usePostsQuery();

  const { results: posts } = data ?? {};

  useEffect(() => {
    if (data || isError) return;

    getPosts(blogPreviewPostsQueryParams);
  }, [data, getPosts, isError]);

  const blogPreviewPosts = useMemo(
    () => posts?.filter(({ slug }) => slug !== postSlug).slice(SLICE_START, SLICE_END),
    [posts, postSlug],
  );

  return { blogPreviewPosts, isError, ...rest };
};
