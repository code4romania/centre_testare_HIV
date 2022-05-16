import React, { useCallback, useState } from 'react';
import { Trans, t } from '@lingui/macro';
import { Col, Row, Tooltip } from 'antd';

import copyToClipboardIcon from '../../images/copy-to-clipboard.svg';
import facebookLogo from '../../images/facebook.svg';
import whatsappLogo from '../../images/whatsapp.svg';

function Sharing() {
  const URL = window.location.href;
  const [visible, setVisible] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(URL);
    setVisible(true);
  }, [URL]);

  return (
    <Row className="sharing" type="flex" gutter={[10, 10]} align="middle">
      <Col>
        <Trans>Share:</Trans>
      </Col>
      <Col>
        <Tooltip
          trigger={['click']}
          title={t({
            message: 'Copied',
          })}
          placement="bottom"
          visible={visible}
        >
          <a
            className="sharing-icon"
            onClick={copyToClipboard}
            onMouseLeave={() => setVisible(false)}
          >
            <img src={copyToClipboardIcon} alt="" />
          </a>
        </Tooltip>
        <a
          className="sharing-icon"
          target="_blank"
          rel="noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${URL}`}
        >
          <img src={facebookLogo} alt="" />
        </a>
        <a
          className="sharing-icon"
          target="_blank"
          rel="noreferrer"
          href={`https://wa.me/?text=${URL}`}
          data-size="large"
        >
          <img src={whatsappLogo} alt="" />
        </a>
      </Col>
    </Row>
  );
}

export default Sharing;
