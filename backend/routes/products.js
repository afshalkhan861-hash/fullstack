const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

router.get('/', (req, res) => {
  let products = getProducts();
  const { category, type, minPrice, maxPrice, search, sort } = req.query;
  if (category && category !== 'all') products = products.filter(p => p.category === category);
  if (type) products = products.filter(p => p.type === type);
  if (minPrice) products = products.filter(p => p.price >= Number(minPrice));
  if (maxPrice) products = products.filter(p => p.price <= Number(maxPrice));
  if (search) products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'price-low') products.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') products.sort((a, b) => b.price - a.price);
  if (sort === 'rating') products.sort((a, b) => b.rating - a.rating);
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = getProducts().find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

module.exports = router;