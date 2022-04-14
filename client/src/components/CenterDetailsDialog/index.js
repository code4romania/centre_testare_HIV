import React, { useCallback, useMemo, useState } from 'react';
import { Button, Descriptions, Modal, Tag, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { useCenterDetailsDialog } from '../../store';
import { getDeviceType } from '../../utils';

const { Paragraph } = Typography;

const { isIos } = getDeviceType();

export const CenterDetailsDialog = () => {
  const { isOpen, details, closeDialog } = useCenterDetailsDialog();

  const [showPhoneNumbers, setShowPhoneNumbers] = useState(false);

  const coordinates = `${parseFloat(details?.lat, 10)},${parseFloat(details?.lng, 10)}`;

  const locationHref = isIos ? `geo:${coordinates}` : `https://maps.google.com?q=${coordinates}`;

  const isMissingPhoneNumbers = !details?.phoneNumbers || details?.phoneNumbers.length === 0;

  const mainPhoneNumber = useMemo(() => {
    if (!details?.phoneNumbers) return null;

    const [firstNumber] = details?.phoneNumbers;
    return firstNumber;
  }, [details]);

  const onCallCenterClick = useCallback(() => {
    if (isMissingPhoneNumbers) return;

    setShowPhoneNumbers(true);
  }, [isMissingPhoneNumbers]);

  return (
    <Modal
      title={
        details?.name ? (
          <span className="center-details-title">{details.name}</span>
        ) : (
          <Trans>Centru testare</Trans>
        )
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
      <Descriptions column={1} layout="horizontal" size="small">
        {details?.type && (
          <Descriptions.Item label={<Trans>Tip centru</Trans>}>{details?.type}</Descriptions.Item>
        )}
        {details?.scheduleStart && details.scheduleEnd && (
          <Descriptions.Item label={<Trans>Program</Trans>}>
            {details?.scheduleStart} - {details?.scheduleEnd}
          </Descriptions.Item>
        )}
        <Descriptions.Item label={<Trans>Adresa</Trans>}>
          {details?.streetName} {details?.streetNumber},{' '}
          {details?.locality && details?.countyCode
            ? `${details.locality}, ${details.countyCode}`
            : details?.locality ?? details?.countyCode}{' '}
          (
          <Link to={{ pathname: locationHref }} target="_blank">
            <Trans>see how to get there</Trans>
          </Link>
          )
        </Descriptions.Item>
        {details?.addressDetails && (
          <Descriptions.Item label={<Trans>Detalii adresă</Trans>}>
            {details?.addressDetails}
          </Descriptions.Item>
        )}
      </Descriptions>

      <Paragraph strong style={{ fontSize: '16px', marginBottom: '8px', marginTop: '8px' }}>
        <Trans>Detalii despre testare</Trans>
      </Paragraph>
      <Descriptions column={1}>
        {details?.testTypes && details?.testTypes.length > 0 && (
          <Descriptions.Item label={<Trans>Tipuri de teste</Trans>}>
            <span style={{ display: 'inline-flex', flexWrap: 'wrap', rowGap: '4px' }}>
              {details?.testTypes.map((type) => (
                <Tag key={type} color="#be3386">
                  {type}
                </Tag>
              ))}
            </span>
          </Descriptions.Item>
        )}
        {details?.testingPrice && (
          <Descriptions.Item label={<Trans>Preț testare</Trans>}>
            {details?.testingPrice} RON
          </Descriptions.Item>
        )}
        {details?.isFreeTestingAvailable && (
          <>
            <Descriptions.Item label={<Trans>Testare gratuită</Trans>}>
              {details?.isFreeTestingAvailable ? <Trans>Da</Trans> : <Trans>Nu</Trans>}
            </Descriptions.Item>
            {details?.freeTestingConditions && details?.freeTestingConditions.length > 0 && (
              <Descriptions.Item label={<Trans>Condiții testare gratuită</Trans>}>
                {details?.freeTestingConditions.map((condition) => (
                  <div key={condition}>{condition}</div>
                ))}
              </Descriptions.Item>
            )}
          </>
        )}
        {(details?.quickTestWaitTimeMinutes || details?.quickTestWaitTimeDays) && (
          <Descriptions.Item label={<Trans>Timpul de așteptare</Trans>}>
            {details?.quickTestWaitTimeMinutes
              ? details?.quickTestWaitTimeMinutes
              : details?.quickTestWaitTimeDays}{' '}
            {details?.quickTestWaitTimeMinutes ? <Trans>min.</Trans> : <Trans>zi/zile</Trans>}
          </Descriptions.Item>
        )}
        {details?.negativeDisclosure && (
          <Descriptions.Item label={<Trans>Modul de transmitere al rezultatului negativ</Trans>}>
            {details?.negativeDisclosure}
          </Descriptions.Item>
        )}
        {details?.positiveDisclosure && (
          <Descriptions.Item label={<Trans>Modul de transmitere al rezultatului pozitiv</Trans>}>
            {details?.positiveDisclosure}
          </Descriptions.Item>
        )}
        {details?.hasPreTestingCounseling && (
          <>
            <Descriptions.Item label={<Trans>Se oferă consiliere pre-testare HIV</Trans>}>
              {details?.hasPreTestingCounseling ? <Trans>Da</Trans> : <Trans>Nu</Trans>}
            </Descriptions.Item>
            {details?.preCounseling && (
              <Descriptions.Item label={<Trans>Detalii consiliere pre-testare HIV</Trans>}>
                {details?.preCounseling}
              </Descriptions.Item>
            )}
          </>
        )}
        {details?.hasPostTestingCounseling && (
          <>
            <Descriptions.Item label={<Trans>Se oferă consiliere post-testare HIV</Trans>}>
              {details?.hasPostTestingCounseling ? <Trans>Da</Trans> : <Trans>Nu</Trans>}
            </Descriptions.Item>
            {details?.postCounseling && (
              <Descriptions.Item label={<Trans>Detalii consiliere post-testare HIV</Trans>}>
                {details?.postCounseling}
              </Descriptions.Item>
            )}
          </>
        )}
        {details?.docsU18 && details?.docsU18.length > 0 && (
          <Descriptions.Item label={<Trans>Documente necesare (sub 18 ani)</Trans>}>
            {details?.docsU18.map((document) => (
              <div key={document}>&bull; {document}</div>
            ))}
          </Descriptions.Item>
        )}
        {details?.docsU16 && details?.docsU16.length > 0 && (
          <Descriptions.Item label={<Trans>Documente necesare (sub 16 ani)</Trans>}>
            {details?.docsU16.map((document) => (
              <div key={document}>&bull; {document}</div>
            ))}
          </Descriptions.Item>
        )}
      </Descriptions>

      <Paragraph strong style={{ fontSize: '16px', marginBottom: '8px', marginTop: '8px' }}>
        <Trans>Informații de contact</Trans>
      </Paragraph>
      <Descriptions column={1}>
        <Descriptions.Item label={<Trans>Număr/Numere de telefon</Trans>}>
          {showPhoneNumbers ? (
            details?.phoneNumbers.map((number) => (
              <Tag key={number}>
                <a href={`tel:${number}`}>{number}</a>
              </Tag>
            ))
          ) : (
            <Tag onClick={onCallCenterClick}>
              {!isMissingPhoneNumbers ? (
                <Trans>Call center</Trans>
              ) : (
                <Trans>Phone number missing</Trans>
              )}
            </Tag>
          )}
        </Descriptions.Item>
        {details?.emails && details?.emails.length > 0 && (
          <Descriptions.Item label={<Trans>Adresă/adrese de email ale centrului</Trans>}>
            {details?.emails.map((email) => (
              <a key={email} href={`mailto:${email}`}>
                {email}
              </a>
            ))}
          </Descriptions.Item>
        )}
        {details?.website && (
          <Descriptions.Item label={<Trans>Pagină web</Trans>}>
            <a href={details?.website} target="_blank" rel="noreferrer">
              {details?.website}
            </a>
          </Descriptions.Item>
        )}
        {details?.onlineContactType && (
          <Descriptions.Item label={<Trans>Formular de contact online</Trans>}>
            {details?.onlineContactType}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
};

export default { CenterDetailsDialog };
