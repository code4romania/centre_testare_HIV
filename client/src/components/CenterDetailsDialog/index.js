import React, { useCallback, useMemo, useState } from 'react';
import { Button, Descriptions, Modal, Tag, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { useCenterDetailsDialog, useHelpUsDialog } from '../../store';
import { mapCoordinatesToLocationHref } from '../../utils';

const { Paragraph } = Typography;

export const CenterDetailsDialog = () => {
  const { isOpen, details, closeDialog } = useCenterDetailsDialog();
  const { openDialog: openHelpUsDialog } = useHelpUsDialog();

  const [showPhoneNumbers, setShowPhoneNumbers] = useState(false);

  const urlQuery = details?.name.replaceAll(' ', '+') ?? '';
  const locationHref = mapCoordinatesToLocationHref(details?.lat ?? 0, details?.lng ?? 0, urlQuery);

  const isMissingPhoneNumbers = !details?.phoneNumbers || details?.phoneNumbers.length === 0;

  const mainPhoneNumber = useMemo(() => {
    if (!details?.phoneNumbers) return null;

    const [firstNumber] = details?.phoneNumbers;
    return firstNumber;
  }, [details]);

  const onCallCenterClick = useCallback(() => {
    if (isMissingPhoneNumbers) return;

    openHelpUsDialog();
    setShowPhoneNumbers(true);
  }, [isMissingPhoneNumbers, openHelpUsDialog]);

  return (
    <Modal
      title={
        details?.name ? (
          <span className="center-details-title">{details.name}</span>
        ) : (
          <Trans>Testing center</Trans>
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
        <Trans>Details about the center</Trans>
      </Paragraph>
      <Descriptions column={1} layout="horizontal" size="small">
        {details?.type && (
          <Descriptions.Item label={<Trans>Center type</Trans>}>{details?.type}</Descriptions.Item>
        )}
        {details?.scheduleStart && details.scheduleEnd && (
          <Descriptions.Item label={<Trans>Opening hours</Trans>}>
            {details?.scheduleStart} - {details?.scheduleEnd}
          </Descriptions.Item>
        )}
        <Descriptions.Item label={<Trans>Address</Trans>}>
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
          <Descriptions.Item label={<Trans>Address details</Trans>}>
            {details?.addressDetails}
          </Descriptions.Item>
        )}
      </Descriptions>

      <Paragraph strong style={{ fontSize: '16px', marginBottom: '8px', marginTop: '8px' }}>
        <Trans>Details about the testing</Trans>
      </Paragraph>
      <Descriptions column={1}>
        {details?.testTypes && details?.testTypes.length > 0 && (
          <Descriptions.Item label={<Trans>Test types</Trans>}>
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
          <Descriptions.Item label={<Trans>Testing price</Trans>}>
            {details?.testingPrice} RON
          </Descriptions.Item>
        )}
        {details?.isFreeTestingAvailable && (
          <>
            <Descriptions.Item label={<Trans>Free testing</Trans>} span={2}>
              {details?.isFreeTestingAvailable ? <Trans>Yes</Trans> : <Trans>No</Trans>}
            </Descriptions.Item>
            {details?.freeTesting && details?.freeTesting.length > 0 && (
              <Descriptions.Item label={<Trans>Free test conditions</Trans>}>
                {details?.freeTesting.map((condition) => (
                  <div key={condition}>&bull; {condition}</div>
                ))}
              </Descriptions.Item>
            )}
          </>
        )}
        {(details?.quickTestWaitTimeMinutes || details?.quickTestWaitTimeDays) && (
          <Descriptions.Item label={<Trans>Waiting time</Trans>}>
            {details?.quickTestWaitTimeMinutes
              ? details?.quickTestWaitTimeMinutes
              : details?.quickTestWaitTimeDays}{' '}
            {details?.quickTestWaitTimeMinutes ? <Trans>min.</Trans> : <Trans>day(s)</Trans>}
          </Descriptions.Item>
        )}
        {details?.negativeDisclosure && (
          <Descriptions.Item label={<Trans>How the negative result is transmitted</Trans>}>
            {details?.negativeDisclosure}
          </Descriptions.Item>
        )}
        {details?.positiveDisclosure && (
          <Descriptions.Item label={<Trans>How the positive result is transmitted</Trans>}>
            {details?.positiveDisclosure}
          </Descriptions.Item>
        )}
        {details?.hasPreTestingCounseling && (
          <>
            <Descriptions.Item label={<Trans>HIV pre-test counseling is provided</Trans>}>
              {details?.hasPreTestingCounseling ? <Trans>Yes</Trans> : <Trans>No</Trans>}
            </Descriptions.Item>
            {details?.preCounseling && (
              <Descriptions.Item label={<Trans>Pre HIV test counseling details</Trans>}>
                {details?.preCounseling}
              </Descriptions.Item>
            )}
          </>
        )}
        {details?.hasPostTestingCounseling && (
          <>
            <Descriptions.Item label={<Trans>HIV post-test counseling is provided</Trans>}>
              {details?.hasPostTestingCounseling ? <Trans>Yes</Trans> : <Trans>No</Trans>}
            </Descriptions.Item>
            {details?.postCounseling && (
              <Descriptions.Item label={<Trans>Post HIV test counseling details</Trans>}>
                {details?.postCounseling}
              </Descriptions.Item>
            )}
          </>
        )}
        {details?.docsU18 && details?.docsU18.length > 0 && (
          <Descriptions.Item label={<Trans>Required documents (under 18)</Trans>}>
            {details?.docsU18.map((document) => (
              <div key={document}>&bull; {document}</div>
            ))}
          </Descriptions.Item>
        )}
        {details?.docsU16 && details?.docsU16.length > 0 && (
          <Descriptions.Item label={<Trans>Required documents (under 16)</Trans>}>
            {details?.docsU16.map((document) => (
              <div key={document}>&bull; {document}</div>
            ))}
          </Descriptions.Item>
        )}
      </Descriptions>

      <Paragraph strong style={{ fontSize: '16px', marginBottom: '8px', marginTop: '8px' }}>
        <Trans>Contact information</Trans>
      </Paragraph>
      <Descriptions column={1}>
        <Descriptions.Item label={<Trans>Phone number(s)</Trans>}>
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
          <Descriptions.Item label={<Trans>Center email address (s)</Trans>}>
            {details?.emails.map((email) => (
              <a key={email} href={`mailto:${email}`}>
                {email}
              </a>
            ))}
          </Descriptions.Item>
        )}
        {details?.website && (
          <Descriptions.Item label={<Trans>Website</Trans>}>
            <a href={details?.website} target="_blank" rel="noreferrer">
              {details?.website}
            </a>
          </Descriptions.Item>
        )}
        {details?.onlineContactType && (
          <Descriptions.Item label={<Trans>Online contact form</Trans>}>
            {details?.onlineContactType}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
};

export default { CenterDetailsDialog };
