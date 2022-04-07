import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph, Title } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ textAlign: 'left', marginBottom: '6rem' }}>
      <Col span={24}>
        <Title level={2}>
          <Trans>Despre Centre HIV</Trans>
        </Title>
        <Paragraph>
          <Trans>
            Centre HIV - este prima aplicație din România de testare HIV, unde sunt centralizate
            instituții din 11 județe din România care oferă testare HIV. În cadrul aplicației oferim
            detalii precum localizarea instituției, programul de lucru, costul unui test cât și
            detalii necesare pentru testarea infecției cu HIV, modalitățile de testare a persoanelor
            sub 16 ani și asigurarea consilierii pentru persoanele care au nevoie de mai multe
            informații.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
