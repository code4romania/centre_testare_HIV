import { useQuery } from 'react-query';
import { getBlogPosts, getPostBySlug } from './posts-service';

const defaultOptions = {
  refetchOnWindowFocus: false,
  refetchInterval: 5 * 60 * 1000,
  refetchIntervalInBackground: false,
};

export const useBlogPostQuery = (slug, language = 'ro', options = defaultOptions) => {
  const queryKey = ['post', slug];
  return useQuery(queryKey, () => getPostBySlug(slug, language), {
    ...defaultOptions,
    ...options,
  });
};

export const useBlogPostsQuery = (params, language = 'ro', options = defaultOptions) => {
  return useQuery('preview-posts', () => getBlogPosts(params, language), {
    ...defaultOptions,
    ...options,
  });
};

export const useBlogPostsEnQuery = (params, language = 'en', options = defaultOptions) => {
  return useQuery('preview-posts-en', () => getBlogPosts(params, language), {
    ...defaultOptions,
    ...options,
  });
};

export default { useBlogPostsQuery, useBlogPostQuery };
