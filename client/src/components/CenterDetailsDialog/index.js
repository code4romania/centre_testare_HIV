import React from 'react';
import { Descriptions, Modal, Tag, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { useCenterDetailsDialog } from '../../store';
import { CenterDetailsTitle } from '../CenterDetailsTitle';

const { Paragraph } = Typography;

export const CenterDetailsDialog = () => {
  const { isOpen, details, closeDialog } = useCenterDetailsDialog();

  return (
    <Modal
      title={
        <CenterDetailsTitle
          streetName={details?.streetName ?? ''}
          streetNumber={details?.streetNumber}
          locality={details?.locality}
          countyCode={details?.countyCode}
          lat={details?.lat}
          lng={details?.lng}
          averageRating={details?.averageRating}
          totalRatings={details?.numberOfRatings}
        />
      }
      visible={isOpen}
      footer={null}
      onCancel={closeDialog}
      bodyStyle={{ height: '60vh', overflow: 'auto' }}
    >
      <Paragraph strong style={{ fontSize: '16px', marginBottom: '8px', marginTop: '8px' }}>
        <Trans>Detalii despre centru</Trans>
      </Paragraph>
      <Descriptions layout="horizontal" size="small">
        <Descriptions.Item label={<Trans>Nume</Trans>} span={3}>
          {details?.name}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Tip centru</Trans>} span={3}>
          {details?.type}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Program</Trans>} span={3}>
          {details?.scheduleStart} - {details?.scheduleEnd}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Detalii adresă</Trans>} span={3}>
          {details?.addressDetails}
        </Descriptions.Item>
      </Descriptions>

      <Paragraph strong style={{ fontSize: '16px', marginBottom: '8px', marginTop: '8px' }}>
        <Trans>Detalii despre testare</Trans>
      </Paragraph>
      <Descriptions>
        <Descriptions.Item label={<Trans>Tipuri de teste</Trans>} span={3}>
          <span style={{ display: 'inline-flex', flexWrap: 'wrap', rowGap: '4px' }}>
            {details?.testTypes.map((type) => (
              <Tag key={type} color="#be3386">
                {type}
              </Tag>
            ))}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Preț testare</Trans>} span={3}>
          {details?.testingPrice} RON
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Testare gratuită</Trans>} span={3}>
          {details?.isFreeTestingAvailable ? <Trans>Da</Trans> : <Trans>Nu</Trans>}
        </Descriptions.Item>
        {details?.isFreeTestingAvailable && (
          <Descriptions.Item label={<Trans>Condiții testare gratuită</Trans>} span={3}>
            {details?.freeTestingConditions.map((condition) => (
              <div>{condition}</div>
            ))}
          </Descriptions.Item>
        )}
        <Descriptions.Item label={<Trans>Timpul de așteptare în minute</Trans>} span={3}>
          {details?.quickTestWaitTimeMinutes} <Trans>min.</Trans>
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Timpul de așteptare în zile</Trans>} span={3}>
          {details?.quickTestWaitTimeDays} <Trans>zi/zile</Trans>
        </Descriptions.Item>
        <Descriptions.Item
          label={<Trans>Modul de transmitere al rezultatului negativ</Trans>}
          span={3}
        >
          {details?.negativeDisclosure}
        </Descriptions.Item>
        <Descriptions.Item
          label={<Trans>Modul de transmitere al rezultatului pozitiv</Trans>}
          span={3}
        >
          {details?.positiveDisclosure}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Se oferă consiliere pre-testare HIV</Trans>} span={3}>
          {details?.hasPreTestingCounseling ? <Trans>Da</Trans> : <Trans>Nu</Trans>}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Detalii consiliere pre-testare HIV</Trans>} span={3}>
          {details?.preCounseling}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Se oferă consiliere post-testare HIV</Trans>} span={3}>
          {details?.hasPostTestingCounseling ? <Trans>Da</Trans> : <Trans>Nu</Trans>}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Detalii consiliere post-testare HIV</Trans>} span={3}>
          {details?.postCounseling}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Documente necesare (sub 18 ani)</Trans>} span={3}>
          {details?.docsU18.map((document) => (
            <div>{document}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Documente necesare (sub 16 ani)</Trans>} span={3}>
          {details?.docsU16.map((document) => (
            <div>{document}</div>
          ))}
        </Descriptions.Item>
      </Descriptions>

      <Paragraph strong style={{ fontSize: '16px', marginBottom: '8px', marginTop: '8px' }}>
        <Trans>Informații de contact</Trans>
      </Paragraph>
      <Descriptions>
        <Descriptions.Item label={<Trans>Număr/Numere de telefon</Trans>} span={3}>
          {details?.phoneNumbers.map((number) => (
            <div>{number}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Adresă/adrese de email ale centrului</Trans>} span={3}>
          {details?.emails.map((email) => (
            <div>{email}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Pagină web</Trans>} span={3}>
          {details?.website}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Formular de contact online</Trans>} span={3}>
          {details?.onlineContactType}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default { CenterDetailsDialog };
