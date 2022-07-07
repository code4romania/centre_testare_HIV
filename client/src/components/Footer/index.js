import React from 'react';
import { Layout, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';

import smLogo from '../../images/semper-musica-logo.png';
import fasmrLogo from '../../images/fasmr-logo.png';
import sexOgLogo from '../../images/sex-og-samfunn-logo.png';
import cfrLogo from '../../images/footer_CfR.svg';

import { useGlobalContext } from '../../context';

const { Paragraph, Text } = Typography;
const { Footer } = Layout;

const FooterFragment = () => {
  const { currentLanguage } = useGlobalContext();

  return (
    <Footer className="footer">
      <div className="container">
        <div className="made-by">
          <div className="main-logos">
            <Paragraph>
              <Trans>Project by:</Trans>{' '}
            </Paragraph>
            <div className="main-logos">
              <Link to={{ pathname: 'https://sempermusica.org/' }} target="_blank">
                <img className="footerLogo__image" src={smLogo} />
              </Link>
              <Link to={{ pathname: 'https://fasmr.ro/' }} target="_blank">
                <img className="footerLogo__image" src={fasmrLogo} />
              </Link>
              <Link to={{ pathname: 'https://www.sexogsamfunn.no/' }} target="_blank">
                <img className="footerLogo__image" src={sexOgLogo} height="60px" />
              </Link>
            </div>
          </div>
          <div>
            <Paragraph>
              <Trans>Powered by:</Trans>
            </Paragraph>
            <Link to={{ pathname: `https://code4.ro/${currentLanguage}` }} target="_blank">
              <img className="footerLogo__image" src={cfrLogo} alt="" height="40px" />
            </Link>
          </div>
        </div>
        <div className="footer__links">
          <Link to="/despre">
            <Text>
              <Trans>About project</Trans>
            </Text>
          </Link>
          <Link className="footer__donate" to="/doneaza">
            <Text>
              <Trans>Support the project</Trans>
            </Text>
          </Link>
          <Link to="/politica-de-confidentialitate">
            <Text>
              <Trans>Privacy policy</Trans>
            </Text>
          </Link>
          <Link to="/termeni-si-conditii">
            <Text>
              <Trans>Terms &amp; conditions</Trans>
            </Text>
          </Link>
        </div>
        <div>&copy; {new Date().getFullYear()} Semper Musica.</div>
      </div>
    </Footer>
  );
};

export default FooterFragment;
