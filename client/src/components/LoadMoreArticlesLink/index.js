import React from 'react';
import { Button } from 'antd';

const LoadMoreArticlesLink = (props) => (
  <div className="load-more">
    <Button onClick={(e) => e.preventDefault()} type="primary" ghost {...props}>
      {props.children}
    </Button>
  </div>
);

export default LoadMoreArticlesLink;
