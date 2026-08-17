import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => { e.preventDefault(); if(search) navigate('/category/all?search=' + search); };

  return (
    <>
      <div className="top-banner"><p>Sign up and get 20% off. <Link to="/register">Sign Up Now</Link></p></div>
      <nav className="navbar">
        <div className="navbar-container">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX/> : <FiMenu/>}</button>
          <Link to="/" className="navbar-logo">SHOP.CO</Link>
          <ul className={'navbar-links ' + (menuOpen ? 'active' : '')}>
            <li><Link to="/category/all" onClick={()=>setMenuOpen(false)}>Shop</Link></li>
            <li><Link to="/category/new-arrivals" onClick={()=>setMenuOpen(false)}>New Arrivals</Link></li>
            <li><Link to="/category/top-selling" onClick={()=>setMenuOpen(false)}>Top Selling</Link></li>
            <li><Link to="/category/casual" onClick={()=>setMenuOpen(false)}>Casual</Link></li>
          </ul>
          <form className="navbar-search" onSubmit={handleSearch}>
            <FiSearch />
            <input type="text" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} />
          </form>
          <div className="navbar-actions">
            <Link to="/cart" className="cart-btn"><FiShoppingCart size={22}/>{getCartCount()>0 && <span className="cart-badge">{getCartCount()}</span>}</Link>
            {user ? <button onClick={logout} className="action-btn" title={user.name}><FiUser size={22}/></button> : <Link to="/login" className="action-btn"><FiUser size={22}/></Link>}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;