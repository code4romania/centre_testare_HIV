import React from 'react';
import { Col, Row, Typography } from 'antd';
import { HeroType } from '../../types';

const { Title, Text } = Typography;

export const Hero = ({ heroImage, title, subTitle, children, titleLevel, logo }) => {
  return (
    <div className="hero-container">
      <Row
        className="container hero-body"
        type="flex"
        align="middle"
        justify="space-between"
        gutter={[0, { xs: 24, sm: 24, md: 0, lg: 0 }]}
      >
        <Col className="hero-img" xs={24} md={{ span: 12, order: 2 }}>
          <div style={{ backgroundImage: `url(${heroImage})` }} />
        </Col>
        <Col xs={24} md={11}>
          {logo && <>{logo}</>}
          {subTitle && <Text type="secondary">{subTitle}</Text>}
          {title && (
            <Title level={titleLevel} className="hero-title">
              {title}
            </Title>
          )}
          {children}
        </Col>
      </Row>
    </div>
  );
};

Hero.defaultProps = {
  heroImage: null,
  subTitle: null,
  titleLevel: 2,
};

Hero.propTypes = HeroType;

export default { Hero };
