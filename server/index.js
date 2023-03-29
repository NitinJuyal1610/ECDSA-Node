const express = require('express');
const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');
// import { toHex } from 'ethereum-cryptography/utils';
const app = express();
const cors = require('cors');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  '0x5002fdffa80ebdf892e31ca52eb4f2f98902d96b': 100,
  '0x4e2d5b5f56a64fd68f324b3f219aa9743cce6cca': 50,
  '0x534e3af1a0eb9424dfcbf75ece86c7a4deb3f2ad': 75,
};

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { sender, recipient, amount, publicKey, signature, hash } = req.body;
  //Get signature form client and recover the pubkey
  setInitialBalance(sender);
  setInitialBalance(recipient);
  const isSigned = secp.verify(signature, hash, publicKey);
  if (!isSigned) {
    return res.status(400).send({ message: 'Not authorized!' });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
