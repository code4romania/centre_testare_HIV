import React from 'react';
import { Typography } from 'antd';
import { Hero } from '../../components/Hero';
import Sharing from '../../components/Sharing';

const { Text } = Typography;

export default ({ postDetails }) => {
  const { image, title } = postDetails;
  const previewText = postDetails.preview_text;

  return (
    <Hero heroImage={image ?? ''} title={title ?? ''} titleLevel={2}>
      <Sharing />
      <br />
      <Text>{previewText}</Text>
    </Hero>
  );
};
