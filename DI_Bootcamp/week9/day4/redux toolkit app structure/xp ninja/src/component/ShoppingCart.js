import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  return (
    <div style={styles.container}>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={styles.item}>
                <div style={styles.itemInfo}>
                  <strong>{item.title}</strong>
                  <div>${item.price} x {item.quantity}</div>
                </div>
                <div style={styles.controls}>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}>-</button>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}>+</button>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', borderTop: '1px solid #ddd' },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' },
  itemInfo: { flex: 1 },
  controls: { display: 'flex', gap: '5px' },
};

export default ShoppingCart;