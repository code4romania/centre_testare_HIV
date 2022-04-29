import config from '../config';
import { mapKeysToCamelCase } from '../utils';

const { POST_URL } = config;

export const getPostBySlug = async (slug, language = 'ro') => {
  const res = await fetch(`${POST_URL(language)}${slug}/`);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return mapKeysToCamelCase(data);
};

const blogPreviewPostsQueryParams = {
  limit: 4,
  ordering: '-published',
};

export const getBlogPosts = async (params, language = 'ro') => {
  const queryParams = new URLSearchParams(params ?? blogPreviewPostsQueryParams);
  const res = await fetch(`${POST_URL(language)}?${queryParams}`);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return mapKeysToCamelCase(data);
};
