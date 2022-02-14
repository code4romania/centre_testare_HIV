import { arrayOf, bool, element, number, oneOf, oneOfType, shape, string } from 'prop-types';

const ColType = {
  span: number,
};

export const FormFieldType = {
  colon: bool,
  label: oneOfType([string, element]),
  labelCol: shape(ColType),
  note: oneOfType([string, element]),
  wrapperCol: shape(ColType),
};

export const defaultFormFieldTypeProps = {
  colon: false,
  label: null,
  labelCol: { span: 24 },
  note: null,
  wrapperCol: { span: 24 },
};

export const FormInputType = {
  ...FormFieldType,
  disabled: bool,
  fieldName: string.isRequired,
  form: shape().isRequired,
  rulesOptions: arrayOf(
    shape({
      ruleName: oneOf(['email', 'required', 'max', 'integer', 'gdpr', 'captcha']),
      value: oneOfType([number]),
    }),
  ),
};

export const defaultFormInputTypeProps = {
  ...defaultFormFieldTypeProps,
  disabled: false,
  rulesOptions: null,
};

export const FormTextAreaType = {
  ...FormInputType,
  rows: number,
};

export const defaultFormTextAreaTypeProps = {
  ...defaultFormInputTypeProps,
  rows: 4,
};
