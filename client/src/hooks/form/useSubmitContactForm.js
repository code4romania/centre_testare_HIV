import { useCallback } from 'react';
import { useContactFormMutation } from '../../queries/form-mutation';
import { mapKeysToSnakeCase } from '../../utils';

export const useSubmitContactForm = (options) => {
  const { mutate, isLoading: isSubmittingContactForm } = useContactFormMutation(options);

  const submitContactForm = useCallback(
    (contact) => {
      const mappedContact = mapKeysToSnakeCase(contact);
      mutate(mappedContact);
    },
    [mutate],
  );

  return { submitContactForm, isSubmittingContactForm };
};

export default { useSubmitContactForm };
