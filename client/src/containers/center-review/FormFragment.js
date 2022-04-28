import React, { useCallback } from 'react';
import { Button, Col, Form, Row, Select, Typography, Rate, message } from 'antd';
import { Trans, t } from '@lingui/macro';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { pickBy, startsWith } from 'lodash';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { useIsSmallDevice } from '../../hooks/useIsSmallDevice';
import config from '../../config';
import { useGlobalContext } from '../../context';
import { useCenterReviewQuestionsQuery, useDetailedTestingCentersQuery } from '../../queries';
import FormLabelWithNote from '../../components/FormLabelWithNote';
import FormRadio from '../../components/FormRadio';
import { useCenterReviewFormMutation } from '../../queries/form-mutation';

const { Title } = Typography;
const { Option } = Select;

const { CAPTCHA_API_KEY } = config;

const FormFragment = ({ form }) => {
  const { getFieldDecorator } = form;

  const createFormValidationRules = useCreateFormValidationRules();
  const isSmallDevice = useIsSmallDevice();
  const { currentLanguage } = useGlobalContext();

  const { data: testingCenters } = useDetailedTestingCentersQuery();

  const { data: reviewQuestions } = useCenterReviewQuestionsQuery();

  const { mutate: sendReview, isLoading } = useCenterReviewFormMutation();

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
        const answers = pickBy(values, (value, key) => startsWith(key, 'answer'));
        const body = {
          pk: values.pk,
          review: {
            ratings: [
              {
                rating: values.rating,
                answers,
              },
            ],
          },
        };

        sendReview(body, {
          onSuccess: () => {
            message.success(t({ message: 'The form was submitted successfully.' }));
          },
          onError: () => {
            message.error(
              t({ message: 'There was an error submitting the form. Please try again.' }),
            );
          },
        });
      });
    },
    [form, sendReview],
  );

  return (
    <Row>
      <Col xs={24} md={12}>
        <Title level={3} className="form-title">
          <Trans>Testing center experience feedback</Trans>
        </Title>
        <Form onSubmit={onSubmitHandler}>
          <Form.Item label={<FormLabelWithNote label={<Trans>Testing center</Trans>} />}>
            {getFieldDecorator('pk', {
              rules: createFormValidationRules([{ ruleName: 'required' }]),
            })(
              <Select
                className="dropdown"
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.join('').toLowerCase().indexOf(input?.toLowerCase()) >= 0
                }
              >
                {testingCenters?.map((center) => (
                  <Option key={center.pk} value={center?.pk}>
                    {center?.name}, {center?.streetName}, {center?.streetNumber}, {center?.locality}
                    , {center?.county}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          <Form.Item label={<Trans>Review</Trans>}>
            {getFieldDecorator('rating', {
              rules: createFormValidationRules([{ ruleName: 'required' }]),
            })(<Rate />)}
          </Form.Item>

          {reviewQuestions?.map(({ question }, index) => (
            <FormRadio
              key={question}
              fieldName={`answer_${index}`}
              form={form}
              label={question}
              options={[
                { value: 'yes', text: <Trans>Yes</Trans> },
                { value: 'no', text: <Trans>No</Trans> },
              ]}
              rulesOptions={[{ ruleName: 'required' }]}
            />
          ))}

          <Row type="flex" align="middle" justify="space-between">
            <Col>
              <Form.Item>
                {getFieldDecorator('captcha', {
                  rules: createFormValidationRules([{ ruleName: 'captcha' }]),
                })(
                  <HCaptcha
                    disabled={isLoading}
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
                <Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">
                  <Trans>Send</Trans>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Form.create({ name: 'contact' })(FormFragment);
