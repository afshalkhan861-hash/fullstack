import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => (
  <Link to={'/product/' + product.id} className="product-card">
    <div className="product-card-image"><img src={product.image} alt={product.name} /></div>
    <h3>{product.name}</h3>
    <div className="product-card-rating">
      {[1,2,3,4,5].map(i => <FaStar key={i} color={i <= product.rating ? '#FFC633' : '#ddd'} size={14}/>)}
      <span>{product.rating}/5</span>
    </div>
    <div className="product-card-price">
      <span className="current-price">${product.price}</span>
      {product.originalPrice && <><span className="original-price">${product.originalPrice}</span><span className="discount-badge">-{product.discount}%</span></>}
    </div>
  </Link>
);
export default ProductCard;