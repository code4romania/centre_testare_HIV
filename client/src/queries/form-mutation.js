import { useMutation } from 'react-query';
import { postContactForm, postHelpUsForm } from './form-service';

export const useContactFormMutation = (mutationOptions) => {
  return useMutation(postContactForm, { ...mutationOptions });
};

export const useHelpUsFormMutation = (mutationOptions) => {
  return useMutation(postHelpUsForm, { ...mutationOptions });
};

export default { useContactFormMutation, useHelpUsFormMutation };
