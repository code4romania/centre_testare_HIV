import { useMutation } from 'react-query';
import { postContactForm } from './form-service';

export const useContactFormMutation = (mutationOptions) => {
  return useMutation(postContactForm, { ...mutationOptions });
};

export default { useContactFormMutation };
