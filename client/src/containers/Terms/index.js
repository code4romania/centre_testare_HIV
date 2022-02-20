import React from 'react';
import Layout from '../../components/Layout';
import HeroFragment from './HeroFragment';
import { TermsFragment } from './TermsFragment';

const Terms = () => {
  return (
    <Layout hero={<HeroFragment />}>
      <TermsFragment />
    </Layout>
  );
};
export default Terms;
