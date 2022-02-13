import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AutoComplete, Col, Icon, Input, Radio, Row, Spin, Tooltip, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { debounce } from 'lodash';
import { arrayOf, bool, element, func, oneOf, oneOfType, shape, string } from 'prop-types';
import { ReactComponent as InfoIcon } from '../../images/info-circle-solid.svg';

import { useGlobalContext } from '../../context';

const { Title } = Typography;

const Suffix = ({ input, loading }) => {
  if (loading) {
    return <Spin />;
  }
  if (!input) {
    return <Icon type="search" />;
  }
  return <span />;
};

export const SearchFragment = ({
  data,
  defaultSearchOption,
  isLoading,
  onChangeSearchOption,
  onSearch,
  onSelectResult,
  searchOptions,
}) => {
  const { currentLanguage } = useGlobalContext();

  const [searchInput, setSearchInput] = useState('');
  const [searchPlaceholderText, setSearchPlaceholderText] = useState('');

  useEffect(() => {
    switch (currentLanguage) {
      case 'ro':
        setSearchPlaceholderText('Unde ești acum?');
        break;

      case 'hu':
      default:
        setSearchPlaceholderText('Where are you now?');
    }
  }, [currentLanguage]);

  const onSearchHandler = useCallback(
    (value) => {
      if (value.length > 2) {
        onSearch(value);
      }
    },
    [onSearch],
  );

  const debouncedSearchHandler = useMemo(() => debounce(onSearchHandler, 500), [onSearchHandler]);

  const onSearchInputChange = (newSearchInput) => {
    setSearchInput(newSearchInput);
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="top"
      style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}
    >
      <Col sm={26} md={16}>
        <Title level={3}>
          <Trans>
            Find the nearest{' '}
            <Tooltip
              // @TODO replace lorem text with actual text + translations
              title="
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam nemo, cum ratione
                  explicabo architecto ex dolore incidunt nisi quisquam dolores? Facere ipsa quam
                  modi laborum possimus, accusantium dolor a adipisci.
                "
              placement="top"
              trigger={['hover', 'click']}
            >
              <div className="badge">
                <span>testing center</span>
                <InfoIcon />
              </div>
            </Tooltip>{' '}
          </Trans>
        </Title>

        <Radio.Group onChange={onChangeSearchOption} value={defaultSearchOption}>
          {Object.values(searchOptions).map(({ value, text }) => (
            <Radio key={value} value={value}>
              {text}
            </Radio>
          ))}
        </Radio.Group>

        <AutoComplete
          className="search-box"
          allowClear={!isLoading}
          value={searchInput}
          dataSource={data}
          onChange={onSearchInputChange}
          onSearch={debouncedSearchHandler}
          placeholder={searchPlaceholderText}
          onSelect={onSelectResult}
        >
          <Input minLength={3} suffix={<Suffix input={searchInput} loading={isLoading} />} />
        </AutoComplete>
      </Col>
    </Row>
  );
};

SearchFragment.defaultProps = {
  isLoading: false,
};

SearchFragment.propTypes = {
  data: arrayOf(shape()).isRequired,
  defaultSearchOption: oneOf(['byLocation', 'byAddress']).isRequired,
  isLoading: bool,
  onChangeSearchOption: func.isRequired,
  onSearch: func.isRequired,
  onSelectResult: func.isRequired,
  searchOptions: shape({
    byLocation: shape({ value: string, text: oneOfType([string, element]) }),
    byAddress: shape({ value: string, text: oneOfType([string, element]) }),
  }).isRequired,
};

export default { SearchFragment };
