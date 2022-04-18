import { useMutation } from 'react-query';
import { postCenterReviewForm, postContactForm, postHelpUsForm } from './form-service';

export const useContactFormMutation = (mutationOptions) => {
  return useMutation(postContactForm, { ...mutationOptions });
};

export const useCenterReviewFormMutation = (mutationOptions) => {
  return useMutation(postCenterReviewForm, { ...mutationOptions });
};

export const useHelpUsFormMutation = (mutationOptions) => {
  return useMutation(postHelpUsForm, { ...mutationOptions });
};

export default { useContactFormMutation, useCenterReviewFormMutation, useHelpUsFormMutation };
