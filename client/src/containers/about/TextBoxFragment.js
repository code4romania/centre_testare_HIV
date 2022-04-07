import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import acfLogo from '../../images/active-citizens-fund-logo.png';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" className="aboutTextBox" gutter={[20, 0]}>
      <Col sm={24} md={20} className="aboutTextBoxCol">
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
            .
          </Trans>
        </Paragraph>
      </Col>
      <Col sm={24} md={4} style={{ textAlign: 'center' }}>
        <img className="aboutLogo" src={acfLogo} alt="Tech For Social Good" />
      </Col>
    </Row>
  );
};
