import { useMutation } from 'react-query';
import { postCenterReviewForm, postContactForm } from './form-service';

export const useContactFormMutation = (mutationOptions) => {
  return useMutation(postContactForm, { ...mutationOptions });
};

export const useCenterReviewFormMutation = (mutationOptions) => {
  return useMutation(postCenterReviewForm, { ...mutationOptions });
};

export default { useContactFormMutation, useCenterReviewFormMutation };
