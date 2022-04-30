import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Trans } from '@lingui/macro';
import ReactHtmlParser from 'react-html-parser';
import { useHtmlParserOptions } from '../../../hooks';
import { useGlobalContext } from '../../../context';
import { useBlogPostQuery } from '../../../queries/posts-queries';

const BlogPostDetailsFragment = ({ handlePostLoaded }) => {
  const { currentLanguage } = useGlobalContext();
  const { slug } = useParams();

  const htmlParserOptions = useHtmlParserOptions();

  const {
    data: postDetails,
    isError,
    refetch,
  } = useBlogPostQuery(slug, currentLanguage, {
    onSuccess: (post) => {
      handlePostLoaded(post);
    },
  });

  useEffect(() => {
    refetch();
  }, [currentLanguage, refetch]);

  if (postDetails === null) {
    return isError ? (
      <p>
        <Trans>Article not found</Trans>
      </p>
    ) : (
      <p />
    );
  }

  return (
    <Row
      type="flex"
      justify="center"
      align="top"
      style={{ marginTop: '2rem', marginBottom: '2rem' }}
    >
      <Col span={24} className="blog-post-content">
        {ReactHtmlParser(postDetails?.text, htmlParserOptions)}
      </Col>
    </Row>
  );
};

export default BlogPostDetailsFragment;
