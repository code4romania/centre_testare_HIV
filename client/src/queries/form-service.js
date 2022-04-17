import config from '../config';
import { mapKeysToSnakeCase } from '../utils';

const { CONTACT_URL, CENTER_URL } = config;

export const postContactForm = async (contact) => {
  const body = JSON.stringify(contact);
  const res = await fetch(CONTACT_URL, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
};

export const postCenterReviewForm = async ({ pk, review }) => {
  const body = JSON.stringify(mapKeysToSnakeCase(review));
  const res = await fetch(`${CENTER_URL('ro')}${pk}/rating/`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
};

export default { postContactForm, postCenterReviewForm };
