import { Contract } from '@ethersproject/contracts';

import tokenAbi from 'contracts/abi/PhinterToken.json';
import { signer } from 'lib';

const DECIMALS = 1000000000000000000;

const tokenContract = new Contract(process.env.TOKEN_ADDRESS, tokenAbi, signer);

export const mintAndTransfer = async (amount: number, address: string) => {
  try {
    await tokenContract.mint(
      process.env.ADMIN_ADDRESS,
      BigInt(amount * DECIMALS).toString()
    );
    await tokenContract.transfer(address, String(amount * DECIMALS));
  } catch (e) {
    // e
  }
};
