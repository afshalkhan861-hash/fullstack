import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <h2 className="footer-logo">SHOP.CO</h2>
          <p>We have clothes that suit your style and which you're proud to wear.</p>
        </div>
        <div><h3>COMPANY</h3><ul><li><Link to="/">About</Link></li><li><Link to="/">Features</Link></li><li><Link to="/">Career</Link></li></ul></div>
        <div><h3>HELP</h3><ul><li><Link to="/">Support</Link></li><li><Link to="/">Delivery</Link></li><li><Link to="/">Privacy</Link></li></ul></div>
        <div><h3>FAQ</h3><ul><li><Link to="/">Account</Link></li><li><Link to="/">Orders</Link></li><li><Link to="/">Payments</Link></li></ul></div>
      </div>
      <div className="footer-bottom"><p>Shop.co © 2024 All Rights Reserved</p></div>
    </div>
  </footer>
);
export default Footer;