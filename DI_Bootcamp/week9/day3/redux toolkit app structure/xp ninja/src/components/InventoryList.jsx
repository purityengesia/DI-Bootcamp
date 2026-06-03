import { useSelector } from 'react-redux';
import UpdateQuantity from './UpdateQuantity';
import RemoveProduct from './RemoveProduct';

const InventoryList = () => {
  const products = useSelector((state) => state.inventory);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Inventory List</h3>
      {products.length === 0 ? (
        <p>No products in inventory.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {product.quantity}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <UpdateQuantity product={product} />
                  <RemoveProduct id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryList;