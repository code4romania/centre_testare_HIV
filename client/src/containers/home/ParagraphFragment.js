import React from 'react';
import { Row, Col, Icon, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

export default () => {
  return (
    <div className="about-preview">
      <Row>
        <Title level={2}>
          <Icon type="environment" />
          <Trans>About project</Trans>
        </Title>
        <Title level={3} style={{ marginTop: 0 }}>
          <Trans>Working together for an inclusive Europe</Trans>
        </Title>
      </Row>
      <Row gutter={[0, 32]} type="flex" justify="space-between">
        <Col>
          <Paragraph>
            <Trans>
              The project is implemented by Semper Musica Association in partnership with the
              Federation of Medical Students' Associations in Romania and Sex and Society and
              benefits from a funding of 249.896 €, through the Active Citizens Fund Romania
              programme, funded by Iceland, Liechtenstein and Norway through EEA Grants 2014-2021.
              The content of this website does not necessarily represent the official position of
              the EEA and Norway Grants 2014-2021. For more information visit{' '}
              <Link to={{ pathname: 'https://eeagrants.org' }} target="_blank">
                www.eeagrants.org
              </Link>
              . Information about Active Citizens Fund Romania is available at{' '}
              <Link to={{ pathname: 'https://activecitizensfund.ro' }} target="_blank">
                www.activecitizensfund.ro
              </Link>
              .
            </Trans>
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};
