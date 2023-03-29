import { mapping } from './mapping';
import * as secp from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';

const getSignature = async (msg, address) => {
  const PrivateKey = mapping[address];
  const msgHash = keccak256(utf8ToBytes(JSON.stringify(msg)));
  const signature = await secp.sign(msgHash, PrivateKey);
  return [toHex(signature), toHex(msgHash)];
};

export default getSignature;
