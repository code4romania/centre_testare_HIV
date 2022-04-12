import React, { useCallback, useMemo, useState } from 'react';
import { Button, Descriptions, Modal, Tag, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { useCenterDetailsDialog } from '../../store';
import { CenterDetailsTitle } from '../CenterDetailsTitle';

const { Paragraph } = Typography;

export const CenterDetailsDialog = () => {
  const { isOpen, details, closeDialog } = useCenterDetailsDialog();

  const [showPhoneNumbers, setShowPhoneNumbers] = useState(false);

  const isMissingPhoneNumbers = !details?.phoneNumbers || details?.phoneNumbers.length === 0;

  const mainPhoneNumber = useMemo(() => {
    if (!details?.phoneNumbers) return null;

    const [firstNumber] = details?.phoneNumbers;
    return firstNumber;
  }, [details]);

  const onCallCenterClick = useCallback(() => {
    setShowPhoneNumbers(true);
  }, []);

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
      footer={
        <div className="center-details-dialog-footer">
          {showPhoneNumbers ? (
            <Button
              className="call-center-btn"
              icon="phone"
              size="large"
              type="primary"
              ghost
              block
              disabled={isMissingPhoneNumbers}
              href={`tel:${mainPhoneNumber}`}
            >
              <span>{mainPhoneNumber}</span>
            </Button>
          ) : (
            <Button
              className="call-center-btn"
              size="large"
              type="primary"
              ghost
              block
              disabled={isMissingPhoneNumbers}
              onClick={onCallCenterClick}
            >
              <span>
                {!isMissingPhoneNumbers ? (
                  <Trans>Call center</Trans>
                ) : (
                  <Trans>Phone number missing</Trans>
                )}
              </span>
            </Button>
          )}
        </div>
      }
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
      <Descriptions column={1}>
        <Descriptions.Item label={<Trans>Tipuri de teste</Trans>}>
          <span style={{ display: 'inline-flex', flexWrap: 'wrap', rowGap: '4px' }}>
            {details?.testTypes.map((type) => (
              <Tag key={type} color="#be3386">
                {type}
              </Tag>
            ))}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Preț testare</Trans>}>
          {details?.testingPrice} RON
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Testare gratuită</Trans>}>
          {details?.isFreeTestingAvailable ? <Trans>Da</Trans> : <Trans>Nu</Trans>}
        </Descriptions.Item>
        {details?.isFreeTestingAvailable && (
          <Descriptions.Item label={<Trans>Condiții testare gratuită</Trans>}>
            {details?.freeTestingConditions.map((condition) => (
              <div key={condition}>{condition}</div>
            ))}
          </Descriptions.Item>
        )}
        <Descriptions.Item label={<Trans>Timpul de așteptare în minute</Trans>}>
          {details?.quickTestWaitTimeMinutes} <Trans>min.</Trans>
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Timpul de așteptare în zile</Trans>}>
          {details?.quickTestWaitTimeDays} <Trans>zi/zile</Trans>
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Modul de transmitere al rezultatului negativ</Trans>}>
          {details?.negativeDisclosure}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Modul de transmitere al rezultatului pozitiv</Trans>}>
          {details?.positiveDisclosure}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Se oferă consiliere pre-testare HIV</Trans>}>
          {details?.hasPreTestingCounseling ? <Trans>Da</Trans> : <Trans>Nu</Trans>}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Detalii consiliere pre-testare HIV</Trans>}>
          {details?.preCounseling}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Se oferă consiliere post-testare HIV</Trans>}>
          {details?.hasPostTestingCounseling ? <Trans>Da</Trans> : <Trans>Nu</Trans>}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Detalii consiliere post-testare HIV</Trans>}>
          {details?.postCounseling}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Documente necesare (sub 18 ani)</Trans>}>
          {details?.docsU18.map((document) => (
            <div key={document}>&bull; {document}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Documente necesare (sub 16 ani)</Trans>}>
          {details?.docsU16.map((document) => (
            <div key={document}>&bull; {document}</div>
          ))}
        </Descriptions.Item>
      </Descriptions>

      <Paragraph strong style={{ fontSize: '16px', marginBottom: '8px', marginTop: '8px' }}>
        <Trans>Informații de contact</Trans>
      </Paragraph>
      <Descriptions>
        <Descriptions.Item label={<Trans>Număr/Numere de telefon</Trans>} span={3}>
          {showPhoneNumbers ? (
            details?.phoneNumbers.map((number) => (
              <Tag key={number}>
                <a href={`tel:${number}`}>{number}</a>
              </Tag>
            ))
          ) : (
            <Tag onClick={onCallCenterClick}>
              <Trans>Call center</Trans>
            </Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Adresă/adrese de email ale centrului</Trans>} span={3}>
          {details?.emails.map((email) => (
            <a key={email} href={`mailto:${email}`}>
              {email}
            </a>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Pagină web</Trans>} span={3}>
          <a href={details?.website} target="_blank" rel="noreferrer">
            {details?.website}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label={<Trans>Formular de contact online</Trans>} span={3}>
          {details?.onlineContactType}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default { CenterDetailsDialog };
