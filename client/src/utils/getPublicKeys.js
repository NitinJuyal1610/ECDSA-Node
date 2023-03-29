import { mapping } from './mapping';
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
const getPublicKeys = (address) => {
  const PrivateKey = mapping[address];
  const PublicKey = secp.getPublicKey(PrivateKey);
  return toHex(PublicKey);
};

export default getPublicKeys;
