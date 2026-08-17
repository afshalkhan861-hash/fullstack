import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [newArrivals, setNew] = useState([]);
  const [topSelling, setTop] = useState([]);

  useEffect(() => {
    API.get('/products?category=new-arrivals').then(r => setNew(r.data.slice(0,4)));
    API.get('/products?category=top-selling').then(r => setTop(r.data.slice(0,4)));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p>Browse through our diverse range of meticulously crafted garments.</p>
            <Link to="/category/all" className="hero-btn">Shop Now</Link>
            <div className="hero-stats">
              <div><h3>200+</h3><p>International Brands</p></div>
              <div><h3>2,000+</h3><p>High-Quality Products</p></div>
              <div><h3>30,000+</h3><p>Happy Customers</p></div>
            </div>
          </div>
        </div>
      </section>
      <div className="brands">
        <div className="container brands-container">
          <span>VERSACE</span><span>ZARA</span><span>GUCCI</span><span>PRADA</span><span>Calvin Klein</span>
        </div>
      </div>
      <section className="section container">
        <h2 className="section-title">NEW ARRIVALS</h2>
        <div className="products-grid">{newArrivals.map(p => <ProductCard key={p.id} product={p}/>)}</div>
        <div style={{textAlign:'center',marginTop:30}}><Link to="/category/new-arrivals" className="view-all">View All</Link></div>
      </section>
      <section className="section container">
        <h2 className="section-title">TOP SELLING</h2>
        <div className="products-grid">{topSelling.map(p => <ProductCard key={p.id} product={p}/>)}</div>
        <div style={{textAlign:'center',marginTop:30}}><Link to="/category/top-selling" className="view-all">View All</Link></div>
      </section>
    </div>
  );
};
export default Home;