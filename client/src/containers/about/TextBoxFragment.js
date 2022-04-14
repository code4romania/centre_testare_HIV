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
            Proiectul este derulat de Asociația Semper Musica în parteneriat cu Federația
            Asociațiilor Studenților în Medicină din România și cu Sex and society și beneficiază de
            o finanțare în valoare de 𝟮𝟲𝟯.𝟲𝟰𝟬,𝟱𝟬 €, prin programul Active Citizens Fund România,
            finanțat de Islanda, Liechtenstein și Norvegia prin Granturile SEE 2014-2021. Conținutul
            acestui website nu reprezintă în mod necesar poziția oficială a Granturilor SEE și
            Norvegiene 2014-2021. Pentru mai multe informații accesați{' '}
            <Link to={{ pathname: 'https://eeagrants.org/' }} target="_blank">
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
  );
};
