const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');

const generateKeys = () => {
  const PrivateKey = secp.utils.randomPrivateKey();
  console.log(toHex(PrivateKey));
  const PublicKey = secp.getPublicKey(PrivateKey);
  console.log(toHex(PublicKey));
  console.log(toHex(keccak256(PublicKey.slice(1)).slice(-20)));
};

generateKeys();
