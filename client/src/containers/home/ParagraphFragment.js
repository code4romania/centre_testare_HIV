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
          <Trans>About the project</Trans>
        </Title>
      </Row>
      <Row gutter={[0, 32]} type="flex" justify="space-between">
        <Col>
          <Paragraph>
            <Trans>
              Proiectul este derulat de Asociația Semper Musica în parteneriat cu Federația
              Asociațiilor Studenților în Medicină din România și cu Sex and society și beneficiază
              de o finanțare în valoare de 𝟮𝟲𝟯.𝟲𝟰𝟬,𝟱𝟬 €, prin programul Active Citizens Fund
              România, finanțat de Islanda, Liechtenstein și Norvegia prin Granturile SEE 2014-2021.
              Conținutul acestui website nu reprezintă în mod necesar poziția oficială a Granturilor
              SEE și Norvegiene 2014-2021; pentru mai multe informații accesați{' '}
              <Link to={{ pathname: 'https://eeagrants.org' }} target="_blank">
                www.eeagrants.org
              </Link>
              . Informații despre Active Citizens Fund România sunt disponibile la{' '}
              <Link to={{ pathname: 'htpps://activecitizensfund.ro' }} target="_blank">
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
