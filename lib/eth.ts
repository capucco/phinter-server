import { InfuraProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';

export const provider = new InfuraProvider(process.env.NETWORK, {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

export const signer = new Wallet(process.env.ADMIN_PRIVATE_KEY, provider);
