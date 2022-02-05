import React from 'react';
import { Col, Icon, Row } from 'antd';
import { Trans } from '@lingui/macro';

import { useGlobalContext } from '../../context';

export default function SearchResults(props) {
  const { onItemSelected } = props;
  const { searchResults, onCloseSearchResults } = useGlobalContext();

  const onItemClick = (poi) => {
    onItemSelected(poi);
    onCloseSearchResults();
  };

  return (
    <Col className="search-results-container">
      <Row className="search-results__title">
        <Col span={23} className="search-results__titleText">
          <Trans>Search Results</Trans>
        </Col>
        <Col span={1}>
          <Icon type="close" onClick={onCloseSearchResults} />
        </Col>
      </Row>
      <ul className="search-results">
        {searchResults.map((building) => (
          <li key={building.pk} onClick={() => onItemClick(building)}>
            <p>
              {building.address}, {building.street_number}
            </p>
          </li>
        ))}
      </ul>
    </Col>
  );
}
