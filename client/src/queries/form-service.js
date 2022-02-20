import config from '../config';

const { CONTACT_URL } = config;

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

export default { postContactForm };
