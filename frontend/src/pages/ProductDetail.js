import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    API.get('/products/' + id).then(r => {
      setProduct(r.data);
      setSize(r.data.sizes[0]);
      setColor(r.data.colors[0]);
    });
    window.scrollTo(0,0);
  }, [id]);

  const handleAdd = () => {
    addToCart(product.id, qty, size, color, product);
    toast.success('Added to cart!');
  };

  if (!product) return <div style={{padding:'60px',textAlign:'center'}}>Loading...</div>;

  return (
    <div className="container" style={{padding:'30px 20px'}}>
      <div className="pd-layout">
        <div className="pd-image"><img src={product.image} alt={product.name}/></div>
        <div className="pd-info">
          <h1>{product.name}</h1>
          <div className="pd-rating">
            {[1,2,3,4,5].map(i => <FaStar key={i} color={i <= product.rating ? '#FFC633' : '#ddd'}/>)}
            <span>{product.rating}/5</span>
          </div>
          <div className="pd-price">
            <span className="p1">${product.price}</span>
            {product.originalPrice && <><span className="p2">${product.originalPrice}</span><span className="p3">-{product.discount}%</span></>}
          </div>
          <p className="pd-desc">{product.description}</p>
          <div className="pd-option">
            <h4>Select Color</h4>
            <div className="colors">
              {product.colors.map(c => <button key={c} className={color===c?'active':''} style={{background:c}} onClick={()=>setColor(c)}/>)}
            </div>
          </div>
          <div className="pd-option">
            <h4>Select Size</h4>
            <div className="sizes">
              {product.sizes.map(s => <button key={s} className={size===s?'active':''} onClick={()=>setSize(s)}>{s}</button>)}
            </div>
          </div>
          <div className="pd-actions">
            <div className="qty">
              <button onClick={()=>setQty(Math.max(1,qty-1))}><FiMinus/></button>
              <span>{qty}</span>
              <button onClick={()=>setQty(qty+1)}><FiPlus/></button>
            </div>
            <button className="add-cart" onClick={handleAdd}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;