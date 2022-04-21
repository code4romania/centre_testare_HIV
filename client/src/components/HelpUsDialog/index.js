import React, { useCallback } from 'react';
import { Button, Form, Modal, Typography, message } from 'antd';
import { t, Trans } from '@lingui/macro';
import { useHelpUsDialog } from '../../store';
import FormInput from '../FormInput';
import { useHelpUsFormMutation } from '../../queries/form-mutation';

const { Paragraph } = Typography;

const HelpUsForm = ({ form }) => {
  const { closeDialog } = useHelpUsDialog();

  const { mutate: submitHelpUsForm, isLoading } = useHelpUsFormMutation({
    onSuccess: () => {
      closeDialog();
      message.success(t({ message: 'Email address sent successfully. We thank you!' }));
    },
  });

  const onSubmitHandler = useCallback(
    (event) => {
      event.preventDefault();

      form.validateFields(async (err, values) => {
        if (err) {
          return;
        }

        submitHelpUsForm(values);
      });
    },
    [form, submitHelpUsForm],
  );

  return (
    <Form onSubmit={onSubmitHandler}>
      <Paragraph strong style={{ fontSize: '16px', marginBottom: '8px', marginTop: '8px' }}>
        <Trans>
          We're glad you want to call the test center directly. Please help us provide you with the
          best information and services and improve your experience at testing centers and beyond.
          Leave us an email address so we can keep in touch with you.
        </Trans>
      </Paragraph>
      <FormInput
        form={form}
        fieldName="userEmail"
        label={<Trans id="form.email" />}
        rulesOptions={[{ ruleName: 'required' }, { ruleName: 'email' }]}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <Button disabled={isLoading} type="ghost" onClick={closeDialog}>
          <Trans>Continue</Trans>
        </Button>
        <Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">
          <Trans>Keep in touch</Trans>
        </Button>
      </div>
    </Form>
  );
};

const HelpUsFormWrapper = Form.create({ name: 'helpUs' })(HelpUsForm);

export const HelpUsDialog = () => {
  const { isOpen, closeDialog } = useHelpUsDialog();

  return (
    <Modal
      centered
      visible={isOpen}
      onCancel={closeDialog}
      footer={null}
      zIndex={2000}
      destroyOnClose
    >
      <HelpUsFormWrapper />
    </Modal>
  );
};

export default { HelpUsDialog };
