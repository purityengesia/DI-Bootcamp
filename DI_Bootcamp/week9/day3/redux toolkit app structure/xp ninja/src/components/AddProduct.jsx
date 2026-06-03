import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/inventorySlice';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity) return;

    dispatch(addProduct({ name, quantity }));
    setName('');
    setQuantity('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ padding: '5px', width: '80px' }}
        />
        <button type="submit" style={{ padding: '5px 10px', cursor: 'pointer' }}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;