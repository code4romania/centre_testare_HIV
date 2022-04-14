import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AutoComplete, Col, Icon, Input, Row, Spin } from 'antd';
import { debounce } from 'lodash';
import { useSearchCentersQuery, useTestingCenterByIdQuery } from '../../queries';
import { useGlobalContext } from '../../context';
import { useCenterDetailsDialog } from '../../store';

const Suffix = ({ input, loading }) => {
  if (loading) {
    return <Spin />;
  }
  if (!input) {
    return <Icon type="search" />;
  }
  return <span />;
};

export const SearchFragment = () => {
  const { currentLanguage } = useGlobalContext();
  const { openDialog } = useCenterDetailsDialog();

  const [searchInput, setSearchInput] = useState('');
  const [searchPlaceholderText, setSearchPlaceholderText] = useState('');
  const [selectedCenterPk, setSelectedCenterPk] = useState();

  const { searchResults, isLoading, searchTestingCenters } = useSearchCentersQuery();

  useTestingCenterByIdQuery(
    { pk: selectedCenterPk, language: currentLanguage },
    {
      enabled: Boolean(selectedCenterPk),
      onSuccess: (center) => {
        openDialog(center);
      },
    },
  );

  useEffect(() => {
    switch (currentLanguage) {
      case 'ro':
        setSearchPlaceholderText('Caută un centru de testare');
        break;

      default:
        setSearchPlaceholderText('Search for a testing center');
    }
  }, [currentLanguage]);

  const onSearchHandler = useCallback(
    (value) => {
      if (value.length > 2) {
        searchTestingCenters({ query: value });
      }
    },
    [searchTestingCenters],
  );

  const debouncedSearchHandler = useMemo(() => debounce(onSearchHandler, 500), [onSearchHandler]);

  const data = useMemo(
    () =>
      searchResults?.map((item) => {
        return {
          value: item.pk,
          text: item.fullAddress,
        };
      }),
    [searchResults],
  );

  return (
    <Row
      type="flex"
      justify="center"
      align="top"
      style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}
    >
      <Col sm={26} md={16}>
        <AutoComplete
          className="search-box"
          allowClear={!isLoading}
          value={searchInput}
          dataSource={data}
          onChange={setSearchInput}
          onSearch={debouncedSearchHandler}
          placeholder={searchPlaceholderText}
          onSelect={setSelectedCenterPk}
        >
          <Input minLength={3} suffix={<Suffix input={searchInput} loading={isLoading} />} />
        </AutoComplete>
      </Col>
    </Row>
  );
};

export default { SearchFragment };
