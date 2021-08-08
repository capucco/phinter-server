import {
  addUserWithPublicAccountQuery,
  getUserWithNonceQuery,
  getUserWithPublicAccountQuery,
} from './authentication.repository';

export const getUserWithPublicAccount = async (publicAccount: string) => {
  const user = await getUserWithPublicAccountQuery(publicAccount);

  return JSON.stringify(user);
};

export const getUserWithNonce = async (nonce: string) => {
  const user = await getUserWithNonceQuery(nonce);

  return JSON.stringify(user);
};

export const addUserWithPublicAccount = async (publicAccount: string) => {
  await addUserWithPublicAccountQuery(publicAccount);

  return true;
};
