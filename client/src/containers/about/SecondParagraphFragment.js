import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph, Text, Title } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ textAlign: 'left' }}>
      <Col span={24}>
        <Title level={2}>
          <Trans>Despre Semper Muzica</Trans>
        </Title>
        <Paragraph>
          <Trans>
            Asociația Semper Musica a luat naștere din dorința de a face o schimbare în mai bine.
            Acționăm preponderent în domeniul educației pentru prevenirea infecției cu HIV în rândul
            liceenilor și tinerilor de la nivel național. Ne ghidăm activitățile după viziunea și
            misiunea noastră.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Viziunea:{' '}
            <Text strong>
              O societate fără cazuri noi de HIV în rândul tinerilor, în care discriminarea
              persoanelor seropozitive nu există
            </Text>
            .
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Misiunea:{' '}
            <Text strong>
              Luptăm pentru acces liber al tinerilor la educație și protecție pentru prevenirea HIV
              și împotriva discriminării persoanelor seropozitive
            </Text>
            .
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Avem câteva valori puternice și nu ne distanțăm de ele: <Text strong>inovare</Text>,
            <Text strong>diversitate</Text>, <Text strong>responsabilitate și calitate</Text>,{' '}
            <Text strong>implicare și acțiune</Text>.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Proiectele realizate de noi au adus o schimbare pentru tinerii din România, iar
            implicarea și calitatea lor ne-au propulsat către diverse gale și concursuri, însumând
            de la înființare și până astăzi nu mai puțin de 10 premii. Încă de la înființare ne
            ocupăm cu educarea tinerilor din medii defavorizate cu privire la prevenirea infecției
            cu HIV și despre sănătatea sexuală și a reproducerii.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
