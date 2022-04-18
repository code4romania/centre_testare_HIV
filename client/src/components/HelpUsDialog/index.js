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
      message.success(t({ message: 'Adresa a fost trimisă cu succes. Iți mulțumim!' }));
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
          Ne bucurăm că vrei să apelezi direct centrul de testare. Te rugăm să ne ajuți să îți
          oferim cele mai bune informații și servicii și să îmbunătățim experiența la centrele de
          testare și nu numai. Lasă-ne o adresă de e-mail prin care să putem păstra legătura cu
          tine.
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
          <Trans>Continuă</Trans>
        </Button>
        <Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">
          <Trans>Ținem legătura</Trans>
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
