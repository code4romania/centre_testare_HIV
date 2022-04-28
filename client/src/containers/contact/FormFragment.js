import React, { useCallback } from 'react';
import { Button, Checkbox, Col, Form, message, Row, Typography } from 'antd';
import { t, Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import FormInput from '../../components/FormInput';
import FormTextArea from '../../components/FormTextArea';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { useIsSmallDevice } from '../../hooks/useIsSmallDevice';
import config from '../../config';
import { useGlobalContext } from '../../context';
import { useSubmitContactForm } from '../../hooks/form/useSubmitContactForm';

const { Title } = Typography;

const { CAPTCHA_API_KEY } = config;

const FormFragment = ({ form }) => {
  const { getFieldDecorator } = form;

  const createFormValidationRules = useCreateFormValidationRules();
  const isSmallDevice = useIsSmallDevice();
  const { currentLanguage } = useGlobalContext();

  const { submitContactForm, isSubmittingContactForm } = useSubmitContactForm({
    onSuccess: () => {
      form.setFieldsValue({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
        gdpr: false,
      });
      message.success(t({ message: 'The form was submitted successfully.' }));
    },
    onError: () => {
      message.error(t({ message: 'There was an error submitting the form. Please try again.' }));
    },
  });

  const handleVerifyCaptcha = (token) => {
    form.setFieldsValue({
      captcha: token,
    });
  };

  const onSubmitHandler = useCallback(
    (event) => {
      event.preventDefault();

      form.validateFields(async (err, values) => {
        if (err) {
          return;
        }

        submitContactForm(values);
      });
    },
    [form, submitContactForm],
  );

  return (
    <Row>
      <Title level={2} className="form-title">
        <Trans>About you</Trans>
      </Title>
      <Form onSubmit={onSubmitHandler}>
        <Row gutter={20}>
          <Col xs={24} md={12}>
            <FormInput
              disabled={isSubmittingContactForm}
              fieldName="name"
              form={form}
              label={<Trans id="form.name" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
            />
          </Col>
          <Col xs={24} md={12}>
            <FormInput
              disabled={isSubmittingContactForm}
              fieldName="email"
              form={form}
              label={<Trans id="form.email" />}
              rulesOptions={[
                { ruleName: 'required' },
                { ruleName: 'email' },
                { ruleName: 'max', value: 100 },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={24} md={12}>
            <FormInput
              disabled={isSubmittingContactForm}
              fieldName="phoneNumber"
              form={form}
              label={<Trans id="form.phoneNumber" />}
              rulesOptions={[{ ruleName: 'max', value: 100 }]}
            />
          </Col>
        </Row>
        <Row>
          <FormTextArea
            disabled={isSubmittingContactForm}
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
            <Checkbox disabled={isSubmittingContactForm} style={{ lineHeight: 1.5 }}>
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
                  disabled={isSubmittingContactForm}
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
              <Button
                disabled={isSubmittingContactForm}
                loading={isSubmittingContactForm}
                type="primary"
                htmlType="submit"
              >
                <Trans>Send</Trans>
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

export default Form.create({ name: 'contact' })(FormFragment);
