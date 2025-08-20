const users = require('../model/userModel');
const transfers = require('../model/transferModel');

function transfer({ from, to, amount }) {
  if (!from || !to || typeof amount !== 'number') {
    throw new Error('From, to, and amount are required');
  }
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) {
    throw new Error('Sender or recipient not found');
  }
  if (sender.balance < amount) {
    throw new Error('Insufficient balance');
  }
  if (!recipient.isFavored && amount >= 5000) {
    throw new Error('Transfers >= R$ 5.000,00 only allowed to favored recipients');
  }
  sender.balance -= amount;
  recipient.balance += amount;
  const transfer = { from, to, amount, date: new Date().toISOString() };
  transfers.push(transfer);
  return transfer;
}

function getTransfers() {
  return transfers;
}

module.exports = { transfer, getTransfers };
