import React from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Trans } from '@lingui/macro';
import ReactHtmlParser from 'react-html-parser';

import config from '../../../config';

const { POST_URL } = config;

const BlogPostDetailsFragment = ({ handlePostLoaded }) => {
  const { slug } = useParams();
  const [state, setState] = React.useState({
    postDetails: null,
    requestError: false,
  });
  React.useEffect(() => {
    fetch(`${POST_URL}${slug}/`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((postDetails) => {
        setState((prevState) => ({
          ...prevState,
          postDetails,
          requestError: postDetails === null,
        }));
        handlePostLoaded(postDetails);
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          postDetails: null,
          requestError: true,
        }));
      });
  }, [handlePostLoaded, slug]);

  if (state.postDetails === null) {
    return state.requestError ? (
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
      <Col className="blog-post-content">{ReactHtmlParser(state.postDetails.text)}</Col>
    </Row>
  );
};

export default BlogPostDetailsFragment;
