import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const subtotal = getCartTotal();
  const discount = subtotal * 0.2;
  const delivery = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + delivery;

  const checkout = () => {
    if (!user) { toast.info('Please login'); navigate('/login'); return; }
    toast.success('Order placed!');
    clearCart();
  };

  if (cartItems.length === 0) return (
    <div className="container" style={{padding:'60px 20px',textAlign:'center'}}>
      <h1>YOUR CART IS EMPTY</h1>
      <Link to="/category/all" className="continue-btn">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="container" style={{padding:'30px 20px'}}>
      <h1 className="cart-title">YOUR CART</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item, i) => (
            <div key={i} className="cart-item">
              <img src={item.product?.image} alt=""/>
              <div className="cart-details">
                <div className="top">
                  <div>
                    <h3>{item.product?.name}</h3>
                    <p>Size: {item.size}</p>
                    <p>Color: <span style={{display:'inline-block',width:14,height:14,borderRadius:'50%',background:item.color,verticalAlign:'middle'}}></span></p>
                  </div>
                  <button onClick={()=>removeFromCart(item.productId, item.size, item.color)}><FiTrash2 color="red"/></button>
                </div>
                <div className="bottom">
                  <span className="price">${item.product?.price}</span>
                  <div className="qty">
                    <button onClick={()=>updateQuantity(item.productId, item.size, item.color, item.quantity-1)}><FiMinus/></button>
                    <span>{item.quantity}</span>
                    <button onClick={()=>updateQuantity(item.productId, item.size, item.color, item.quantity+1)}><FiPlus/></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="summary">
          <h3>Order Summary</h3>
          <div className="row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="row"><span>Discount (20%)</span><span style={{color:'red'}}>-${discount.toFixed(2)}</span></div>
          <div className="row"><span>Delivery</span><span>${delivery.toFixed(2)}</span></div>
          <hr/>
          <div className="row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="checkout-btn" onClick={checkout}>Checkout →</button>
        </div>
      </div>
    </div>
  );
};
export default Cart;