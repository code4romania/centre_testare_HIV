import React from 'react';
import { Radio } from 'antd';
import FormField from '../FormField';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';

const FormRadio = ({ disabled, fieldName, form, onChange, options, rulesOptions, ...rest }) => {
  const { getFieldDecorator } = form;
  const createFormValidationRules = useCreateFormValidationRules();

  return (
    <FormField {...rest}>
      {getFieldDecorator(fieldName, { rules: createFormValidationRules(rulesOptions) })(
        <Radio.Group disabled={disabled} onChange={onChange}>
          {options.map(({ value, text }) => (
            <React.Fragment key={`${fieldName}-${value}`}>
              <Radio value={value}>{text}</Radio>
              <br />
            </React.Fragment>
          ))}
        </Radio.Group>,
      )}
    </FormField>
  );
};

export default FormRadio;
