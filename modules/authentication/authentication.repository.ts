import { randomBytes } from 'crypto';

import { db } from 'lib';

export const getUserWithPublicAccountQuery = (publicAccount: string) =>
  db('user').select().where({ publicAccount }).first();

export const getUserWithNonceQuery = (nonce: string) =>
  db('user').select().where({ nonce }).first();

export const addUserWithPublicAccountQuery = (publicAccount: string) =>
  db('user').insert({
    userId: db.raw('UUID_TO_BIN(UUID())'),
    publicAccount,
    nonce: randomBytes(16).toString('hex'),
  });
