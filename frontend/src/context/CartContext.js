import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [localCart, setLocalCart] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchCart();
    else {
      const saved = localStorage.getItem('localCart');
      if (saved) setLocalCart(JSON.parse(saved));
    }
  }, [user]);

  const fetchCart = async () => {
    try { const res = await API.get('/cart'); setCartItems(res.data); } catch(e){}
  };

  const addToCart = async (productId, quantity, size, color, product) => {
    if (user) {
      await API.post('/cart/add', { productId, quantity, size, color });
      fetchCart();
    } else {
      const cart = [...localCart];
      const existing = cart.find(i => i.productId === productId && i.size === size && i.color === color);
      if (existing) existing.quantity += quantity;
      else cart.push({ productId, quantity, size, color, product });
      setLocalCart(cart);
      localStorage.setItem('localCart', JSON.stringify(cart));
    }
  };

  const updateQuantity = async (productId, size, color, quantity) => {
    if (user) { await API.put('/cart/update', { productId, size, color, quantity }); fetchCart(); }
    else {
      let cart = [...localCart];
      if (quantity <= 0) cart = cart.filter(i => !(i.productId === productId && i.size === size && i.color === color));
      else { const idx = cart.findIndex(i => i.productId === productId && i.size === size && i.color === color); if(idx>=0) cart[idx].quantity = quantity; }
      setLocalCart(cart);
      localStorage.setItem('localCart', JSON.stringify(cart));
    }
  };

  const removeFromCart = async (productId, size, color) => {
    if (user) { await API.delete('/cart/remove', { data: { productId, size, color } }); fetchCart(); }
    else {
      const cart = localCart.filter(i => !(i.productId === productId && i.size === size && i.color === color));
      setLocalCart(cart);
      localStorage.setItem('localCart', JSON.stringify(cart));
    }
  };

  const items = user ? cartItems : localCart;
  const getCartCount = () => items.reduce((t, i) => t + i.quantity, 0);
  const getCartTotal = () => items.reduce((t, i) => t + ((i.product?.price || 0) * i.quantity), 0);
  const clearCart = () => { setCartItems([]); setLocalCart([]); localStorage.removeItem('localCart'); };

  return <CartContext.Provider value={{ cartItems: items, addToCart, updateQuantity, removeFromCart, getCartCount, getCartTotal, clearCart }}>{children}</CartContext.Provider>;
};