import React from 'react';
import Layout from '../../components/Layout';
import HeroFragment from './HeroFragment';
import PolicyFragment from './PolicyFragment';

const Policy = () => {
  return (
    <Layout hero={<HeroFragment />}>
      <PolicyFragment />
    </Layout>
  );
};

export default Policy;
