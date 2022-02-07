import { arrayOf, bool, shape, string } from 'prop-types';

export const BlogPreviewType = {
  title: string.isRequired,
  isLoadingPosts: bool.isRequired,
  isErrorLoadingPosts: bool.isRequired,
  posts: arrayOf(
    shape({
      slug: string.isRequired,
      title: string.isRequired,
      image: string.isRequired,
    }).isRequired,
  ),
};

export default { BlogPreviewType };
