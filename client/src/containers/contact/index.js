import React from 'react';
import { Col, Row } from 'antd';
import Layout from '../../components/Layout';
import FormFragment from './FormFragment';
import { MapFragment } from './MapFragment';

import HeroFragment from './HeroFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <Row type="flex" gutter={[20, 60]} style={{ paddingTop: 20 }}>
      <Col xs={{ span: 24, order: 2 }} md={12}>
        <FormFragment />
      </Col>
      <Col xs={24} md={{ span: 12, order: 2 }}>
        <MapFragment />
      </Col>
    </Row>
  </Layout>
);
