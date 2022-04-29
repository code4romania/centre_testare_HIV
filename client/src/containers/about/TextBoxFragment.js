import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row className="aboutTextBox" gutter={[20, 0]}>
      <Col sm={24} md={20}>
        <Paragraph>
          <Trans>
            The project is implemented by Semper Musica Association in partnership with the
            Federation of Medical Students' Associations in Romania and Sex and Society and benefits
            from a funding of 249.896 €, through the Active Citizens Fund Romania programme, funded
            by Iceland, Liechtenstein and Norway through EEA Grants 2014-2021. The content of this
            website does not necessarily represent the official position of the EEA and Norway
            Grants 2014-2021. For more information visit{' '}
            <Link to={{ pathname: 'https://eeagrants.org/' }} target="_blank">
              www.eeagrants.org
            </Link>
            . Information about Active Citizens Fund Romania is available at{' '}
            <Link to={{ pathname: 'htpps://activecitizensfund.ro' }} target="_blank">
              www.activecitizensfund.ro
            </Link>
            .
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
