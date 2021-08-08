import { Router } from 'express';
import jwt from 'jsonwebtoken';

import {
  addUserWithPublicAccount,
  getUserWithNonce,
  getUserWithPublicAccount,
} from './authentication.service';

const router = Router();

router.post('/wallet/account', async (req, res) => {
  const { publicAccount } = req.body;

  let user = await getUserWithPublicAccount(publicAccount);

  if (!user) {
    await addUserWithPublicAccount(publicAccount);
    user = await getUserWithPublicAccount(publicAccount);
  }

  return res.status(200).end(user);
});

router.post('/wallet/authenticate', async (req, res) => {
  const { signedMessage, nonce } = req.body;

  const user = await getUserWithNonce(nonce);

  // validate signed message

  if (!user) {
    return res.status(400).end('Invalid user');
  }

  const token = jwt.sign({ user_id: user }, process.env.TOKEN_KEY, {
    expiresIn: '2h',
  });

  return res.status(200).end({ token });
});

export default router;
