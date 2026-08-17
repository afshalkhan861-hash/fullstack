import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import './Category.css';

const Category = () => {
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ type:'', minPrice:'', maxPrice:'', sort:'' });
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const params = { ...filters };
    if (categoryName && categoryName !== 'all') params.category = categoryName;
    if (search) params.search = search;
    API.get('/products', { params }).then(r => setProducts(r.data));
  }, [categoryName, search, filters]);

  return (
    <div className="container" style={{padding:'30px 20px'}}>
      <h1 style={{fontSize:'32px',marginBottom:'20px'}}>{search ? 'Search: ' + search : (categoryName || 'All').replace('-',' ').toUpperCase()}</h1>
      <div className="cat-layout">
        <aside className="filters">
          <h3>Filters</h3>
          <div className="filter-group">
            <h4>Type</h4>
            {['t-shirts','shirts','jeans','shorts'].map(t => (
              <label key={t}><input type="radio" name="type" checked={filters.type===t} onChange={()=>setFilters({...filters, type: filters.type===t ? '' : t})}/> {t}</label>
            ))}
          </div>
          <div className="filter-group">
            <h4>Price</h4>
            <input type="number" placeholder="Min" value={filters.minPrice} onChange={e=>setFilters({...filters, minPrice:e.target.value})}/>
            <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e=>setFilters({...filters, maxPrice:e.target.value})}/>
          </div>
          <div className="filter-group">
            <h4>Sort</h4>
            <select value={filters.sort} onChange={e=>setFilters({...filters, sort:e.target.value})}>
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
          <button onClick={()=>setFilters({type:'',minPrice:'',maxPrice:'',sort:''})}>Clear</button>
        </aside>
        <div className="cat-products">
          {products.length === 0 ? <p>No products found</p> : <div className="products-grid">{products.map(p => <ProductCard key={p.id} product={p}/>)}</div>}
        </div>
      </div>
    </div>
  );
};
export default Category;