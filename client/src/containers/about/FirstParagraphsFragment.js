import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph, Text, Title } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ marginTop: '4rem', textAlign: 'left' }}>
      <Col span={24}>
        <Title level={2}>
          <Trans>Despre fazele proiectului</Trans>
        </Title>
        <Paragraph>
          <Trans>
            Colectăm informații de la tinerii între 15-35 de ani cu privire la accesul lor la
            educație pentru sănătatea sexuală și a reproducerii. Vrem să aflăm ce știu despre
            metodele contraceptive și infecția cu virusul HIV precum și despre metodele de testare.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Prezentăm rezultatele analizei autorităților locale prin intermediul unor conferințe de
            presă pentru a aduce la cunoștință acestora nevoile tinerilor.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Implementăm <Text strong>prima aplicație din România</Text> de testare HIV, unde vor fi
            disponibile detalii legate de localizarea, programul și costul necesar pentru testarea
            infecției cu HIV, asigurăm consiliere înainte și după testare pentru persoanele care au
            nevoie de informații suplimentare, oferim detalii legate de modalitățile de testare a
            persoanelor cu vârsta sub 16 ani.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Organizăm un proces de informare al elevilor și tinerilor prin sesiuni non-formale după
            modelul norvegian de educație cu privire la sănătatea sexuală și a reproducerii.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Punem bazele unor acțiuni de advocacy cu autoritățile locale pe baza rezultatelor
            programului <Text strong>Servicii din Norvegia pentru tinerii din România - PILOT</Text>
            cu scopul de a aduce în atenția autorităților nevoia de a investi în servicii ce
            urmăresc să asigure tinerilor accesul la informații despre sănătatea sexuală și a
            reproducerii, accesul facil la metode contraceptive și la testarea pentru infecția cu
            HIV.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
