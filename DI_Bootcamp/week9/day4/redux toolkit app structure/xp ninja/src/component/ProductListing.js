import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productThunks';
import { addToCart } from '../features/cart/cartSlice';

const ProductListing = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={styles.container}>
      <h2>Products</h2>
      <div style={styles.grid}>
        {items.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <h4 style={styles.title}>{product.title}</h4>
            <p>${product.price}</p>
            <button 
              onClick={() => dispatch(addToCart(product))}
              disabled={!isAuthenticated}
            >
              {isAuthenticated ? 'Add to Cart' : 'Login to Add'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' },
  card: { border: '1px solid #ccc', padding: '10px', borderRadius: '5px', textAlign: 'center' },
  image: { height: '100px', objectFit: 'contain' },
  title: { height: '40px', fontSize: '14px', overflow: 'hidden' },
};

export default ProductListing;