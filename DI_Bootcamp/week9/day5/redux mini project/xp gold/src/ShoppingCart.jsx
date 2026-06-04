// src/ShoppingCart.jsx
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import {
  selectProducts,
  selectCartItems,
  calculateTotalPrice,
} from './cartSelectors';

const ShoppingCart = () => {
  const dispatch = useDispatch();

  // Select data using memoized selectors
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(calculateTotalPrice);

  // Use useCallback for the event handler to prevent unnecessary re-renders of children
  // (though in this simple example it optimizes the function creation)
  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  return (
    <div style={styles.container}>
      <h1>🛒 Shopping Cart</h1>

      <div style={styles.layout}>
        {/* Product List Section */}
        <div style={styles.section}>
          <h2>Products</h2>
          <div style={styles.productList}>
            {products.map((product) => (
              <div key={product.id} style={styles.card}>
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button 
                  style={styles.button} 
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div style={styles.section}>
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div style={styles.cartList}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} x ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
              <div style={styles.total}>
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  layout: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  section: { flex: 1, minWidth: '300px' },
  productList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' },
  card: { border: '1px solid #ddd', padding: '10px', borderRadius: '8px', textAlign: 'center' },
  button: { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' },
  cartList: { border: '1px solid #eee', padding: '10px', borderRadius: '8px', backgroundColor: '#f9f9f9' },
  cartItem: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' },
  total: { marginTop: '15px', textAlign: 'right', fontSize: '1.2rem', borderTop: '2px solid #ddd', paddingTop: '10px' }
};

export default ShoppingCart;