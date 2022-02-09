import React from 'react';
import { Button, Checkbox, Col, Form, Row, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import FormInput from '../../components/FormInput';
import FormTextArea from '../../components/FormTextArea';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { useIsSmallDevice } from '../../hooks/useIsSmallDevice';
import config from '../../config';
import { useGlobalContext } from '../../context';

const { Title } = Typography;

const { CAPTCHA_API_KEY } = config;

const FormFragment = ({ form }) => {
  const { getFieldDecorator } = form;

  const createFormValidationRules = useCreateFormValidationRules();
  const isSmallDevice = useIsSmallDevice();
  const { currentLanguage } = useGlobalContext();

  const handleVerifyCaptcha = (token) => {
    form.setFieldsValue({
      captcha: token,
    });
  };

  return (
    <Row>
      <Title level={2} className="form-title">
        <Trans>About you</Trans>
      </Title>
      <Row gutter={20}>
        <Col xs={24} md={12}>
          <FormInput
            fieldName="name"
            form={form}
            label={<Trans id="form.name" />}
            rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
          />
        </Col>
        <Col xs={24} md={12}>
          <FormInput
            fieldName="email"
            form={form}
            label={<Trans id="form.email" />}
            rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
          />
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} md={12}>
          <FormInput
            fieldName="phone_number"
            form={form}
            label={<Trans id="form.phoneNumber" />}
            rulesOptions={[{ ruleName: 'max', value: 100 }]}
          />
        </Col>
      </Row>
      <Row>
        <FormTextArea
          fieldName="message"
          form={form}
          label={<Trans id="form.message" />}
          rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 400 }]}
        />
      </Row>
      <Form.Item style={{ lineHeight: 1 }}>
        {getFieldDecorator('gdpr', {
          valuePropName: 'checked',
          rules: createFormValidationRules([{ ruleName: 'gdpr' }]),
        })(
          <Checkbox style={{ lineHeight: 1.5 }}>
            <Trans id="form.gdpr_agreement">
              By this check, you agree that the data provided by you through this form will be
              processed exclusively to upload this document on the platform and that the MKBT team
              will contact you only in connection with this submission. Here you can find{' '}
              <Link to="/termeni-si-conditii" target="_blank">
                our regulations on the processing of personal data
              </Link>
              .
            </Trans>
          </Checkbox>,
        )}
      </Form.Item>
      <Row type="flex" align="middle" justify="space-between">
        <Col>
          <Form.Item>
            {getFieldDecorator('captcha', {
              rules: createFormValidationRules([{ ruleName: 'captcha' }]),
            })(
              <HCaptcha
                sitekey={CAPTCHA_API_KEY}
                onVerify={handleVerifyCaptcha}
                hl={currentLanguage}
                languageOverride={currentLanguage}
                size={isSmallDevice ? 'compact' : 'normal'}
              />,
            )}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <Trans>Send</Trans>
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Row>
  );
};

export default Form.create({ name: 'contact' })(FormFragment);
