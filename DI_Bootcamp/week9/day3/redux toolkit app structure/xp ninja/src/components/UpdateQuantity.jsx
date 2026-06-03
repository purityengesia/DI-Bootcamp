import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../features/inventorySlice';

const UpdateQuantity = ({ product }) => {
  const [inputQty, setInputQty] = useState(product.quantity);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateQuantity({ id: product.id, quantity: inputQty }));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <input
        type="number"
        value={inputQty}
        onChange={(e) => setInputQty(e.target.value)}
        style={{ width: '60px', padding: '2px' }}
      />
      <button 
        onClick={handleUpdate}
        style={{ padding: '2px 8px', cursor: 'pointer', fontSize: '12px' }}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateQuantity;