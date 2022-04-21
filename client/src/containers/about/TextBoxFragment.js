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
            The project is implemented by the Semper Musica Association in partnership with the
            Federation of Medical Student Associations from Romania and with Sex and society and
            benefits from a 𝟮𝟲𝟯.𝟲𝟰𝟬, 𝟱𝟬 € grant from Active Citizens Fund Romania, programme funded
            by Iceland, Liechtenstein and Norway through the EEA Grants 2014-2021. The content of
            this website does not necessarily reflect the official position of the EEA and Norway
            Grants 2014-2021; for more information visit{' '}
            <Link to={{ pathname: 'https://eeagrants.org/' }} target="_blank">
              www.eeagrants.org
            </Link>
            . More details about Active Citizens Fund Romania are available at{' '}
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
