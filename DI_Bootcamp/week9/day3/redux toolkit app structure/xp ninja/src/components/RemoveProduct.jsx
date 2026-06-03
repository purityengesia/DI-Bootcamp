import { useDispatch } from 'react-redux';
import { removeProduct } from '../features/inventorySlice';

const RemoveProduct = ({ id }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(removeProduct(id));
    }
  };

  return (
    <button
      onClick={handleRemove}
      style={{ 
        marginLeft: '10px', 
        backgroundColor: '#ff4d4d', 
        color: 'white', 
        border: 'none', 
        padding: '5px 10px', 
        cursor: 'pointer' 
      }}
    >
      Remove
    </button>
  );
};

export default RemoveProduct;