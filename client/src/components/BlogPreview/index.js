import React from 'react';
import { Col, Empty, Icon, Row, Spin, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import BlogCard from '../BlogCard';
import { BlogPreviewType } from '../../types/posts';

const { Title } = Typography;

export const BlogPreview = ({ title, isLoadingPosts, isErrorLoadingPosts, posts }) => {
  const noPostsFound = isErrorLoadingPosts || !posts || posts?.length === 0;

  return (
    <div className="blog-preview">
      <Row type="flex" justify="space-around">
        <Col span={24}>
          <Title level={2}>
            <Icon type="environment" />
            {title}
          </Title>
        </Col>
      </Row>
      <Row gutter={[20, 20]} type="flex" justify="center">
        {isLoadingPosts ? (
          <Spin size="large" />
        ) : (
          <>
            {noPostsFound ? (
              <Empty
                description={<Trans>No posts found</Trans>}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              posts.map((post, i) => (
                <Col key={post.slug} xs={24} md={12} lg={8}>
                  <BlogCard
                    cardIndex={i}
                    title={post.title}
                    imageUrl={post.image}
                    slug={post.slug}
                  />
                </Col>
              ))
            )}
          </>
        )}
      </Row>
    </div>
  );
};

BlogPreview.defaultProps = {
  posts: null,
};

BlogPreview.propTypes = BlogPreviewType;

export default { BlogPreview };
