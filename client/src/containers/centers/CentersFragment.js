import { Col, Row, Spin } from 'antd';
import React, { useState } from 'react';
import { Trans } from '@lingui/macro';
import { flatten } from 'lodash';
import { CenterDetailsCard } from '../../components/CenterDetailsCard';
import { useDetailedTestingCentersInfiniteQuery, useTestingCenterByIdQuery } from '../../queries';
import { useCenterDetailsDialog } from '../../store';
import LoadMore from '../../components/LoadMoreArticlesLink';
import { useGlobalContext } from '../../context';

export const CentersFragment = () => {
  const { currentLanguage } = useGlobalContext();

  const [testingCenters, setTestingCenters] = useState([]);
  const [selectedCenterPk, setSelectedCenterPk] = useState();

  const { isLoading, isFetching, fetchNextPage, hasNextPage } =
    useDetailedTestingCentersInfiniteQuery({
      onSuccess: ({ pages }) => {
        setTestingCenters(flatten(pages.map(({ results }) => results)));
      },
    });
  const { openDialog } = useCenterDetailsDialog();

  const { isLoading: isLoadingDetails, isFetchingDetails } = useTestingCenterByIdQuery(
    { pk: selectedCenterPk, language: currentLanguage },
    {
      enabled: Boolean(selectedCenterPk),
      onSuccess: (center) => {
        openDialog(center);
      },
    },
  );

  return (
    <Row gutter={[12, 16]} style={{ paddingTop: '12px' }}>
      {testingCenters?.map((details) => (
        <Col key={details.pk} xs={{ span: 24 }} md={{ span: 12 }}>
          <CenterDetailsCard
            title={details.name}
            onActionClick={() => setSelectedCenterPk(details.pk)}
            loading={selectedCenterPk === details.pk && (isLoadingDetails || isFetchingDetails)}
          >
            <Trans>Adresa: </Trans>
            {details.streetName} {details.streetNumber}, {details.locality}, {details.county}
          </CenterDetailsCard>
        </Col>
      ))}
      {(isLoading || isFetching) && (
        <Col style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </Col>
      )}

      {hasNextPage && (
        <LoadMore onClick={fetchNextPage}>
          <Trans>Încarcă mai multe centre</Trans>
        </LoadMore>
      )}
    </Row>
  );
};

export default { CentersFragment };
