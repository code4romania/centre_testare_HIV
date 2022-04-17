import config from '../config';
import { mapKeysToSnakeCase } from '../utils';

const { CONTACT_URL, SCHEDULE_EMAIL_URL } = config;

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

export const postHelpUsForm = async (email) => {
  const body = JSON.stringify(mapKeysToSnakeCase(email));
  const res = await fetch(SCHEDULE_EMAIL_URL, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
};

export default { postContactForm, postHelpUsForm };
