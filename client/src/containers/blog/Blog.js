import React, { useCallback, useState } from 'react';
import { Spin, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import BlogItem from '../../components/BlogItem';
import LoadMore from '../../components/LoadMoreArticlesLink';
import { useBlogPostsQuery, useBlogPostsEnQuery } from '../../queries/posts-queries';
import { useGlobalContext } from '../../context';

const { Title } = Typography;

const LIMIT = 3;

const Blog = () => {
  const { currentLanguage } = useGlobalContext();
  const [state, setState] = useState({
    index: 0,
    showMore: true,
    roPosts: [],
    enPosts: [],
  });

  const {
    isLoading,
    isError,
    refetch: refetchRo,
  } = useBlogPostsQuery({ limit: LIMIT, offset: state.index, ordering: '-published' }, 'ro', {
    onSuccess: ({ results, next }) => {
      setState((prevState) => ({
        ...prevState,
        index: prevState.index + results.length,
        showMore: next !== null,
        roPosts: [...prevState.roPosts, ...results],
      }));
    },
  });

  const { refetch: refetchEn } = useBlogPostsEnQuery(
    { limit: LIMIT, offset: state.index, ordering: '-published' },
    'en',
    {
      onSuccess: ({ results }) => {
        setState((prevState) => ({
          ...prevState,
          enPosts: [...prevState.enPosts, ...results],
        }));
      },
    },
  );

  const posts = currentLanguage === 'ro' ? state.roPosts : state.enPosts;

  const onLoadMoreHandler = useCallback(() => {
    refetchRo();
    refetchEn();
  }, [refetchEn, refetchRo]);

  if (isLoading) {
    return (
      <div className="blog-wrapper">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="blog-wrapper">
        <Title level={3}>
          <Trans>Server unavailable</Trans>
        </Title>
      </div>
    );
  }

  return (
    <div className="blog-wrapper loaded">
      {posts?.map((post) => {
        const { slug } = post;
        return <BlogItem key={slug} postDetails={post} />;
      })}
      {state.showMore && (
        <LoadMore onClick={onLoadMoreHandler}>
          <Trans>Load more articles</Trans>
        </LoadMore>
      )}
    </div>
  );
};

export default Blog;
