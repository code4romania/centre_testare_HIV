import React from 'react';
import { Col, Row } from 'antd';
import Layout from '../../components/Layout';
import FormFragment from './FormFragment';
// import { MapFragment } from './MapFragment';

import HeroFragment from './HeroFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <Row type="flex" justify="center" gutter={[20, 60]} style={{ paddingTop: 20 }}>
      <Col xs={24} md={12}>
        <FormFragment />
      </Col>
    </Row>
  </Layout>
);
