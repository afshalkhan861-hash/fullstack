const express = require('express');
const fs = require('fs');
const path = require('path');
const { auth } = require('../middleware/auth');
const router = express.Router();

const usersPath = path.join(__dirname, '../data/users.json');
const productsPath = path.join(__dirname, '../data/products.json');
const getUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const saveUsers = (u) => fs.writeFileSync(usersPath, JSON.stringify(u, null, 2));
const getProducts = () => JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

router.get('/', auth, (req, res) => {
  const user = getUsers().find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ message: 'Not found' });
  const products = getProducts();
  const cart = user.cart.map(i => ({ ...i, product: products.find(p => p.id === i.productId) }));
  res.json(cart);
});

router.post('/add', auth, (req, res) => {
  const { productId, quantity, size, color } = req.body;
  const users = getUsers();
  const idx = users.findIndex(u => u.id === req.userId);
  const existing = users[idx].cart.find(i => i.productId === productId && i.size === size && i.color === color);
  if (existing) existing.quantity += quantity || 1;
  else users[idx].cart.push({ productId, quantity: quantity || 1, size, color });
  saveUsers(users);
  res.json({ message: 'Added' });
});

router.put('/update', auth, (req, res) => {
  const { productId, size, color, quantity } = req.body;
  const users = getUsers();
  const idx = users.findIndex(u => u.id === req.userId);
  const itemIdx = users[idx].cart.findIndex(i => i.productId === productId && i.size === size && i.color === color);
  if (quantity <= 0) users[idx].cart.splice(itemIdx, 1);
  else users[idx].cart[itemIdx].quantity = quantity;
  saveUsers(users);
  res.json({ message: 'Updated' });
});

router.delete('/remove', auth, (req, res) => {
  const { productId, size, color } = req.body;
  const users = getUsers();
  const idx = users.findIndex(u => u.id === req.userId);
  users[idx].cart = users[idx].cart.filter(i => !(i.productId === productId && i.size === size && i.color === color));
  saveUsers(users);
  res.json({ message: 'Removed' });
});

module.exports = router;