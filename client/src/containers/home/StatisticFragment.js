import React from 'react';
import { Row, Col, Card } from 'antd';
import { Trans } from '@lingui/macro';

import { ReactComponent as PeopleRisk } from '../../images/people_risk_icon.svg';
import { ReactComponent as EvaluatedBuildings } from '../../images/evaluated_buildings_icon.svg';
import { ReactComponent as ConsolidatedBuildings } from '../../images/consolidated_buildings_icon.svg';
import { ReactComponent as StatsIconBackground } from '../../images/stats-icon-background.svg';

import config from '../../config';

const { STATISTICS_URL } = config;

const StatisticCard = ({ title, value, icon, type = '' }) => (
  <Card className={`stats-card ${type}`} size="small">
    {value > 0 ? (
      <>
        <h3 className="stats-heading">{value}</h3>
        <h4 className="stats-sub-heading">{title}</h4>
      </>
    ) : (
      <>
        <h3 className="stats-heading no-data">{title}</h3>
        <h4 className="stats-sub-heading">
          <Trans>Information being updated</Trans>
        </h4>
      </>
    )}
    <StatsIconBackground className={`stats-background ${type}`} />
    <div className="stats-icon">{icon}</div>
  </Card>
);

export default () => {
  const [state, setState] = React.useState({
    statistics: {
      mobile_caravans: '',
      public_centers: '',
      hotline: '',
    },
  });
  React.useEffect(() => {
    fetch(`${STATISTICS_URL}/`)
      .then((res) => res.json())
      .then((statistics) => {
        setState((prevState) => ({
          ...prevState,
          statistics,
        }));
      })
      .catch(() => {});
  }, []);

  return (
    <Row
      gutter={[
        { xs: 0, md: 20 },
        { xs: 20, sm: 20, md: 0 },
      ]}
      justify="space-around"
      type="flex"
      style={{ marginTop: '1rem' }}
    >
      <Col xs={24} md={8}>
        <StatisticCard
          title={<Trans>testing centers</Trans>}
          value={state.statistics.mobile_caravans}
          icon={<PeopleRisk />}
          type="people-under-risk"
        />
      </Col>
      <Col xs={24} md={8}>
        <StatisticCard
          title={<Trans>mobile caravans</Trans>}
          value={state.statistics.public_centers}
          icon={<EvaluatedBuildings />}
          type="evaluated-buildings"
        />
      </Col>
      <Col xs={24} md={8}>
        <StatisticCard
          title={<Trans>hotline</Trans>}
          value={state.statistics.hotline}
          icon={<ConsolidatedBuildings />}
          type="consolidated-buildings"
        />
      </Col>
    </Row>
  );
};
