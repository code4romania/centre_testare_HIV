import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Row, Col, Typography, AutoComplete, Input, Icon, Spin, Tooltip } from 'antd';
import { Trans } from '@lingui/macro';
import { debounce } from 'lodash';
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

export default ({ onSearch }) => {
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

  // const dataSource = searchResults
  //   ? searchResults.map((item) => {
  //       return {
  //         value: item.pk,
  //         text: item.street_number
  //           ? `${item.address}, ${item.street_number} (${item.locality}, ${item.county_code})`
  //           : `${item.address} (${item.locality}, ${item.county_code})`,
  //       };
  //     })
  //   : [];

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

        <AutoComplete
          className="search-box"
          allowClear
          value={searchInput}
          // dataSource={dataSource}
          onChange={onSearchInputChange}
          onSearch={debouncedSearchHandler}
          placeholder={searchPlaceholderText}
        >
          <Input minLength={3} suffix={<Suffix input={searchInput} />} />
        </AutoComplete>
      </Col>
    </Row>
  );
};
